import React from 'react';
import Image from 'next/image';


type ProjectImageProps = {
    imageUrl: string;
    imageAlt: string;
    caption?: React.JSX.Element;
    className?: string;
}

/**
 * A component that holds an image/gif with an optional caption.
 *
 * By default, image will
 *  - widen to 95% of the width of parent.
 *  - have a 0.75rem black shadow border
 *
 * className refers to container div holding both image and caption.  
 * To override the image style you can pass a className to the child like:
 * `"[&>img]:shadow-[0_0_10px_red]"`
 *
 * Tbh idk why styles passed this way get priority but they do and thats nice I guess?
 *
 * TODO: Should make it so clicking it will enter a zoomed mode or smth that lets you scroll in idk.
 */
export default function ProjectImage({ imageUrl, imageAlt, caption, className }: ProjectImageProps) {
    return <div className={`text-center mb-12 mt-12 ${className || ''}`}>
        <Image
            className="mx-auto shadow-[0_0_0.75rem_black] w-[95%]"
            src={imageUrl}
            alt={imageAlt}
            width={1920}
            height={1080}
        />

        {caption && <div className='italic mt-4 text-gray-500'>
            {caption}
        </div>}
    </div>
}
