import '@/app/globals.css';

import { Montserrat } from '@next/font/google';

const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body className={`${montserrat.className}`}>
                <nav>
                    <h1>This is a main nav</h1>
                </nav>
                {children}
            </body>
        </html>
    );
}
