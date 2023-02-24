import { Montserrat } from '@next/font/google';

import '@/app/globals.css';

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
        <html lang='en'>
            <head />
            <body className={`${montserrat.className}`}>{children}</body>
        </html>
    );
}
