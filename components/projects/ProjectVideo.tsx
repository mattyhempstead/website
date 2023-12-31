import React from 'react';


type ProjectVideoProps = {
    videoUrl: string;
    caption?: React.JSX.Element;
    className?: string;
}

/**
 * A component that holds an embedded YouTube video with optional caption.
 * 
 * To set the video width you can pass a className to the child like:
 * [&>iframe]:w-[30rem]
 */
export function ProjectVideo({ videoUrl, caption, className }: ProjectVideoProps) {

    return <div className={`text-center mt-4 ${className || ''}`}>
        <iframe
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            className="border-0 mx-auto w-full aspect-video"
        />
        {caption && <div className='italic mt-3 text-gray-500'>
            {caption}
        </div>}
    </div>
}
