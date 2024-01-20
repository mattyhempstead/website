'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'


import { getProjectData } from '@/app/projects/projectsData';


export default function ProjectPage({ projectId, caption=null, children }) {
    const { title, date, builtWith } = getProjectData(projectId);

    return <>
        <div className="">
            <h1 className='mb-4 text-slate-100'>{title}</h1>

            {caption && <p className="italic mb-4 text-slate-500">{caption}</p>}

            <p className="italic font-bold mb-4 text-slate-600">
                <FontAwesomeIcon icon={faCalendarDays} className='w-4 h-4 pr-[0.4rem]'/>
                {date.string}
            </p>

            <div className='mb-10 font-bold text-sm'>
                {builtWith.map(bw => (
                    <span className='mr-[0.4rem] px-[0.3rem] py-[0.15rem] rounded-lg text-black bg-blue-700'>{bw}</span>
                ))}
            </div>

            {children}
        </div>
    </>;
}
