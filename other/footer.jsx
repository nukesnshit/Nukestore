import Link from "next/link"
import { ul } from "./navbar"

export default function Footer () {
    return (
        <footer>
            <div className="flex">
                <div id="FooterLeft">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/AtomBomb.png" alt=""></img>
                    <div id="FooterName">Nukes <span className="" style={{color: "var(--color-main)"}}>n'</span> shit</div>
                    <p>Working for you since 2018</p>
                </div>
                <div id="FooterNav">
                    <Link className="NavBtn" href="/" onClick={() => ul(2)}>Home</Link>
                    <Link className="NavBtn" href="/blog" onClick={() => ul(0)}>Blog</Link>
                    <Link className="NavBtn" href="/shop" onClick={() => ul(1)}>Shop</Link>
                    <Link className="NavBtn" href="/#About" onClick={() => ul(3)}>About</Link>
                    <Link className="NavBtn" href="/#Contact" onClick={() => ul(4)}>Contact</Link>
                </div>
            </div>
            <div id="copyright">
                <p>2022 © Nukesnshit.com</p></div>
        </footer>
    )
}