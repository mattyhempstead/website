'use client';

import { useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUpRightFromSquare, faArrowsRotate, faA } from '@fortawesome/free-solid-svg-icons'

library.add(faUpRightFromSquare, faArrowsRotate);




export default function ProjectIFrame({ src, className="" }) {
    const iframeRef = useRef(null);

    const reloadIFrame = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.location.reload();

            // TODO: Dynamically resize based on iframe contents
            // console.log(iframeRef.current.contentDocument.documentElement.scrollHeight)
        }
    }

    /*
        TODO: Scale iframe to be same size as container.
        This makes mobile devices handle well.

        iframeRef.current.contentDocument.getElementsByTagName("html")[0].style.zoom = 0.2


        Alternatively you can scale the iframe element itself.
        style={{
            // 'width': '100%',

            // '-ms-transform': 'scale(0.5)',
            // '-moz-transform': 'scale(0.5)',
            // '-o-transform': 'scale(0.5)',
            // '-webkit-transform': 'scale(0.5)',
            // 'transform': 'scale(0.5)',

            // '-ms-transform-origin': '0 0',
            // '-moz-transform-origin': '0 0',
            // '-o-transform-origin': '0 0',
            // '-webkit-transform-origin': '0 0',
            // 'transform-origin': '0 0',
        }}
    */

    return (
        <div className='flex justify-center mt-8'>
            <div
                className={`
                    w-[40rem] max-w-[calc(100vw-3rem)]
                    h-[40rem]
                    border-2 border-gray-400
                    flex-shrink-0 flex flex-col
                    shadow-[0_0_0.3rem_rgba(134,134,134)]
                    ${className}
                `}
            >
                <div className={`
                    h-10 text-2xl flex justify-end items-center
                    border-b-2 border-b-slate-400
                    bg-slate-400
                `}>
                    {/* TODO: Add a left or centre aligned title for iframe */}

                    <span
                        onClick={reloadIFrame} title="Reload"
                        className='select-none mr-3 cursor-pointer text-black'
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
                    className='w-full border-0 flex-grow bg-white'
                    ref={iframeRef}
                    src={src}
                    title="Embedded Content"
                    allowFullScreen

                ></iframe>
            </div>
        </div>
    );
}