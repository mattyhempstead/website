import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';

export const metadata = getProjectMetadata("pyfck");

export default function Project() {
    return <ProjectPage projectId="pyfck">
        <p>
            A novel method of encoding any Python script using only the following 8 characters:
        </p>

        <p className='text-center font-mono text-xl'>e x c ' % = ( )</p>

        <p>
            Check out my write up on <a href="https://github.com/mattyhempstead/pyfck">Github</a>.
        </p>

    </ProjectPage>
}
