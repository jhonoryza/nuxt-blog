// plugins/gtm.client.ts
export default defineNuxtPlugin(() => {
    console.log('GTM Plugin Loaded! 🚀')

    useHead({
        script: [
        {
            tagPosition: 'head',
            children: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-NP47SKXF');
            `,
            type: 'text/javascript'
        }
        ],
    })
})
