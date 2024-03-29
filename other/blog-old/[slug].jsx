/*
import { GraphQLClient, gql } from "graphql-request"

import Meta from "../../other/meta";

const gqlQuery = gql`
    query Post($slug: String!) {
        post(where: {slug: $slug}) {
            title
            slug
            datePublished
            tags
            coverPhoto {url}
            author {
                name 
                avatar {url}
            }
            content {html, markdown}
        }
    }
`;

const slugList = gql`
    {
        posts {
            slug
        }
    }
`;

export async function getStaticPaths() {
    const {posts} = await graphcms.request(slugList)
    return {
        paths: posts.map(post => ({ params: { slug: post.slug } })),
        fallback: 'blocking',
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug
    const data = await graphcms.request(gqlQuery, {slug})
    const post = data.post
    return {
        props: {
            post,
        },
        revalidate: 300,
    }
}

export default function Blog({post}) {
    Meta.defaultProps = {
        title: "Nukes n' shit | Blog",
        keywords: `${post.title}, ${post.tags.toString()}`,
        description: post.content.markdown,
        topic: post.title,
        type: "blog"
    }    

    /*
                <style jsx global>
                {`::-webkit-scrollbar-thumb { background-color: var(--color-main); }`}
            </style>
    

    return (
        <>
        <Meta />
        <main>
            <div className="progress-container">
                <div className="progress-bar" id="myBar"></div>
            </div>
            <style jsx global>
                {`#NavBarWrapper { background-color: rgb(0 0 0 / 80%); box-shadow: 0 0 20px 0 rgba(0,0,0,0.8); }`}
            </style>
            <section id="BlogContentMain">
                <div>
                    {post !== null ? (
                        <div className="inner" style={{flexDirection: "column", alignItems: "center"}}>
                            <div className="title"> {post.title} </div>
                            <div className="Date"> {post.datePublished} - {post.tags.map((tag, i) => (
                                <span key={i}>{tag}{i || post.tags.length === 1 ? "":", "}</span>
                            ))} </div>
                            <div id="BlogHtml" dangerouslySetInnerHTML={{__html: post.content.html}} ></div>
                        </div>
                    ) : ( <div> Loading... </div> )}
                </div>
            </section>
        </main>
        </>
    )
}*/