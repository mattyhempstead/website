'use client';


export default function ProjectPage({ title, date, caption=null, children }) {
    return <>
        <div className="">
            <h1 className='mb-4 text-slate-100'>{title}</h1>
            {caption && <p className="italic mb-4 text-slate-500">{caption}</p>}
            <p className="italic font-bold mb-10 text-slate-600">{date}</p>

            {children}
        </div>
    </>;
}
