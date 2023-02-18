import Link from "next/link"

export default function Custom404() {
    return(
        <div id="NotFound" className="flexcenter">
            <p>NUKES N<span style={{animation: "asddMainColor 3s linear infinite"}}>'</span> SHIT</p>
            <h1>404</h1>
            <Link href="/" id="NotFoundBtn" className="flexcenter"> HOME </Link>
            <div className="frame">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}