import { useState, ChangeEvent } from 'react';

type ResultValue = [any, (e: ChangeEvent<HTMLInputElement>) => void, () => void]

// Return functions and components that a generic input field will use
export const useInput = (initialValue: string | number | boolean, errorHandler?: Array<any>): ResultValue => {
    const [value, setValue] = useState<typeof initialValue>(initialValue);

    const reset = (): void => {
        setValue(initialValue);
    }   

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setValue(e.target.value);
        
        if (errorHandler && errorHandler.length) {
            for (let i = 0; i < errorHandler.length; i++) {
                errorHandler[i]('');
            }
        }
    }
    
    return [value, handleOnChange, reset];
}