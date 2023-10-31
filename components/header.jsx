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
            {/* <Link href="/">Matty Hempstead</Link> */}
            <a href="/">mattyhempstead.com</a>
        </div>
        <div>
            <span>
                <a href="/">home</a>
            </span>

            <span>
                <a href="/projects">projects</a>
            </span>

            <span>
                <a href="/more-projects">featured</a>
            </span>
        </div>

        <div>

            <a href="mailto:matty.hempstead@gmail.com" title="Email">
                <FontAwesomeIcon icon={faEnvelope} />
            </a>

            <a href="https://github.com/mattyhempstead" title="GitHub">
                <FontAwesomeIcon icon={faGithub} />
            </a>

            <a href="https://www.linkedin.com/in/matty-hempstead-89a980191/" title="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>

            <a href="https://www.facebook.com/mattyhempsteaddotcom/" title="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
            </a>

        </div>
    </nav>;
}

