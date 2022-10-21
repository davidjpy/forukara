import { FC, useState } from 'react';

import { useClickOutside } from '@common/hooks/useClickOutside';

const SignUpForm: FC = () => {

    const [mount, setMount] = useState<boolean>(false);

    const handleMountModal = (): void => {
        setMount(!mount);
    }

    const wrapperRef = useClickOutside(handleMountModal);

    return (
        <div className=''>
            
        </div>
    );
}

export default SignUpForm;