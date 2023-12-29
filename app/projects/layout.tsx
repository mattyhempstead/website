import type { Metadata } from 'next'


// export const metadata: Metadata = {
//     title: "PROJECT HERE",
//     description: "Matty Hempstead's personal website.",
// }



export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>
        {children}
    </>
}
