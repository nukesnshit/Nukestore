import Link from "next/link"
import { useEffect } from "react";

function ul(index) {
    const root = document.documentElement;
    const el = document.querySelectorAll("#Nav ul li")[index];
    const rect = el.getBoundingClientRect()
    const navUnderline = document.getElementById("underline");

    var offset = (rect.left - (window.innerWidth / 2)) + el.offsetWidth / 2;
    offset = offset > 0 ? offset + 18 : offset + 18;
    navUnderline.style.transform = `translateX(${offset}px)`;
    setTimeout(root.style.setProperty('--underline-translate', `translate3d(${offset}px,0,0)`), 500)
}

export default function NavBar() {
    var navBar = null;
    var navUnderline = null;

    //get url and set active link
    useEffect(() => {
        let url = window.location.href.split("/")[3];
        let links = document.querySelectorAll("#Nav ul li div a");

        let i = 0;
        let active = 0;
        links.forEach(link => {
            if (url == "") {active = 2;}
            else if (link.innerHTML.toLowerCase().includes(url)) {
                link.classList.add("active");
                active = i;
            } i += 1;
        })

        navBar = document.getElementById("NavBarWrapper");
        navUnderline = document.getElementById("underline");
        window.onscroll = function() {scrollFunction()};

        // get active link and set underline
        ul(active);

    }, [])

    function scrollFunction() {
        //navbar height change
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          navBar.style.height = "70px";
          navUnderline.style.top = "56px";
          //logo.style.height = "56px";
          //logoText.style.fontSize = "inherit";
        } else {
          navBar.style.height = "80px";
          navUnderline.style.top = "66px";
          //logo.style.height = "70px";
          //logoText.style.fontSize = "26px";
        }
      }

    return (
        <div id="NavBarWrapper">
            <div id="NavBar">
                <div id="Nav">
                    <ul>
                        <div id="underline"></div>
                        <li className="flexcenter"><div><Link href="/blog" >
                            Blog
                        </Link></div></li>
                        <li className="flexcenter"><div><Link href="/shop" >
                            Shop
                        </Link></div></li>
                        <li><Link href="/" className="flexcenter" >
                            <span id="LogoText">Nukes <span style={{color: "var(--color-main)"}}>n'</span> shit</span>
                        </Link></li>
                        <li className="flexcenter"><div><Link href="/#About">
                            About
                        </Link></div></li>
                        <li className="flexcenter"><div><Link href="/#">
                            Contacts
                        </Link></div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}