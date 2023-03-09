import { FaBlog } from 'react-icons/fa';

import styles from '@/app/(splash)/layout.module.css';

export default function SplashLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <nav className='absolute left-1/2 top-24 flex w-[1200px] -translate-x-1/2 items-center justify-between'>
                <header className='flex items-center text-3xl text-white'>
                    <FaBlog className='mr-4' />
                    <h1>Forukara</h1>
                </header>
                <div className='flex items-center text-white'>
                    <button className='mr-12 hover:underline'>Login</button>
                    <button
                        className={`${styles['sibling-btn']} relative h-12 w-32 overflow-hidden rounded-md border-2`}
                    />
                </div>
            </nav>
            {children}
        </section>
    );
}
