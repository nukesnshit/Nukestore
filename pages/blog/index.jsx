import { useEffect, useState } from "react"
import Link from "next/link"

// animate on scroll library
import AOS from 'aos';
import 'aos/dist/aos.css';
import { calcAosTime } from "..";

import Meta from "../../other/meta";
import { api } from "../index"

export async function getStaticProps(){
    const posts = await fetch(`${api}/blog-posts`).then(res => res.json())
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
        keywords: ["Bunker", 'USSR', 'Abandoned'],
        description: "Documentation of historically significant locations.",
        topic: "Exploration",
        type: "blog"
    }    

    const [activeTag, setActiveTag] = useState("All")
    const [sortedPosts, setPosts] = useState([])

    const tags = ["All", "Bunkers", "Abandoned", "Archive", "Restoration", "News", "Other"]

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
            <section id="BlogContent">
                <div className="inner">
                    <div className="title large">blog</div>
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
                                                <img src={post.coverPhoto} alt="" />
                                            </div>
                                        </Link>
                                        <div className="textContainer">
                                            <p className="dateName"><span>{post.datePublished}</span><span className="rightText">{post.authorName}</span></p>
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
