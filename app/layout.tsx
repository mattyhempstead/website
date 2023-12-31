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
            <body className={`
                ${inter.className}
                bg-slate-900 
                text-slate-400
                [&_h1]:text-slate-200
                [&_h2]:text-slate-200
                [&_h3]:text-slate-200
                [&_h4]:text-slate-200
                [&_code]:text-slate-300
            `}>
                <Header />

                <div className='px-4 pt-12 pb-16'>
                    <div className='max-w-[40rem] mx-auto'>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )
}
