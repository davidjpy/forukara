import { useRef, useEffect, MutableRefObject } from 'react';

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(handlerFunction: () => void, excludingRef?: MutableRefObject<T | null>): MutableRefObject<T | null> => {
    const node = useRef<T | null>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (node.current) {
                if (!node.current.contains(e.target as T) && !excludingRef?.current?.contains(e.target as T)) {
                    handlerFunction();
                }
            }
        }
        window.addEventListener('mousedown', handler);

        return () => {
            window.removeEventListener('mousedown', handler);
        }
    });

    return node;
}

