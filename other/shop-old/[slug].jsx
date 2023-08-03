/*import { GraphQLClient, gql } from "graphql-request"

//swiper
import Swiper, { Navigation, Thumbs, Zoom, Mousewheel } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import { useEffect } from "react";

import Meta from "../../other/meta";

const gqlQuery = gql`
    query Product($slug: String!) {
        product(where: {slug: $slug}) {
            title
            price
            quantity
            condition
            coverPhoto {url}
            otherPhotos {url}
            content {html, markdown}
            categories
            slug
        }
    }
`;

const slugList = gql`
    {
        products {
            slug
        }
    }
`;

export async function getStaticPaths() {
    const { products } = await graphcms.request(slugList)
    return {
        paths: products.map(product => ({ params: { slug: product.slug } })),
        fallback: "blocking",
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug
    const data = await graphcms.request(gqlQuery, {slug})
    const product = data.product
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
        keywords: `${product.title}, ${product.categories.toString()}`,
        description: `${product.content.markdown}`,
        topic: product.title,
        type: "shop"
    }    

    const images = [product.coverPhoto.url, ...product.otherPhotos.map(photo => photo.url)]

    useEffect(() => {
        /*--------------------
        SWIPER
        -------------------*//*

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

    return (
        <>
        <Meta/>
        <main>
            <section id="ItemSection">
                <div id="imgFrame">
                    <div className="swiper imgSwiper2">
                        <div className="swiper-wrapper">
                            {images.map((img, i) => { // display all images
                                return(
                                <div className="swiper-slide" key={i}>
                                    <img className="swiper-img" src={img} alt="" />
                                </div> )
                            })}
                        </div>
                    </div>

                    <div className="swiper imgSwiper">
                        <div className="swiper-wrapper">
                            {images.map((img, i) => { // display all images
                            return(
                                <div className="swiper-slide" key={i}>
                                    <div className="swiper-zoom-container flexcenter">
                                        <img className="swiper-img" src={img} alt="" />
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>
                <div id="ItemParams" style={{minWidth: "32%"}}>
                    <div id="ItemTitle"><h1>{product.title}</h1></div>
                    <div id="ItemQuantity">{product.quantity} in stock - {product.condition === "newOldStock" ? "New old stock":"Used"}</div>
                    <div id="ItemPrice">{product.price} €</div>
                    <div className="line"></div>
                    <div id="ItemDescription" dangerouslySetInnerHTML={{__html: product.content.html}}></div>
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
            </section>
        </main>
    </>)
}*/