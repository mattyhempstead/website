import { Icon, IconGitHub, IconFacebook, IconLinkedIn, IconEnvelope } from '@/components/icons';


type SocialsLinkProps = {
    href: string;
    title: string;
    IconComponent: Icon;
};

const SocialsLink = ({ href, title, IconComponent }: SocialsLinkProps) => {
    return (
        <a href={href} title={title} className=''>
            <IconComponent className='text-2xl px-[0.1rem]'/>
        </a>
    );
};


export const getSocials = () => {
    return <>
        <SocialsLink
            href="mailto:matty.hempstead@gmail.com"
            title="Email"
            IconComponent={IconEnvelope}
        />
        <SocialsLink
            href="https://github.com/mattyhempstead"
            title="GitHub"
            IconComponent={IconGitHub}
        />
        <SocialsLink
            href="https://www.linkedin.com/in/matty-hempstead-89a980191/"
            title="LinkedIn"
            IconComponent={IconLinkedIn}
        />
        <SocialsLink
            href="https://www.facebook.com/mattyhempsteaddotcom/"
            title="Facebook"
            IconComponent={IconFacebook}
        />
    </>;
}
