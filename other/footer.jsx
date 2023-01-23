import Link from "next/link"

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
                    <Link className="NavBtn" href="/">Home</Link>
                    <Link className="NavBtn" href="/blog">Blog</Link>
                    <Link className="NavBtn" href="/shop">Shop</Link>
                    <Link className="NavBtn" href="/produktai">About</Link>
                    <Link className="NavBtn" href="/contact">Contact</Link>
                </div>
            </div>
            <div id="copyright">
                Website Designed and Built by <a className="aeffect" href="https://ignuxas.com/">Ignas Mikolaitis</a> <br />
                <p>2022 © Nukesnshit.com</p></div>
        </footer>
    )
}