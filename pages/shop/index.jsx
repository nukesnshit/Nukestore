import NavBar from "../../other/navbar"
import { useEffect, useState } from "react"
import Link from "next/link"

import { GraphQLClient, gql } from "graphql-request"

// animate on scroll library
import AOS from 'aos';
import 'aos/dist/aos.css';
import { calcAosTime } from "..";

const graphcms = new GraphQLClient(
    "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/cld4h09aa002801td1oul5cku/master"
);

const gqlQuery = gql`
    {
        products{
            title
            slug
          	price
            categories
          	coverPhoto{url}
        }
    }
`;

export async function getStaticProps(){
    const {products} = await graphcms.request(gqlQuery)
    return {
        props: {
            products,
        },
        revalidate: 90,
    }
}

export default function Blog({products}) {
    const [activeTag, setActiveTag] = useState("All")
    const [sortedItems, setSortedItems] = useState([])

    const tags = ["All", "Dosimetric equipment", "Masks", "Radioactive stuff", "Other"]

    // Filter posts by tag
    useEffect (() => { AOS.init() }, [])
    useEffect(() => {
        if(activeTag === "All"){setSortedItems(products)} 
        else { setSortedItems( products.filter(product => product.categories.includes(activeTag))) }
    }, [activeTag])

    return (
        <>
        <main>
            <NavBar />
            <section id="BlogContent">
                <div className="inner">
                    <div className="title">Store</div>
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
                                <div key={i} className="itemWrapper" data-aos="fade-down" data-aos-delay={calcAosTime(i, 50, !i)}>
                                    <div className="itemInner">
                                        <Link href={`/shop/${item.slug}`}>
                                            <div className="imgContainer">
                                                <div className="itemPrice">{item.price} €</div>
                                                <img src={item.coverPhoto.url} alt="" />
                                            </div>
                                        </Link>
                                        <div className="textContainer">
                                            <Link href={`/shop/${item.slug}`}>
                                                <h2>{item.title}</h2>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }): <p>No posts found</p>}
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}