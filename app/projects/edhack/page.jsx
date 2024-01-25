import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectImage from '@/components/projects/ProjectImage';

import CodeBlock from '@/components/CodeBlock';


export const metadata = getProjectMetadata("edhack");

export default function Project() {
    return <ProjectPage projectId="edhack">

        <p className='italic'>
            Are you tired of only getting a handful of views on your edstem posts?
        </p>

        <p className='italic'>
            Want to increase their perceived popularity among your peers?
        </p>

        <p className='font-bold'>
            Well, those are stupid things to want.
            Maybe focus on learning instead, you idiot.
        </p>


        <br/>
        <br/>

        <p>
            Anyway, I built a view botter Chrome extension for <a
                href="https://edstem.org/"
            >edstem.org</a> which can be kinda fun.
        </p>

        <ProjectImage
            imageUrl="/projects/edhack/demo.gif"
            imageAlt="Demo GIF"
            caption={<>
                Despite the seamless user experience, this is actually not a typical ed feature.
            </>}
        />

        <p>
            Note this is not just a client-side effect. Anybody else viewing the post will
            see it rise in views. Better yet, the view updates are streamed to other clients via
            websockets in real time, so they see the view count increase almost how it appears above.
        </p>


        <p>
            The source code is available on <a href="https://github.com/mattyhempstead/edhack/">GitHub</a>.

            I have patched the extension on three separate occasions now after Edstem has pushed an update which breaks it.

            After a certain point I won't be able to fix it anymore as I will have left uni and won't have access to ed. 🥹
        </p>



        <h2>
            Technology
        </h2>

        <p>
            The actual view botting technique is nothing special.
        </p>

        <p>
            I just noticed that the view updates were actually their own separate HTTP requests sent on
            the client-side to a special route, rather than being calculated server-side based on whenever
            post data was fetched.
        </p>

        <p>
            This meant I could easily trigger a view by just copying this same request on the client.
        </p>

        <p>
            The only painful part was automatically mocking the request as it needed a special session token provided
            by the server and I didn't want the user to have to open the network inspector to extract the token.
        </p>

        <p>
            I achieved this programmatically by intercepting and reading the token from the first <code>view</code> request that is sent
            when you open a post.
        </p>



        <details className='mt-4'>
            <summary className='italic cursor-pointer'>
                Expand for details on how I intercepted the request.
            </summary>
            <div className='ml-4 pl-4 border-l-[rgba(255,255,255,0.5)] border-l-2'>
                <p>
                    The actual method I intercepted network requests with was stupid given there is a literal <a
                        href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest"
                    >webRequest API</a> for this purpose, which I guess I wasn't aware of at the time.
                    So I've decided to hide these details.
                </p>

                <p>
                    But it's also so stupid that I want to write it up anyway. It also
                    might be useful for other scenarios where you need to override a builtin object/method in the DOM.
                </p>

                <br/>

                <p>
                    To begin, note that JavaScript is <a
                        href="https://github.com/mattyhempstead/edhack/blob/8724e31832624d2a5d352ad178d6253055ba1246/src/scripts/super-view.js#L19"
                    >insane</a> so you can just override the default built-in <code>fetch</code> method which
                    effectively lets you intercept every other network request sent with <code>fetch</code>.
                </p>

                <CodeBlock
                    codeLines={[
                        "const oldFetch = fetch;",
                        "const newFetch = function(fetchParams) {",
                        "   // Insert custom code",
                        "   oldFetch(fetchParams);",
                        "}",
                        "fetch = newFetch;"
                    ]}
                    className='mt-4'
                />

                <p>
                    Unfortunately, extensions exist with their own JavaScript execution environment that is separate from the DOM.
                    This means the <code>fetch</code> method for the extension is actually different from 
                    the <code>fetch</code> method that is called when the page sends a view request.
                </p>

                <p>
                    This can be fixed because, once again, JavaScript is <a
                        href="https://github.com/mattyhempstead/edhack/blob/master/src/scripts/inject.js"
                    >insane</a>. From the extension, we simply put our desired JS code into a file, create a script
                    element that sources that file, and append that script element to the DOM of our target JavaScript environment. The browser
                    will then execute the code in the context of the DOM's JS environment, rather than the extension's.
                </p>

                <CodeBlock
                    codeLines={[
                        "// Create script element",
                        "let injectedScript = document.createElement('script')",
                        "",
                        "// Assign element to a target source JavaScript file",
                        "injectedScript.src = chrome.runtime.getURL('path/to/script.js')",
                        "",
                        "// Append script element to body of DOM",
                        "document.body.appendChild(injectedScript)",
                    ]}
                    className='mt-4'
                />

                <p>
                    Don't do this unless you have a reason to :)
                </p>

            </div>
        </details>


    </ProjectPage>
}
