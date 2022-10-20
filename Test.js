    const textOptions = ['Military Personnel', 'Software Developer', 'Construction Worker', 'Medical Professional'];
    const dynamicRef = useRef(null);

    useEffect(() => {
        function changeText() {
            let optionIndex = 0;
            let charIndex = 0;
            let increment = true;

            setInterval(() => {
                if (dynamicRef.current) {
                    dynamicRef.current.textContent = textOptions[optionIndex].slice(0, charIndex);

                    if (charIndex === textOptions[optionIndex].length) {
                        setTimeout(() => {
                            increment = false;
                        }, 500);
                    } else if (charIndex <= 0) {
                        optionIndex++;
                        increment = true;
                    }

                    if (increment) {
                        charIndex++;
                    } else {
                        charIndex--;
                    }

                    if (optionIndex > textOptions.length - 1) {
                        optionIndex = 0;
                    }

                }
            }, 100)
        }
        changeText();
    }, [])
