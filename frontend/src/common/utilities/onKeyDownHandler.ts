import { KeyboardEvent } from 'react';

// Define keyboard event manually for accessibility 
export const onkeyDownHandler = (event: KeyboardEvent<HTMLElement>, key: string, handler: () => void): void => {

    if (event.key === key) {
        handler();
    }
}