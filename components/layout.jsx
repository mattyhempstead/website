import Header from '/components/header';

import styles from './layout.module.css';


export default function Layout({ children }) {
    return <>
        <Header />
        <div className={styles.container}>{children}</div>
    </>;
}
