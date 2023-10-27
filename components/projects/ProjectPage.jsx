import { useRef } from 'react';

import Header from '/components/header';
import Head from 'next/head';
import styles from './ProjectPage.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUpRightFromSquare, faArrowsRotate, faA } from '@fortawesome/free-solid-svg-icons'

library.add(faUpRightFromSquare, faArrowsRotate);



function IFrame({ src, className }) {
    const iframeRef = useRef(null);

    const reloadIFrame = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.location.reload();
        }
    }

    return (
        <div
            className={`${styles.iframeContainer} ${className}`}
        >
            <div>
                <span onClick={reloadIFrame} title="Reload">
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </span>

                <a href={src} target="_blank" title="Open in new tab">
                    <span>
                        <FontAwesomeIcon icon={faUpRightFromSquare} />
                    </span>
                </a>
            </div>

            {/* <button onClick={toggleMaximized}>{isMaximized ? 'Minimize' : 'Maximize'}</button> */}
            <iframe
                ref={iframeRef}
                src={src}
                title="Embedded Content"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default function ProjectPage({ title, date, children }) {
    return <>
        <Head>
            <title>{title}</title>
        </Head>

        <Header />

        <div className={styles.content}>
            <h1>{title}</h1>
            <p className={styles.date}>{date}</p>

            {children}
        </div>
    </>;
}

ProjectPage.IFrame = IFrame;

