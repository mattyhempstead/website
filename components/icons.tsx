/*
    A file that exports a number of icons.

    Not sure if this is the cleanest way to do this?
    This only makes sense if we re-use icons a lot spread
    throughout all parts of the codebase.
    I guess I will?
*/

// https://stackoverflow.com/a/59429852/12688391
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */


import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { faEnvelope, faBars, faCalendarDays, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';



// IconProps is same as FontAwesomeIconProps with "icon" excluded
interface IconProps extends Omit<FontAwesomeIconProps, 'icon'> {};

export type Icon = React.FC<IconProps>;


const IconFactory = (icon: IconDefinition): Icon => {
    return (props: IconProps) => {
        // Wrap all icons in a flex box that vertically aligns them
        // There is probably a better way to fix this
        return <div className='flex items-center'>
            <FontAwesomeIcon {...props} icon={icon} className={`${props.className || ''}`}/>
        </div>
    }
}


/// Util

/** 3 horizontal lines, also known as a hamburger menu */
export const IconBars = IconFactory(faBars);

export const IconCalendarDays = IconFactory(faCalendarDays);

export const IconX = IconFactory(faXmark);


/// Socials
export const IconGitHub = IconFactory(faGithub);
export const IconEnvelope = IconFactory(faEnvelope);
export const IconFacebook = IconFactory(faFacebook);
export const IconLinkedIn = IconFactory(faLinkedin);
