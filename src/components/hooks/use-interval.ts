import { useEffect, useRef, MutableRefObject } from 'react';

export function useInterval(callback: () => void, delay: number) {
    const savedCallback: MutableRefObject<any> = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            const id: NodeJS.Timeout  = setInterval(tick, delay);
            return () => clearInterval(id);
        }
        return () => {
        }
    }, [delay]);
}
