import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(faEnvelope, faGithub, faFacebook, faLinkedin);


import styles from './header.module.css';





export default function Header() {
    return <nav className={styles.container}>
        <div>
            <Link href="/">Matty Hempstead</Link>
        </div>
        <div>
            <span>
                <Link href="/">Home</Link>
            </span>

            <span>
                <Link href="/projects">Projects</Link>
            </span>

            <span>
                <Link href="/more-projects">More Projects</Link>
            </span>
        </div>

        <div>

            <a href="mailto:matty.hempstead@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
            </a>

            <a href="https://github.com/mattyhempstead">
                <FontAwesomeIcon icon={faGithub} />
            </a>

            <a href="https://www.linkedin.com/in/matty-hempstead-89a980191/">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>

            <a href="https://www.facebook.com/mattyhempsteaddotcom/">
                <FontAwesomeIcon icon={faFacebook} />
            </a>

        </div>
    </nav>;
}

