import Meta from "../../other/meta";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";

const api = "https://nukesnshit.ignuxas.com/api";

export async function getStaticPaths() {
    const posts = await fetch(`${api}/blog-posts`).then(res => res.json())
    return {
        paths: posts.map(post => ({ params: { slug: post.slug } })),
        fallback: 'blocking',
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug;
    const post = await fetch(`${api}/blog-posts/${slug}`).then(res => res.json())
    return {
        props: {
            post,
        },
        revalidate: 300,
    }
}

export default function Blog({post}) {
    Meta.defaultProps = {
        title: post.metaTitle,
        keywords: `${post.tags}`,
        description: post.metaDescription,
        topic: post.title,
        type: "blog"
    }    

    function handlePostComment() {
        const name = document.getElementById("questionNameQ").value;
        const content = document.getElementById("questionContentQ").value;
        const email = document.getElementById("questionEmailQ").value;
        const data = {
            name: name ? name : "Anonymous",
            email,
            content,
            relationID: post.id,
        }
        fetch(`${api}/post-comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(res => {
            if(res.ok) {
                const okPopup = document.getElementById("okPopup");
                okPopup.style.transform = "translateX(0)";
                setTimeout(() => {
                    okPopup.style.transform = "translateX(110%)";
                }, 7000);
            } else {
                const errorPopup = document.getElementById("ErrPopup");
                errorPopup.style.transform = "translateX(0)";
                setTimeout(() => {
                    errorPopup.style.transform = "translateX(110%)";
                }, 7000);
            }
        })
    }

    useEffect(() => {
        const zoomImgContainer = document.getElementById("imgZoomContainer");
        const zoomImgExit = document.getElementById("zoomImgExit");
        const blogHTML = document.getElementById("BlogHtml");
        const images = blogHTML.getElementsByTagName("img");
        const zoomImg = document.getElementById("zoomImg");

        for (let i = 0; i < images.length; i++) { // add click event to all images
            images[i].addEventListener("click", () => {
                imageZoom(images[i]);
            })
        }

        zoomImgExit.addEventListener("click", () => {
            zoomImgContainer.style.animation = "fadeOut 0.5s ease-in-out forwards";
        })

        zoomImg.addEventListener("click", (e) => {
            if(zoomImg.style.transform === "scale(1)") { // zoom into zoomImg
                const rect = zoomImg.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                zoomImg.style.transformOrigin = `${x}px ${y}px`;
                zoomImg.style.cursor = "zoom-out";
                zoomImg.style.transform = "scale(2)";
                zoomImg.classList.add("zoomed");
            } else { // zoom out of zoomImg
                zoomImg.style.cursor = "zoom-in";
                zoomImg.style.transform = "scale(1)";
                zoomImg.style.transformOrigin = `unset`;
            }
        })
    }, [])

    /*--------------------
    Image zoom
    -------------------*/

    function imageZoom(image){
        const zoomImgContainer = document.getElementById("imgZoomContainer");
        const zoomImg = document.getElementById("zoomImg");
        const imgSrc = image.src;

        zoomImg.src = "";
        zoomImg.src = imgSrc;
        zoomImg.style.transformOrigin = `unset`;
        zoomImg.style.transform = "scale(1)";
        zoomImg.style.cursor = "zoom-in";
        zoomImgContainer.style.animation = "fadeIn 0.5s ease-in-out forwards";
    }

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
                <div className="inner flexcenter">
                    {post !== null ? (
                        <div style={{width: "var(--max-width-blog)"}}>
                            <div>
                                <div className="title"> {post.title} </div>
                                <div className="Date"> {post.datePublished} - {post.tags.map((tag, i) => (
                                    <span key={i}>{tag}{i || post.tags.length === 1 ? "":", "}</span>
                                ))} </div>
                                <div id="BlogHtml" dangerouslySetInnerHTML={{__html: post.content}} ></div>
                            </div>
                            {post.comments.length > 0 ? ( // comments
                                <>
                                <div className="QnA">Comments ({post.comments.length})</div>
                                <div id="questions">
                                {post.comments.map((comment, i) => {
                                    return(
                                        <div className="question" key={i}>
                                            <div className="questionHeader">
                                                <span className="userName">{comment.name}</span> - <span>{comment.content}</span>
                                                <span className="questionDate"> {comment.createdAt.substring(0, 10)}</span>
                                            </div>
                                        </div>)
                                })}
                                </div>
                                </>
                        ) : null}
                        <div style={{marginBottom: "var(--pad-4x)"}}>
                            <div id="questionForm">
                            <form method="POST" action="javascript:void(0);" onSubmit={() => handlePostComment()}>
                                <div className="QnA">
                                    {post.comments.length > 0 ? "Post a comment" : "Be the first to comment!"}
                                    <button>Submit <FontAwesomeIcon icon={faChevronRight}/> </button>
                                </div>
                                <div className="questionFormHeader">
                                    <input type="text" name="name" placeholder="Name" maxLength={64} id="questionNameQ" style={{width: "calc(50% - 5px)"}}/>
                                    <input type="email" name="_replyto" required placeholder="Email" maxLength={64} id="questionEmailQ" style={{width: "calc(50% - 5px)"}}/>
                                </div>
                                <textarea name="content" placeholder="Content" maxLength={512} required id="questionContentQ"/>
                            </form>
                        </div>
                    </div>
                        </div>
                    ) : ( <div> Loading... </div> )}
                    <div id="BlogPanel">
                        <span id="BlogPanelTitle">Nukes <span style={{color: "var(--color-main)"}}>n'</span> shit</span>
                        <div className="recommended">
                            <div className="panelTitle">Recommended</div>
                            <div className="grayBox">
                                {post.recommendedPosts.map((post, i) => (
                                    <div><a href={`/blog/${post.slug}`}>{post.title}</a></div>
                                ))}
                            </div>
                        </div>
                        <div className="author">
                            <div className="avatar">
                                <img src={post.author.avatar}></img>
                            </div>
                            <div className="authorData">
                                <div>
                                    <h5>The Author</h5>
                                    <h3 className="authorName">{post.author.name}</h3>
                                </div>
                                {post.author.socials ? ( // socials
                                    <div className="socials">
                                        {post.author.socials.facebook ? ( // facebook
                                        <>
                                            <a href={post.author.socials.facebook} target="_blank" rel="noopener noreferrer">
                                                facebook
                                            </a> {post.author.socials.website ? " | " : null}
                                        </>
                                        ) : null}
                                        {post.author.socials.website ? ( // website
                                            <a href={post.author.socials.website} target="_blank" rel="noopener noreferrer">
                                                website
                                            </a>
                                        ) : null}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <div className="Popup" id="okPopup">
                    <div><FontAwesomeIcon icon={faCheck}/></div>
                    <div>
                        <h2 className="textCenter" style={{marginTop: "var(--pad-1x)"}}>Success!</h2>
                        <p>Your comment has been received and is currently under review!</p>
                    </div>
                </div>
                <div className="Popup red" id="ErrPopup">
                    <div><FontAwesomeIcon icon={faXmark}/></div>
                    <div>
                        <h2 className="textCenter" style={{marginTop: "var(--pad-1x)"}}>Error.</h2>
                        <p>Something went wrong. If you think this is a mistake please contact us - 
                            <a className="aeffect" style={{color:"var(--color-main)"}} href="mailto:info@nukesnshit.com">info@nukesnshit.com</a>.
                        </p>
                    </div>
                </div>
            </div>
            <div id="imgZoomContainer" className="flexcenter">
                <img id="zoomImg"></img>
                <div id="zoomImgExit"></div>
            </div>
        </main>
        </>
    )
}