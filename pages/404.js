import Link from "next/link"

export default function Custom404() {
    return(
        <div id="NotFound">
            <h1>404</h1>
            <Link href="/" id="NotFoundBtn" className="flexcenter"> HOME </Link>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/AtomBomb.png" alt="404" id="NotFoundImg" />
            <div class="frame">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}