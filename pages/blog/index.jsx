import NavBar from "../../other/navbar"
import { useEffect, useState } from "react"
import Link from "next/link"

import { GraphQLClient, gql } from "graphql-request"

// animate on scroll library
import AOS from 'aos';
import 'aos/dist/aos.css';
import { calcAosTime } from "..";

import Meta from "../../other/meta";

const graphcms = new GraphQLClient(
    "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/cld4h09aa002801td1oul5cku/master"
);

const gqlQuery = gql`
    {
        posts(first:90){
            title
            slug
            datePublished
            tags
            coverPhoto {url}
            author { name }
        }
    }
`;

export async function getStaticProps(){
    const {posts} = await graphcms.request(gqlQuery)
    return {
        props: {
            posts,
        },
        revalidate: 60,
    }
}

export default function Blog({posts}) {
    
    Meta.defaultProps = {
        title: "Nukes n' shit | Blog",
        keywords: ["Bunker", 'USSR', 'abandoned', 'urbex', 'fallout shelter', 'restoration', 'military', 'urban exploration', 'nuclear shelter', 'nuclear', 'atomic bomb', 'secret bunker', 'soviet bunker', 'soviet military'],
        description: "Documentation of historically significant locations.",
        topic: "Exploration",
        type: "blog"
    }    

    const [activeTag, setActiveTag] = useState("All")
    const [sortedPosts, setPosts] = useState([])

    const tags = ["All", "Bunkers", "Abandoned", "Industrial", "Restoration"]

    // Filter posts by tag
    useEffect (() => { AOS.init() }, [])
    useEffect(() => {
        const items = document.getElementsByClassName("itemWrapper")
        for (let i = 0; i < items.length; i++) { items[i].classList.remove("itemAnim") } 

        if(activeTag === "All"){setPosts(posts)} 
        else { setPosts(posts.filter(post => post.tags.includes(activeTag))) }

        // should replace this with a better solution, maybe a ref
        var checkExist = setInterval(function() {
            const items = document.getElementsByClassName("itemWrapper")
            if (items.length > 0) {
                for (let i = 0; i < items.length; i++) { items[i].classList.add("itemAnim") } 
                clearInterval(checkExist);
            }
        }, 50);
    }, [activeTag])

    return (
        <>
        <Meta />
        <main>
            <NavBar />
            <section id="BlogContent">
                <div className="inner">
                    <div className="title">blog</div>
                    <div className="tagContainer flexcenter">
                        {tags.map((tag, i) => {
                            return (
                                <div key={i} className={`tag ${tag === activeTag ? "active":""}`} onClick={() => setActiveTag(tag)}>
                                    <span>{tag.toUpperCase()}</span>
                                </div>)
                        })}
                    </div>
                    <div className="postContainer">
                        {  typeof sortedPosts !== undefined ? sortedPosts.map((post, i) => {
                            return (
                                <div key={i} className="itemWrapper" style={{animationDelay: `${calcAosTime(i, 0.5, !i) * 0.1}s`}}>
                                    <div className="itemInner">
                                        <Link href={`/blog/${post.slug}`}>
                                            <div className="imgContainer">
                                                <img src={post.coverPhoto.url} alt="" />
                                            </div>
                                        </Link>
                                        <div className="textContainer">
                                            <p className="dateName"><span>{post.datePublished}</span><span className="rightText">{post.author.name}</span></p>
                                            <Link href={`/blog/${post.slug}`}>
                                                <h2>{post.title}</h2>
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