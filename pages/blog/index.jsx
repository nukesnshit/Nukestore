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
        posts {
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
    const [activeTag, setActiveTag] = useState("All")
    const [sortedPosts, setPosts] = useState([])

    const tags = ["All", "Bunkers", "Abandoned", "Industrial", "Restoration"]

    // Filter posts by tag
    useEffect (() => { AOS.init() }, [])
    useEffect(() => {
        if(activeTag === "All"){setPosts(posts)} 
        else { setPosts(posts.filter(post => post.tags.includes(activeTag))) }
    }, [activeTag])

    return (
        <>
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
                                <div key={i} className="itemWrapper" data-aos="fade-down" data-aos-delay={calcAosTime(i, 50, !i)}>
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