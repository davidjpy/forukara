import { RefObject, useLayoutEffect } from 'react';

/**
 * @param {RefObject<HTMLDivElement>} node
 * Receive an RefObject and set its height always equal to the winodw innerHeight
 * @return {void}
 */

export const useWindowResize = (node: RefObject<HTMLDivElement>): void => {

    // Define resize event listener whenever the component mounted or RefObject changes
    useLayoutEffect(() => {
        const handleResize = (): void => {
            if (node.current) {
                node.current.style.height = `${window.innerHeight}px`;
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        
        // Remove resize event listener when component unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [node]);
}

