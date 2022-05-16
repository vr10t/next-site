import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head >
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBuFjJNcbmXysynZCmCUMMVvvHY_q8kIQw&libraries=places"
        ></script>
        </Head>
      <body>
        <Main />
        <NextScript />
        
      </body>
    </Html>
  )
}