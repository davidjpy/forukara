import { RefObject, useLayoutEffect } from 'react';

export const useWindowResize = (node: RefObject<HTMLDivElement>): void => {

    useLayoutEffect(() => {
        const handleResize = (): void => {
            if (node.current) {
                node.current.style.height = `${window.innerHeight}px`;
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [node]);
}

