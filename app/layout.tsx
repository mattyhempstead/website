import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Header from '@/components/header';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        template: "%s | Matty Hempstead",
        default: '💀 | Matty Hempstead',
    },
    description: "Matty Hempstead's personal website.",
}



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />

                <div className='max-w-[40rem] mx-auto pt-8 pb-16'>
                    {children}
                </div>
            </body>
        </html>
    )
}
