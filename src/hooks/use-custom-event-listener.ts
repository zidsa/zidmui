import { useEffect } from 'react';

type EventName = string;
// oxlint-disable-next-line @typescript-eslint/no-explicit-any
type EventListener = (args?: any) => void;

//
//

export const on = (eventName: EventName, listener: EventListener) => {
  document.addEventListener(eventName, listener);
};

export const off = (eventName: EventName, listener: EventListener) => {
  document.removeEventListener(eventName, listener);
};

export const once = (eventName: EventName, listener: EventListener) => {
  on(eventName, () => {
    listener?.();
    off(eventName, listener);
  });
};

export const triggerCustomEvent = (eventName: EventName, data?: unknown) => {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
};

//
//

export const useCustomEventListener = (eventName: EventName, listener: EventListener) => {
  useEffect(() => {
    on(eventName, listener);

    return () => {
      off(eventName, listener);
    };
  }, [eventName, listener]);
};
