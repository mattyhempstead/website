import Script from 'next/script';


/**
 * Component that inits GA4 in production mode only.
 *
 * Needs to be placed in every page and ideally not reloaded within a single page view (layout.tsx for root).
 * For a SPA we need to do some fancy manual event triggering (see link).
 * Easy solution is to just NOT be SPA.
 */
const GoogleAnalyticsInit = () => {
    const GTAG_ID = atob('Ry1MNlc1VFY5TDU5');  // Wow, so encrypt, very secure

    return (<>
        {process.env.NODE_ENV === 'production' && <>
        {/* https://medium.com/@mikegajdos81/how-to-add-googleanalytics-4-to-nextjs-app-in-4-simple-steps-3c6f9de2f866 */}
        <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        />
        <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
            __html: `
                console.log('GA4 Init.');
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GTAG_ID}', {
                    page_path: window.location.pathname,
                });
            `,
            }}
        />
        </>}
    </>)

}

export default GoogleAnalyticsInit;
