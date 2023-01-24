import Link from "next/link"
import { useEffect, useState } from "react";


export default function NavBar() {
    var navBar = null;
    var navUnderline = null;

    function ul(index, renewActive = false) {

        const root = document.documentElement;
        const el = document.querySelectorAll("#Nav ul li")[index];
        const rect = el.getBoundingClientRect()
        const navUnderline = document.getElementById("underline");

        console.log(el)
    
        var offset = (rect.left - (window.innerWidth / 2)) + el.offsetWidth / 2;
        offset = offset > 0 ? offset + 18 : offset + 18;
    
        navUnderline.style.transform = `translateX(${offset}px)`;

        setTimeout(root.style.setProperty('--underline-translate', `translate3d(${offset}px,0,0)`), 500)
    
        if(renewActive){
            let url = window.location.href.split("/")[3].replace("#", "");
            let links = document.querySelectorAll("#Nav ul li div a");

            links.forEach(link => { link.classList.remove("active") })
            links.forEach(link => {
                if (url == "") {}
                else if (link.innerHTML.toLowerCase().includes(url.toLocaleLowerCase())) {
                    link.classList.add("active");
                }
            })
        }
    }

    //get url and set active link
    useEffect(() => {
        let url = window.location.href.split("/")[3].replace("#", "");
        let links = document.querySelectorAll("#Nav ul li div a");

        let i = 0;
        let active = 0;
        links.forEach(link => {
            if (url == "") {active = 2;}
            else if (link.innerHTML.toLowerCase().includes(url.toLocaleLowerCase())) {
                link.classList.add("active");
                active = i;
            } 
            i += 1;
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
                        <li><div onClick={() => ul(2, true)}><Link href="/" className="flexcenter" >
                            <img id="LogoImg" src="https://upload.wikimedia.org/wikipedia/commons/0/08/AtomBomb.png" />
                        </Link></div></li>
                        <li className="flexcenter"><div onClick={() => ul(3, true)}><Link href="/#About" >
                            About
                        </Link></div></li>
                        <li className="flexcenter"><div onClick={() => ul(4, true)}><Link href="/#Contact" >
                            Contact
                        </Link></div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}