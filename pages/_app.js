import '../styles/globals.css'
import '../styles/main.css'
import '../styles/navbar.css'
import '../styles/blog.css'
import '../styles/store.css'
import '../styles/footer.css'
import Footer from '../other/footer'
import NavBar from '../other/navbar'
import ThreeBackground from '../other/background'

export default function App({ Component, pageProps }) {
  return(<>
    <NavBar />
    <ThreeBackground/>
    <Component {...pageProps} />
    <Footer />
  </>)
}
