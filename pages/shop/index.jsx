import { useEffect, useState } from "react"
import Link from "next/link"

// animate on scroll library
import AOS from 'aos';
import 'aos/dist/aos.css';
import { calcAosTime } from "..";

import Meta from "../../other/meta";

import { api } from "..";

export async function getStaticProps(){
    const products = await fetch(`${api}/products`).then(res => res.json())
    return {
        props: {
            products,
        },
        revalidate: 60,
    }
}

const productsPerPage = 99;

export default function Shop({products}) {
    const tags = ["All", "Dosimetric Equipment", "Masks", "Radioactive Stuff", "Other"]

    Meta.defaultProps = {
        title: "Nukes n' shit | Store",
        keywords: `Dosimetric equipment, Masks, "adioactive stuff`,
        description: "We are committed to preserving and restoring historical artifacts through expert restoration work, acquisition and sales of antiques.",
        topic: "Antiques",
        type: "shop"
    }

    const [activeTag, setActiveTag] = useState("All")
    const [activePage, setActivePage] = useState(1)
    const [sortedItems, setSortedItems] = useState([])

    // Filter posts by tag
    useEffect (() => { AOS.init() }, [])
    useEffect(() => {
        const items = document.getElementsByClassName("itemWrapper")
        for (let i = 0; i < items.length; i++) { items[i].classList.remove("itemAnim") } 

        if(activeTag === "All"){setSortedItems(products)} 
        else { setSortedItems( products.filter(product => product.tags.includes(activeTag))) }
        
        // should replace this with a better solution, maybe a ref
        var checkExist = setInterval(function() {
            const items = document.getElementsByClassName("itemWrapper")
            if (items.length > 0) {
                for (let i = 0; i < items.length; i++) { items[i].classList.add("itemAnim") } 
                clearInterval(checkExist);
            }
         }, 50);
    
    }, [activeTag, activePage])

    useEffect(() => {
        setActivePage(1)
    }, [sortedItems])

    return (
        <>
        <Meta  />
        <main>
            <section id="BlogContent">
                <div className="inner">
                    <div className="title large">Store</div>
                    <div className="tagContainer flexcenter">
                        {tags.map((tag, i) => {
                            return (
                                <div key={i} className={`tag ${tag === activeTag ? "active":""}`} onClick={() => setActiveTag(tag)}>
                                    <span>{tag.toUpperCase()}</span>
                                </div>)
                        })}
                    </div>
                    <div className="postContainer" id="itemContainer">
                        {  typeof sortedItems !== undefined ? sortedItems.map((item, i) => {
                            return (
                                i < productsPerPage * activePage && i >= productsPerPage * (activePage - 1) ? (
                                <div key={i} className="itemWrapper" style={{animationDelay: `${calcAosTime(i, 0.5, !i) * 0.1}s`}}>
                                    <div className="itemInner">
                                        <Link href={`/shop/${item.slug}`}>
                                            <div className="imgContainer">
                                                <div className="itemPrice">{item.price} €</div>
                                                <img src={item.coverPhoto} alt="" />
                                            </div>
                                        </Link>
                                        <div className="textContainer">
                                            <p className="dateName"><span>{item.condition === "New_old_stock" ? "New Old Stock":"Used"}</span><span className="textCenter">Quantity: {item.quantity}</span></p>
                                            <Link href={`/shop/${item.slug}`}>
                                                <h2>{item.title}</h2>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                ) : null
                            )
                        }): <p>No posts found</p>}
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}

/*
                    {sortedItems.length > 0 ? (
                        <div id="PageNumeration">
                            {activePage == 1 ? <div className="invisButton" />: null}
                            {activePage > 1 ? <div className="pageButton" onClick={() => setActivePage(activePage - 1)}>{activePage-1}</div> : null}
                            <div className="pageButton active">{activePage}</div>
                            {sortedItems.length > productsPerPage * activePage ? (<div className="pageButton" onClick={() => setActivePage(activePage + 1)}>{activePage+1}</div>)
                            : <div className="invisButton"/>}
                        </div>
                    ) : null}
*/