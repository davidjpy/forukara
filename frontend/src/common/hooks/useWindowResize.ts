import { RefObject, useEffect } from 'react';

// Receive an RefObject and set its height always equal to the winodw innerHeight
export const useWindowResize = (node: RefObject<HTMLDivElement>): void => {

    // Define resize event listener whenever the component mounted or RefObject changes
    useEffect(() => {
        const handleResize = (): void => {
            if (node.current) {
                node.current.style.height = `${window.visualViewport?.height}px`;
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

