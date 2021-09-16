import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../lib/gtag";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-KKGBCHR');`,
            }}
          ></script>

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <meta name="facebook-domain-verification" content="hzwnc3uq7ovm66xn79ikvxfmvmh3ra" />
          <script>(adsbygoogle = window.adsbygoogle || []).push({})</script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          {/* <script
          dangerouslySetInnerHTML={{
              __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId            : '371473093920836',
                  autoLogAppEvents : true,
                  xfbml            : true,
                  version          : 'v12.0'
                });
              };
          `,
            }}>
 
</script>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script> */}
          <meta name="theme-color" content="#3550d6" />

          <link
            href="https://fonts.googleapis.com/css2?family=Courgette&family=Langar&family=Lobster&family=Merriweather+Sans&family=Merriweather:wght@700&family=Roboto:wght@100;500&family=Rubik&family=Ubuntu:wght@700&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Merriweather:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Pacifico&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          />

          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          />
          {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}

          <script
            data-ad-client="ca-pub-8688069387563825"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>

          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v9.0&appId=1056911567659889&autoLogAppEvents=1"
            nonce="sUw6G8WE"
          ></script>
        </Head>
        <body className="custom_class">
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KKGBCHR"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          <Main />
          <NextScript />
          <script
            async
            src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
