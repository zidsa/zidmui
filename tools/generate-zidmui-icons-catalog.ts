/*
 * Regenerates the ZidMUI icon catalog consumed by the zidmui icons skill.
 *
 * usage: `node tools/generate-zidmui-icons-catalog.ts` (on project root directory)
 *        `tsx tools/generate-zidmui-icons-catalog.ts` also works
 *
 * Writes an index at .agents/zidmui/icons/references/icons.md and one file per
 * category at .agents/zidmui/icons/references/icons/<category>.md, so an agent
 * loads only the category it needs instead of the full catalog.
 *
 * Source of truth is the package's own `exports` map: every `./icons/<category>/*` subpath
 * is resolved to its `types` target directory, and each `.d.ts` file there is parsed for its
 * exported component names. Nothing is hardcoded, so the catalog stays correct across
 * @zidsa/zidmui upgrades.
 */

import { readFileSync } from 'fs';
import { mkdir, readdir, readFile, rm, writeFile } from 'fs/promises';
import { createRequire } from 'module';
import path from 'path';
import { cwd } from 'process';

//
//

const PKG = '@zidsa/zidmui';
const REPO_ROOT = cwd();
const REFERENCES_DIR = path.join(REPO_ROOT, '.agents/zidmui/icons/references');
const INDEX_FILE = path.join(REFERENCES_DIR, 'icons.md');
const CATEGORIES_DIR = path.join(REFERENCES_DIR, 'icons');
const GENERATOR_CMD = 'node tools/generate-zidmui-icons-catalog.ts';

type Icon = {
  name: string;
  aliases: string[];
  slug: string;
  importPath: string;
  sourceFile: string;
};

type Category = {
  category: string;
  icons: Icon[];
  typesDir: string;
};

/**
 * Resolve the installed package directory without relying on a `./package.json` export.
 *
 * `package.json` itself isn't in the `exports` map, so we can't `require.resolve` it
 * directly. Instead we locate `node_modules/@zidsa/zidmui` using Node's own module
 * resolution (walking up from REPO_ROOT), which works whether the package is a real
 * dependency, a symlinked/workspace link, or (in this repo) the package's own source
 * checkout resolving to itself.
 */
const resolvePackageDir = (): string => {
  const require = createRequire(path.join(REPO_ROOT, 'noop.js'));
  const suffix = path.join('@zidsa', 'zidmui');

  let dir = REPO_ROOT;
  while (true) {
    const candidate = path.join(dir, 'node_modules', suffix);
    if (candidate !== path.join(REPO_ROOT, suffix) && existsPackageJson(candidate))
      return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  // This repo IS @zidsa/zidmui: no node_modules/@zidsa/zidmui symlink exists, so fall
  // back to the repo root itself when its own package.json declares that name.
  if (existsPackageJson(REPO_ROOT, PKG)) return REPO_ROOT;

  // Last resort: let require.resolve throw a clear "module not found" error.
  require.resolve(PKG);
  return path.join(REPO_ROOT, 'node_modules', suffix);
};

/** Synchronously check whether `dir/package.json` exists (and optionally matches `name`). */
const existsPackageJson = (dir: string, name?: string): boolean => {
  try {
    const pkg = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8')) as {
      name?: string;
    };
    return name ? pkg.name === name : true;
  } catch {
    return false;
  }
};

/** Pull exported component names out of a generated `.d.ts` file. */
const parseExports = ({ source }: { source: string }): string[] => {
  const names = new Set<string>();
  const declarations = [
    /export\s+declare\s+const\s+([A-Za-z_$][\w$]*)/g,
    /export\s+declare\s+function\s+([A-Za-z_$][\w$]*)/g,
    /export\s+default\s+([A-Za-z_$][\w$]*)/g,
  ];

  for (const pattern of declarations) {
    for (const match of source.matchAll(pattern)) names.add(match[1]);
  }

  // `export { Foo as Bar }` — the alias wins, the original is recorded as an alias.
  for (const match of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const entry of match[1].split(',')) {
      for (const identifier of entry.split(/\s+as\s+/).map(part => part.trim())) {
        if (/^[A-Za-z_$][\w$]*$/.test(identifier)) names.add(identifier);
      }
    }
  }

  return [...names];
};

const readCategory = async ({
  pkgDir,
  category,
  typesDir,
}: {
  pkgDir: string;
  category: string;
  typesDir: string;
}): Promise<Icon[]> => {
  const absoluteDir = path.join(pkgDir, typesDir);

  let files: string[];
  try {
    files = (await readdir(absoluteDir)).filter(file => file.endsWith('.d.ts'));
  } catch {
    // oxlint-disable-next-line no-console
    console.warn(`⚠️  Skipping ${category}: ${typesDir} is not readable`);
    return [];
  }

  const icons: Icon[] = [];

  for (const file of files.sort((a, b) => a.localeCompare(b))) {
    const source = await readFile(path.join(absoluteDir, file), 'utf8');
    const exports = parseExports({ source }).sort((a, b) => a.localeCompare(b));

    if (exports.length === 0) {
      // oxlint-disable-next-line no-console
      console.warn(`⚠️  No exports parsed from ${category}/${file}`);
      continue;
    }

    const [name, ...aliases] = exports;
    const slug = file.replace(/\.d\.ts$/, '');

    icons.push({
      name,
      aliases,
      slug,
      importPath: `${PKG}/icons/${category}/${slug}`,
      sourceFile: path.posix.join(typesDir, file),
    });
  }

  return icons.sort((a, b) => a.name.localeCompare(b.name));
};

const collectCategories = async ({
  pkgDir,
  exports: packageExports,
  version,
}: {
  pkgDir: string;
  exports: Record<string, unknown>;
  version: string;
}): Promise<Category[]> => {
  const subpaths = Object.entries(packageExports).filter(
    ([key, value]) =>
      key.startsWith('./icons/') &&
      key.endsWith('/*') &&
      typeof (value as { types?: unknown })?.types === 'string',
  ) as Array<[string, { types: string }]>;

  if (subpaths.length === 0) {
    throw new Error(
      `No "./icons/<category>/*" subpaths with a "types" target found in ${PKG}@${version} exports. ` +
        'The package layout changed; update this tool before regenerating the catalog.',
    );
  }

  const categories: Category[] = [];

  for (const [subpath, target] of subpaths) {
    const category = subpath.slice('./icons/'.length, -'/*'.length);
    // e.g. "./dist/react/types/icons/system/*.d.ts" -> "dist/react/types/icons/system"
    const typesDir = path.dirname(target.types.replace(/^\.\//, ''));
    const icons = await readCategory({ pkgDir, category, typesDir });

    if (icons.length > 0) categories.push({ category, icons, typesDir });
  }

  return categories.sort((a, b) => a.category.localeCompare(b.category));
};

const buildIconTable = ({ icons }: { icons: Icon[] }): string[] => {
  const hasAliases = icons.some(icon => icon.aliases.length > 0);
  const rows = [
    hasAliases ? '| Icon | Import | Aliases |' : '| Icon | Import |',
    hasAliases ? '| --- | --- | --- |' : '| --- | --- |',
  ];

  for (const icon of icons) {
    const cells = [`\`${icon.name}\``, `\`${icon.importPath}\``];
    if (hasAliases) {
      cells.push(icon.aliases.length > 0 ? icon.aliases.map(a => `\`${a}\``).join(', ') : '—');
    }
    rows.push(`| ${cells.join(' | ')} |`);
  }

  return rows;
};

const buildCategoryFile = ({
  category,
  icons,
  typesDir,
  version,
}: Category & { version: string }): string =>
  [
    `# ZidMUI Icons — ${category}`,
    '',
    `Generated file. Do not edit by hand; run \`${GENERATOR_CMD}\` instead.`,
    '',
    `- Icons: **${icons.length}**`,
    `- Category: \`${category}\``,
    `- Package: \`${version}\``,
    `- Types: \`${typesDir}/\``,
    '- Index: [../icons.md](../icons.md)',
    '',
    ...buildIconTable({ icons }),
    '',
  ].join('\n');

const buildIndexFile = ({
  categories,
  version,
  packageLocation,
}: {
  categories: Category[];
  version: string;
  packageLocation: string;
}): string => {
  const total = categories.reduce((sum, { icons }) => sum + icons.length, 0);
  const aliasCount = categories.reduce(
    (sum, { icons }) => sum + icons.reduce((count, icon) => count + icon.aliases.length, 0),
    0,
  );

  return [
    '# ZidMUI Icon Catalog',
    '',
    `Generated file. Do not edit by hand; run \`${GENERATOR_CMD}\` instead.`,
    '',
    `- Total icons: **${total}**`,
    `- Categories: **${categories.length}**`,
    `- Package version: \`${version}\``,
    `- Package location: \`${packageLocation}\``,
    `- Aliased exports: **${aliasCount}**`,
    '',
    'This index lists categories only. Icon names and import paths live in the per-category',
    'files below; open just the one you need instead of loading the whole catalog.',
    '',
    '```tsx',
    "import { IconStore2Line } from '@zidsa/zidmui/icons/buildings/store-2-line';",
    '```',
    '',
    '## Categories',
    '',
    '| Category | Icons | File |',
    '| --- | --- | --- |',
    ...categories.map(
      ({ category, icons }) =>
        `| \`${category}\` | ${icons.length} | [icons/${category}.md](icons/${category}.md) |`,
    ),
    '',
  ].join('\n');
};

//
//

const pkgDir = resolvePackageDir();
const pkg = JSON.parse(await readFile(path.join(pkgDir, 'package.json'), 'utf8')) as {
  name: string;
  version: string;
  exports?: Record<string, unknown>;
};
const version = `${pkg.name}@${pkg.version}`;

const categories = await collectCategories({
  pkgDir,
  exports: pkg.exports ?? {},
  version,
});

// Drop stale category files from a previous package version.
await rm(CATEGORIES_DIR, { recursive: true, force: true });
await mkdir(CATEGORIES_DIR, { recursive: true });

for (const category of categories) {
  await writeFile(
    path.join(CATEGORIES_DIR, `${category.category}.md`),
    buildCategoryFile({ ...category, version }),
  );
}

await writeFile(
  INDEX_FILE,
  buildIndexFile({
    categories,
    version,
    packageLocation: path.relative(REPO_ROOT, pkgDir) || pkgDir,
  }),
);

const total = categories.reduce((sum, { icons }) => sum + icons.length, 0);

// oxlint-disable-next-line no-console
console.log(
  `✅ Wrote ${path.relative(REPO_ROOT, INDEX_FILE)} and ${categories.length} category files: ${total} icons from ${version}`,
);
