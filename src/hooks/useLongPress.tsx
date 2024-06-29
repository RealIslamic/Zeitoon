import { useCallback, useRef, useState } from "react";

const useLongPress = (
  onLongPress: any,
  onClick: any,
  { shouldPreventDefault = true, delay = 300 } = {},
) => {
  const [finish, setFinish] = useState(false);
  const timeout: any = useRef();
  const target: any = useRef();

  const start = useCallback(
    (event: any) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setFinish(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault],
  );

  const clear = useCallback(
    (_: any, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !finish && onClick();
      setFinish(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, finish],
  );

  const doNothing = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
    setFinish(false);
    if (shouldPreventDefault && target.current) {
      target.current.removeEventListener("touchend", preventDefault);
    }
    setFinish(true);
  }, [shouldPreventDefault, onClick, finish]);

  return {
    onMouseDown: (e: any) => start(e),
    onTouchStart: (e: any) => start(e),
    onTouchMove: () => doNothing(),
    onScroll: () => doNothing(),
    onMouseUp: (e: any) => clear(e),
    onMouseLeave: (e: any) => clear(e, false),
    onTouchEnd: (e: any) => clear(e),
  };
};

const isTouchEvent = (event: any) => {
  return "touches" in event;
};

const preventDefault = (event: any) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
