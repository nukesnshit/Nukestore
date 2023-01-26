import '../styles/globals.css'
import '../styles/main.css'
import '../styles/navbar.css'
import '../styles/blog.css'
import '../styles/store.css'
import '../styles/footer.css'
import Head from 'next/head'
import Footer from '../other/footer'
import NavBar from '../other/navbar'

export default function App({ Component, pageProps }) {
  return(<>
    <Head>
      <title>Nukes n' shit</title>
      <meta name="description" content="We are committed to preserving and restoring historical artifacts through expert restoration work, acquisition and sales of antiques, and documentation of historically significant locations. Our goal is to ensure that the past is preserved for future generations and made accessible to all." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
    <Footer />
  </>)
}
