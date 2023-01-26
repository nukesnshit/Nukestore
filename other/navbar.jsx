import Link from "next/link"
import { useEffect, useState } from "react";

var currentLink = "";

export default function NavBar() {
    var navBar = null;
    var navUnderline = null;

    function ul(index, renewActive = false, to = null) {
        const root = document.documentElement;
        const el = document.querySelectorAll("#Nav ul li")[index];
        const rect = el.getBoundingClientRect()
        const navUnderline = document.getElementById("underline");

        var offset = (rect.left - (window.innerWidth / 2)) + el.offsetWidth / 2;
        offset = offset > 0 ? offset + 18 : offset + 18;
    
        navUnderline.style.transform = `translateX(${offset}px)`;

        setTimeout(() => {
            root.style.setProperty('--underline-translate', `translate3d(${offset}px,0,0)`);
        }, 400);
        
        if(renewActive) {
            let url = null;
            if(to !== null) {url = to}
            else {url = currentLink}
            let links = document.querySelectorAll("#Nav ul li div a");

            let i = 0;
            let active = 0;
            links.forEach(link => { link.classList.remove("active") })
            links.forEach(link => {
                if (url == "") {active = 2;}
                else if (link.innerHTML.toLowerCase().includes(url.toLowerCase())) {
                    link.classList.add("active");
                    active = i;
                } i+=1;
            })

            ul(active)
        }
    }

    //get url and set active link
    useEffect(() => {
        currentLink = window.location.href.split("/")[3].replace("#", "");
        let links = document.querySelectorAll("#Nav ul li div a");

        let i = 0;
        let active = 0;
        links.forEach(link => {
            if (currentLink == "") {active = 2;}
            else if (link.innerHTML.toLowerCase().includes(currentLink.toLocaleLowerCase())) {
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
        // Contact / About Section checker

        if(currentLink == "" || currentLink ==  "About" || currentLink == "Contact"){
            let contact = document.getElementById("ContactCheck");
            let about = document.getElementById("AboutCheck");

            if (contact.classList.contains("aos-animate")) {ul(4, true, "contact"); currentLink = "Contact";}
            else if (about.classList.contains("aos-animate")) {ul(3, true, "about"); currentLink = "About";}
            else {ul(2, true, ""); currentLink = "";}
        }

        // NavBar size
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          navBar.style.height = "70px";
          navUnderline.style.top = "56px";
        } else {
          navBar.style.height = "80px";
          navUnderline.style.top = "66px";
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
                        <li><div onClick={() => {ul(2, true); currentLink = ""}}><Link href="/" className="flexcenter" >
                            <img id="LogoImg" src="https://upload.wikimedia.org/wikipedia/commons/0/08/AtomBomb.png" />
                        </Link></div></li>
                        <li className="flexcenter"><div onClick={() => {ul(3, true); currentLink = "About"}}><Link href="/#About" >
                            About
                        </Link></div></li>
                        <li className="flexcenter"><div onClick={() => {ul(4, true); currentLink = "Contact"}}><Link href="/#Contact" >
                            Contact
                        </Link></div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}