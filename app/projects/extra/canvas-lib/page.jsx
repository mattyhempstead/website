
import { ProjectPage } from '@/components/projects/ProjectPage';

export const metadata = {
    title: "canvasLib",
}


export default function Project() {

    return <ProjectPage
        title="canvasLib"
        date = "2017"  // I think bc I used it for GAN Studio
    >
        <p>
            Framework-less web was the first place I learned to code (i.e. raw HTML, CSS, JS).
            
            Eventually (late 2015) I discovered the
            HTML <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas</a> element
            which instantly opened up a whole new area of what was possible as I had access to drawing 
            graphics primitives like lines and polygons onto a bitmap.
        </p>

        <p>
            At a certain point I had made so many canvas-powered web apps that I had actually been reusing 
            a library I'd written called <code>canvasLib</code> which provided an abstraction layer between
            the simulation and primitive canvas drawing methods (e.g. lines, polygons, circles).
        </p>

        <p>
            Part of this library included a <code>Button</code> object that greatly simplified the process of 
            creating interactive buttons.

            Turns out buttons are actually a lot more involved that you might first think (at least they
            seemed when I first learned to code) and require numerous pieces including but not limited to:
        </p>

        <ul>
            <li>Drawing coloured rectangular body of specified dimensions</li>
            <li>Drawing coloured border of specified width</li>
            <li>Detecting mouse inside button
                <ul>
                    <li>Need to check if mouse coordinates fall inside Button rectangle</li>
                </ul>
            </li>
            <li>Changing button colour when mouse hovers inside Button
                <ul>
                    <li>This means you need to perform the hover calculation every time cursor moves</li>
                </ul>
            </li>
            <li>Executing button handler when clicked
                <ul>
                    <li>A "click" should only be triggered on a mouse UP event while cursor was inside the button</li>
                    <li>If mouse UP event occurs inside button, but mouse DOWN occurred outside, button 
                        should not "click" (although apparently I forgot to do this)</li>
                    {/* 
                        LOL apparently I didn't do this with canvasLib
                    */}
                </ul>
            </li>
            <li>Rendering centered text inside button
                <ul>
                    <li>Font size needs to scale with size of button</li>
                </ul>
            </li>           
        </ul>

        <p>
            The library included other elements I found myself using including sliders, scroll wheels, and even line graphs.
            Each of which have their own nuances that you only realise when you force yourself to code them from scratch.
        </p>

        <p>
            So I guess to anyone learning to code I'd recommend coding your own UI library of sorts on an as-need basis.
            
            It helps demystify a layer that is often abstracted away from programmers, as generally when any
            interactive UI is needed, beginners will jump straight to a high level UI framework like HTML or Unity.
        </p>

        <p>

            It also makes all future projects that use the library feel much more "you" as you get full control over
            a really important and often fiddly/annoying layer of the stack. And enjoying yourself is <b>super</b> important
            in that first year or two of learning to code in order to overcome the initial learning curve.
        </p>


    </ProjectPage>

}
