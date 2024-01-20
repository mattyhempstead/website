'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'


import { getProjectData } from '@/app/projects/projectsData';


export default function ProjectPage({ projectId, caption=null, children }) {
    const { title, date } = getProjectData(projectId);

    return <>
        <div className="">
            <h1 className='mb-4 text-slate-100'>{title}</h1>
            {caption && <p className="italic mb-4 text-slate-500">{caption}</p>}
            <p className="italic font-bold mb-10 text-slate-600">
                <FontAwesomeIcon icon={faCalendarDays} className='w-4 h-4 pr-[0.4rem]'/>
                {date.string}
            </p>

            {children}
        </div>
    </>;
}
