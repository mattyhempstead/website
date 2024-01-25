'use client';

import React from 'react';
import { CodeBlock as CodeBlockOriginal, dracula } from 'react-code-blocks';


type CodeBlockProps = {
    codeLines: string[];
    className: string;
}

export default function CodeBlock({ codeLines, className="" }: CodeBlockProps ) {
    // Hide buttons to remove the "copy" object
    return <div className={`font-mono ${className}`}>
        <CodeBlockOriginal
            text={codeLines.join("\n")}
            language='javascript'
            theme={dracula}
            showLineNumbers={false}
        />
    </div>
}
