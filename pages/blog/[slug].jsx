import NavBar from "../../other/navbar"
import { GraphQLClient, gql } from "graphql-request"
import Footer from "../../other/footer";

const graphcms = new GraphQLClient(
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cld4h09aa002801td1oul5cku/master"
);

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
            content {html}
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
        revalidate: 90,
    }
}


export default function Blog({post}) {
    return (
        <>
        <main>
            <NavBar />
            <section id="BlogContentMain">
                <div className="inner">
                    {post !== null ? (
                        <div>
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
        <Footer />
        </>
    )
}