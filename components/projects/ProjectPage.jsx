'use client';

import { IconCalendarDays } from '@/components/icons';
import { getProjectData, getBuiltWithClassName } from '@/app/projects/projectsData';


export default function ProjectPage({ projectId, caption=null, children }) {
    const { title, date, builtWith } = getProjectData(projectId);

    return <>
        <div className="">
            <h1 className='mb-4 text-slate-100'>{title}</h1>

            {caption && <p className="italic mb-4 text-slate-500">{caption}</p>}

            <div className="italic font-bold mb-4 text-slate-600 flex">
                <IconCalendarDays className='w-4 h-4 pr-[0.4rem]'/>
                <div>{date.string}</div>
            </div>

            <div className='mb-10 font-bold text-sm'>
                {builtWith.map(bw => (
                    <span key={bw} className={`
                        mr-[0.4rem] px-[0.3rem] py-[0.15rem]
                        rounded-lg text-black
                        ${getBuiltWithClassName(bw)}
                    `}>{bw}</span>
                ))}
            </div>

            {children}
        </div>
    </>;
}
