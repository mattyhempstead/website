import type { Metadata } from 'next'
import Head from 'next/head';
import { Inter } from 'next/font/google'
import './globals.css'

import Header from '@/components/nav/header';


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
            <Head>
                {/* Idk why but this might address some mobile issues that make vw/vh more accurate? */}
                {/* <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/> */}
                <meta name="viewport" content="height=device-height, 
                      width=device-width, initial-scale=1.0, 
                      minimum-scale=1.0, maximum-scale=1.0, 
                      user-scalable=no, target-densitydpi=device-dpi"></meta>
            </Head>

            <body className={`
                ${inter.className}
                bg-slate-900 
                text-slate-400
                [&_h1]:text-slate-200
                [&_h2]:text-slate-200
                [&_h3]:text-slate-200
                [&_h4]:text-slate-200
                [&_code]:text-slate-300

                portrait:[&_h2]:mt-20
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
