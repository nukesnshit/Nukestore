import Link from "next/link"
import { useEffect } from "react";

var currentLink = "";
var scrollCheckDisabled = false;

export function ul(index, calledFromScroll = false) {
    const el = document.querySelectorAll("#Nav ul li")[index];
    let links = document.querySelectorAll("#Nav ul li div a");
    const rect = el.getBoundingClientRect()
    const navUnderline = document.getElementById("underline");

    var offset = (rect.left - (window.innerWidth / 2)) + el.offsetWidth / 2;
    offset = offset > 0 ? offset + 18 : offset + 18;

    navUnderline.style.transform = `translateX(${offset}px)`;
    links.forEach(link => { link.classList.remove("active") })
    links[index].classList.add("active");
    
    if (!calledFromScroll) {
        scrollCheckDisabled = true;
        setTimeout(() => {scrollCheckDisabled = false;}, 400);
    }
}

export default function NavBar() {
    var navBar = null;
    var navUnderline = null;

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

        currentLink = window.location.href.split("/")[3].replace("#", "");
        const linkafter = window.location.href.split("/")[4];
        if(currentLink == "" || currentLink ==  "About" || currentLink == "Contact"){
            if(scrollCheckDisabled) {return;}
            let contact = document.getElementById("ContactCheck");
            let about = document.getElementById("AboutCheck");

            if (contact.classList.contains("aos-animate")) {ul(4, true); currentLink = "Contact";}
            else if (about.classList.contains("aos-animate")) {ul(3, true); currentLink = "About";}
            else {ul(2, true); currentLink = "";}

        } else if (currentLink == "blog" && linkafter !== undefined) { // top scrollbar
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            document.getElementById("myBar").style.width = scrolled + "%";
        }

        // NavBar size
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          navBar.style.height = "70px";
          navUnderline.style.top = "56px";
          if(currentLink == "blog" && linkafter !== undefined) {document.getElementsByClassName("progress-container")[0].style.top = "70px"}
        } else {
          navBar.style.height = "80px";
          navUnderline.style.top = "66px";
          if(currentLink == "blog" && linkafter !== undefined) {document.getElementsByClassName("progress-container")[0].style.top = "80px"}
        }
      }

    return (
        <div id="NavBarWrapper">
            <div id="NavBar">
                <div id="Nav">
                    <ul>
                        <div id="underline"></div>
                        <li className="flexcenter"><div onClick={() => ul(0)}><Link href="/blog-new" >
                            Blog
                        </Link></div></li>
                        <li className="flexcenter"><div onClick={() => ul(1)}><Link href="/shop-new" >
                            Shop
                        </Link></div></li>
                        <li><div onClick={() => {ul(2); currentLink = ""}}><Link href="/" className="flexcenter" >
                            <img id="LogoImg" src="https://upload.wikimedia.org/wikipedia/commons/0/08/AtomBomb.png" />
                        </Link></div></li>
                        <li className="flexcenter"><div onClick={() => {ul(3); currentLink = "About"}}><Link href="/#About" >
                            About
                        </Link></div></li>
                        <li className="flexcenter"><div onClick={() => {ul(4); currentLink = "Contact"}}><Link href="/#Contact" >
                            Contact
                        </Link></div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
