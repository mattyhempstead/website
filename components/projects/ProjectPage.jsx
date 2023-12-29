'use client';

import { useRef } from 'react';

import Header from '@/components/header';
import Head from 'next/head';
import styles from './ProjectPage.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUpRightFromSquare, faArrowsRotate, faA } from '@fortawesome/free-solid-svg-icons'

library.add(faUpRightFromSquare, faArrowsRotate);



export function ProjectIFrame({ src, className }) {
    const iframeRef = useRef(null);

    const reloadIFrame = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.location.reload();

            // TODO: Dynamically resize based on iframe contents
            // console.log(iframeRef.current.contentDocument.documentElement.scrollHeight)
        }
    }

    return (
        <div className='flex justify-center mb-12'>
            <div
                className={`
                    w-[40rem] h-[40rem] mt-6
                    border-2 border-gray-400
                    flex-shrink-0 flex flex-col
                    shadow-[0_0_0.5rem_rgba(134,134,134)]
                    ${className}
                `}
            >
                <div className={`
                    h-10 text-2xl flex justify-end items-center
                    border-b-2 border-b-gray-400
                `}>
                    {/* TODO: Add a left or centre aligned title for iframe */}

                    <span
                        onClick={reloadIFrame} title="Reload"
                        className='select-none mr-3 cursor-pointer'
                    >
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </span>

                    <a
                        href={src} target="_blank" title="Open in new tab"
                        className='mr-2 cursor-pointer'
                    >
                        <span className='text-black'>
                            <FontAwesomeIcon icon={faUpRightFromSquare} />
                        </span>
                    </a>
                </div>

                {/* <button onClick={toggleMaximized}>{isMaximized ? 'Minimize' : 'Maximize'}</button> */}
                <iframe
                    className='w-full border-0 flex-grow'
                    ref={iframeRef}
                    src={src}
                    title="Embedded Content"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}

export function ProjectPage({ title, date, caption=null, children }) {
    return <>
        <div className={styles.content}>
            <h1 className='mb-6'>{title}</h1>
            {caption && <p className={styles.caption}>{caption}</p>}
            <p className={styles.date}>{date}</p>

            {children}
        </div>
    </>;
}
