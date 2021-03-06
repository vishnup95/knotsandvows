import { getAppEnv } from '../config/env';

const env = getAppEnv();
const { NODE_ENV, PUBLIC_URL = '' } = env.raw;

let assetManifest;
if (NODE_ENV === 'production') {
  assetManifest = require('../build/asset-manifest.json');
} else {
  assetManifest = {
    'main.js': '/main.bundle.js'
  };
}

const preloadScripts = bundles => {
  const mainJS = assetManifest['main.js'];
  const bundleFilePaths = bundles
    .filter(bundle => bundle.file.match(/\.js$/))
    .map(jsBundle => `${PUBLIC_URL}/${jsBundle.file}`);

  return [...bundleFilePaths, mainJS]
    .map(
      jsFilePath =>
        `<link rel="preload" as="script" href="${jsFilePath}"></script>`
    )
    .join('');
};

const cssLinks = () => {
  if (NODE_ENV !== 'production') {
    return '';
  }

  return Object.keys(assetManifest)
    .filter(file => file.match(/\.css$/))
    .map(cssFile => assetManifest[cssFile])
    .map(cssFilePath => `<link rel="stylesheet" href="${cssFilePath}">`)
    .join('');
};

const jsScripts = bundles => {
  const mainJS = assetManifest['main.js'];
  const bundleFilePaths = bundles
    .filter(bundle => bundle.file.match(/\.js$/))
    .map(jsBundle => `${PUBLIC_URL}/${jsBundle.file}`);

  return [...bundleFilePaths, mainJS]
    .map(
      jsFilePath =>
        `<script type="text/javascript" src="${jsFilePath}" defer></script>`
    )
    .join('');
};

export const indexHtml = ({ helmet, initialState, markup, bundles }) => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();
  const gtmId = process.env.GTM_ID;
  // const conversionId = process.env.CONVERSION_ID;
  const gaTag = process.env.GA_TRACKING_ID;
  const pureChatAppID = process.env.PURE_CHAT_APP_ID;
  const pixelId = process.env.FACEBOOK_PIXEL_ID;


  return `
    <!doctype html>
    <html lang="en" ${htmlAttrs}>
      <head>
      <meta name="google-site-verification" content=${process.env.GOOGLE_SITE_VERIFICATION} />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <meta property="og:title" content="Knots&Vows" />
        <meta property="og:url" content="https://www.knotsandvows.co.in" />
        <meta property="og:description" content="Trusted wedding planners" />
        <meta property="og:image" content="https://d2ac09n5vmchb0.cloudfront.net/react-app/images/knots_WA.png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        ${helmet.link.toString()} 
        <!-- Pure Chat -->
        <script data-cfasync='false'>window.purechatApi = { l: [], t: [], on: function () { this.l.push(arguments); } }; (function () { var done = false; var script = document.createElement('script'); script.async = true; script.type = 'text/javascript'; script.src = 'https://app.purechat.com/VisitorWidget/WidgetScript'; document.getElementsByTagName('HEAD').item(0).appendChild(script); script.onreadystatechange = script.onload = function (e) { if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) { var w = new PCWidget({c: '${pureChatAppID}', f: true }); done = true; } }; })();</script>
        <!-- End Pure Chat -->
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link rel="stylesheet" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css">
        <link rel="preload" href="https://fonts.googleapis.com/css?family=Frank+Ruhl+Libre:400,500,700|Roboto:300,400,500,700,900&display=swap" as="style" onload="this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Frank+Ruhl+Libre:400,500,700|Roboto:300,400,500,700,900&display=swap"></noscript>               
        
        
        
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');</script>
        <!-- End Google Tag Manager -->
        
        <!--- GA --- AD-ID-->
        <!-- Global site tag (gtag.js) - Google Ads: 745108214 -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-745108214"></script>
          <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-745108214');
          </script>

        <!-- Facebook Pixel Code -->
        <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}'); 
        fbq('track', 'PageView');
        </script>
        <noscript>
         <img height="1" width="1" 
        src="https://www.facebook.com/tr?id=450420929053700&ev=PageView
        &noscript=1"/>
        </noscript>
        <!-- End Facebook Pixel Code -->
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=${gaTag}"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${gaTag}');
        </script>

        <script> 
          purechatApi.on('chatbox.available:change', function (args) { 
            // console.log(args.available) // Prints the ID of the chatbox to the console window 
            if(args.available){
             document.getElementById('btnCallMe').style.display = 'none';
            }else{
             document.getElementById('btnCallMe').style.display = 'block'; 
            }  
          }); 
        </script>
        

        ${cssLinks()}
        ${helmet.style.toString()}
        ${helmet.script.toString()}
        ${helmet.noscript.toString()}

      </head>
      <body ${bodyAttrs}>
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
        <div id="root">${markup}</div>

        <script>
          window.process = ${env.forIndexHtml};
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          window.assetManifest = ${JSON.stringify(assetManifest)}
        </script>

        ${jsScripts(bundles)}
      </body>
    </html>
  `;
};
