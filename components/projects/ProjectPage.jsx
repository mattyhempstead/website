import Header from '/components/header';
import Head from 'next/head';
import styles from './ProjectPage.module.css';


function IFrame({ src, className }) {
    return (
        <div className={`${styles.iframeContainer} ${className}`}>
            <iframe
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

