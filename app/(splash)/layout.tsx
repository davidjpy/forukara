import { FaBlog } from 'react-icons/fa';

import styles from '@/app/(splash)/layout.module.css';

export default function SplashLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <nav className='absolute flex items-center justify-between w-[1200px] left-1/2 -translate-x-1/2 top-24'>
                <header className='flex items-center text-white text-3xl'>
                    <FaBlog className='mr-4' />
                    <h1>Forukara</h1>
                </header>
                <div className='flex items-center text-white'>
                    <button className='mr-12 hover:underline'>
                        Login
                    </button>
                    <button
                        className={`${styles['sibling-btn']} relative h-12 w-32 overflow-hidden border-2 rounded-md`}
                    />
                </div>
            </nav>
            {children}
        </section>
    );
}
