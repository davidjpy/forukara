import { KeyboardEvent } from 'react';

export const onkeyDown = (event: KeyboardEvent<HTMLElement> , key: string, handler: () => void): void => {
    if (event.key === key) {
        handler();
    }
}