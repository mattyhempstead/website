import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import CodeBlock from '@/components/CodeBlock';

export const metadata = getProjectMetadata("promptilation");

export default function Project() {
    return <ProjectPage projectId="promptilation">
        <p>
            What if instead of writing code, you wrote prompts?
        </p>

        <p>
            If rather than writing code like
        </p>

        <CodeBlock
            codeLines={[
                "for i in range(1,11):",
                "   print(i)",
                "print(\"Done\")",
            ]}
            className='mt-4'
        />

        <p>
            you wrote, compiled, and executed files containing prompts like
        </p>

        <CodeBlock
            codeLines={[
                "print all the numbers from 1 to 10",
                "print \"Done\"",
            ]}
            className='mt-4'
        />

        <p>
            and you never needed to understand the "complexity" of the actual source code.
        </p>

        <p>
            Let's call this process promptilation.
            A compilation-like process that takes a program specified as a list of prompts (or arbitrarily abstract pseudocode) to an LLM,
            which will translate the prompts into an executable language like Python.
            The user can then execute the source code file without ever having to understand or even read it.
        </p>

        <p>
            Promptilation is compilation, declarative programming, and programming languages, all taken to its natural (language) limit.
        </p>

        <p>
            It's also not very good. More of a idea than any actual product, at least for now.
        </p>

        <p>
            Check out my full write up with source code on <a href="https://github.com/mattyhempstead/promptilation">Github</a>.
        </p>

    </ProjectPage>
}
