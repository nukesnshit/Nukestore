import Link from "next/link"
import { useEffect } from "react";

export default function NavBar() {
    var navBar = null;
    var logo = null;
    var logoText = null;

    //get url and set active link
    useEffect(() => {
        let url = window.location.href;
        let links = document.querySelectorAll("#Nav ul li div a");
        console.log(url)
        links.forEach(link => {
            if (link.href == url) {link.classList.add("active");}
        })
        
        navBar = document.getElementById("NavBarWrapper");
        logo = document.getElementById("NavPic");
        logoText = document.getElementById("LogoText");
        window.onscroll = function() {scrollFunction()};
    }, [])

    function scrollFunction() {
        //navbar height change
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          navBar.style.height = "70px";
          logo.style.height = "56px";
          logoText.style.fontSize = "inherit";
        } else {
          navBar.style.height = "90px";
          logo.style.height = "70px";
          logoText.style.fontSize = "26px";
        }
      }

    return (
        <div id="NavBarWrapper">
            <div id="NavBar">
                <div id="NavLogo">
                    <Link href="/" className="flexcenter">
                        <img id="NavPic" src="https://drive.google.com/uc?id=1GvI_zekOrVh1FJgAwDUQanYQWH0Te_Nj" alt="" />
                        <span id="LogoText">Nukes <span style={{color: "var(--color-main)"}}>n'</span> shit</span>
                    </Link>
                </div>
                <div id="Nav">
                    <ul>
                        <li className="flexcenter"><div><Link className="aeffect" href="/blog">
                            Blog
                        </Link></div></li>
                        <li className="flexcenter"><div><Link className="aeffect" href="/asdf">
                            Shop
                        </Link></div></li>
                        <li className="flexcenter"><div><Link className="aeffect" href="/#About">
                            About
                        </Link></div></li>
                        <li className="flexcenter"><div><Link className="aeffect" href="/asdf">
                            Contacts
                        </Link></div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}