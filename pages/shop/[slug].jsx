import { GraphQLClient, gql } from "graphql-request"

//swiper
import Swiper, { Navigation, Thumbs, Zoom, Mousewheel } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import { useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import Meta from "../../other/meta";

const api = "https://nukesnshit.ignuxas.com/api";

export async function getStaticPaths() {
    const slugList = await fetch(`${api}/products`).then(res => res.json())

    return {
        paths: slugList.map(product => ({ params: { slug: product.slug } })),
        fallback: "blocking",
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug
    const product = await fetch(`${api}/products/${slug}`).then(res => res.json())
    return {
        props: {
            product,
        },
        revalidate: 300,
    }
}

export default function ProductPage({product}) {
    Meta.defaultProps = {
        title: "Nukes n' shit | Store",
        keywords: `${product.title}, ${product.tags.toString()}`,
        description: `${product.metaDescription}`,
        topic: product.title,
        type: "shop"
    }    

    useEffect(() => {
        /*--------------------
        SWIPER
        -------------------*/

        Swiper.use([Navigation, Thumbs, Zoom, Mousewheel]); // initialize swiper

        var swiperThumb = new Swiper(".imgSwiper2", {
            direction: 'horizontal',
            spaceBetween: 10,
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true,
        });

        const swiper = new Swiper('.imgSwiper', {
        // Optional parameters
        direction: 'horizontal',
        mousewheel: true,
        keyboardControl: true,

        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },

        thumbs: {
            swiper: swiperThumb,
        },

        zoom: {
            maxRatio: 2.2,
            minRatio: 1
        },
        });
    }, []);


    // Form does not work, I don't know why, this'll work for now
    function handleQuestion() {
        const content = document.getElementById("questionContentQ").value;
        const email = document.getElementById("questionEmailQ").value;
        var name = document.getElementById("questionNameQ").value;

        name ? name : name = "Anonymous";

        const question = {
            content,
            email,
            name,
            productID: product.id
        }

        fetch(`${api}/post-question`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question)
        }).then(res => {
            if(res.ok) {
                const okPopup = document.getElementById("okPopup");
                okPopup.style.transform = "translateX(0)";
                setTimeout(() => {
                    okPopup.style.transform = "translateX(110%)";
                }, 7000);
            } else {
                const errorPopup = document.getElementById("errorPopup");
                errorPopup.style.transform = "translateX(0)";
                setTimeout(() => {
                    errorPopup.style.transform = "translateX(110%)";
                }, 7000);
            }
        })
    }

    return (
        <>
        <Meta/>
        <main>
            <section id="ItemSection">
                <div id="leftFrame">
                <div id="imgFrame">
                    <div className="swiper imgSwiper2">
                        <div className="swiper-wrapper">
                            {product.photos.map((img, i) => { // display all images
                                return(
                                <div className="swiper-slide" key={i}>
                                    <img className="swiper-img" src={img.url} alt="" />
                                </div> )
                            })}
                        </div>
                    </div>

                    <div className="swiper imgSwiper">
                        <div className="swiper-wrapper">
                            {product.photos.map((img, i) => { // display all images
                            return(
                                <div className="swiper-slide" key={i}>
                                    <div className="swiper-zoom-container flexcenter">
                                        <img className="swiper-img" src={img.url} alt="" />
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>

                
                    <div className="questionContainer desktop">
                        {product.questions.length > 0 ? ( // comments
                        <>
                        <div className="QnA">Questions and Answers ({product.questions.length})</div>
                        <div id="questions">
                            {product.questions.map((question, i) => {
                                return(
                                    <div className="question" key={i} style={{maxWidth: "100%"}}>
                                        <div className="questionHeader">
                                            <span className="userName">{question.name}</span>: <span>{question.content}</span>
                                            <span className="questionDate"> {question.createdAt.substring(0, 10)}</span>
                                        </div>
                                        {question.answer.data !== null ? (
                                            <div className="questionAnswer">
                                                <span className="userName">{question.answer.data.attributes.author.data.attributes.Name} </span>
                                                <p>{question.answer.data.attributes.content}</p>
                                            </div>
                                        ) : null }
                                    </div>
                                )
                            })}
                        </div>
                        </> ) : null}
                        <div>
                            <div id="questionForm">
                                <form method="POST" action="javascript:void(0);" onSubmit={() => handleQuestion()}>
                                    <div className="QnA">Ask a question <button>Submit <FontAwesomeIcon icon={faChevronRight}/></button></div>
                                    <div className="questionFormHeader">
                                        <input type="email" name="_replyto" required placeholder="Email" maxLength={64} id="questionEmailQ"/>
                                        <input type="text" name="name" placeholder="Name" maxLength={64} id="questionNameQ"/>
                                    </div>
                                    <textarea name="content" placeholder="Question" maxLength={512} required id="questionContentQ"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="ItemParams">
                    <div id="ItemTitle"><h1>{product.title}</h1></div>
                    <div id="ItemQuantity">{product.quantity} in stock - {product.condition === "New_old_stock" ? "New old stock":"Used"}</div>
                    <div id="ItemPrice">{product.price} €</div>
                    <div className="line"></div>
                    <div id="ItemDescription" dangerouslySetInnerHTML={{__html: product.content}}></div>

                    <div id="ItemButtons">
                        <a className="aeffect" href="mailto:info@nukesnshit.com" style={{color: "var(--color-main)", fontSize: "16px"}}>info@nukesnshit.com</a>
                        <a href={`mailto:info@nukesnshit.com?subject=${product.title} Shipping Estimate&body=Hey! I'm interested in buying the ${product.title}.%0D%0A%0D%0ACountry: ${product.quantity > 1 ? "%0D%0AQuantity:":""} %0D%0A%0D%0AThanks.`}>
                            <button id="QuouteBtn">Get a quote for shipping</button>
                        </a>
                        <a href={`mailto:info@nukesnshit.com?subject=Intrest in ${product.title}&body=Hey! I'm interested in buying the ${product.title} Can you explain me the steps of buying it?.
                        `}>
                            <button id="ContactBtn">Contact Seller</button>
                        </a>
                    </div>
                </div>

                {product.questions.length > 0 ? ( // comments
                    <div className="questionContainer mobile">
                        <div className="QnA">Questions and Answers ({product.questions.length})</div>
                        <div id="questions">
                            {product.questions.map((question, i) => {
                                return(
                                    <div className="question" key={i}>
                                        <div className="questionHeader">
                                            <span className="userName">{question.name}</span>: <span>{question.content}</span>
                                            <span className="questionDate"> {question.createdAt.substring(0, 10)}</span>
                                        </div>
                                        {question.answer.data !== null ? (
                                            <div className="questionAnswer">
                                                <span className="userName">{question.answer.data.attributes.author.data.attributes.Name} </span>
                                                <p>{question.answer.data.attributes.content}</p>
                                            </div>
                                        ) : null }
                                    </div>
                                )
                            })}
                        </div>
                    </div> ) : null}
                    <div style={{width: "100%"}} className="questionContainer mobile">
                        <div id="questionForm">
                            <form method="POST" action="javascript:void(0);" onSubmit={() => handleQuestion()}>
                                <div className="QnA">Ask a question <button>Submit <FontAwesomeIcon icon={faChevronRight}/></button></div>
                                <div className="questionFormHeader">
                                    <input type="text" name="name" placeholder="Name" maxLength={64} id="questionNameQ"/>
                                    <input type="email" name="_replyto" placeholder="Email" maxLength={64} required id="questionEmailQ"/>
                                </div>
                                <textarea name="content" placeholder="Question" maxLength={512} required id="questionContentQ"/>
                            </form>
                        </div>
                    </div>
            </section>
            <div>
                <div className="Popup" id="okPopup">
                    <div><FontAwesomeIcon icon={faCheck}/></div>
                    <div>
                        <h2 className="textCenter" style={{marginTop: "var(--pad-1x)"}}>Success!</h2>
                        <p>Your question has been received and is currently under review! We will notify you as soon as an answer is available.</p>
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
        </main>
    </>)
}