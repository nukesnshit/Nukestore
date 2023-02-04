import NavBar from "../../other/navbar"
import { GraphQLClient, gql } from "graphql-request"

//swiper
import Swiper, { Navigation, Thumbs, Zoom } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import { useEffect } from "react";

import Meta from "../../other/meta";

const graphcms = new GraphQLClient(
    "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/cld4h09aa002801td1oul5cku/master"
);

const gqlQuery = gql`
    query Product($slug: String!) {
        product(where: {slug: $slug}) {
            title
            price
            quantity
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
        revalidate: 60,
    }
}

var mainSwiper = null;
var thumbSwiper = null;

function sizeCheck(){
    var w = window.innerWidth;
    if(w <= 1040){
        thumbSwiper.changeDirection('horizontal')
        mainSwiper.changeDirection('horizontal')
    } else {
        thumbSwiper.changeDirection('vertical')
        mainSwiper.changeDirection('vertical')
    };
}

export default function ProductPage({product}) {
    Meta.defaultProps = {
        title: "Nukes n' shit | Store",
        keywords: [product.title, ...product.categories],
        description: product.markdown,
    }    

    const images = [product.coverPhoto.url, ...product.otherPhotos.map(photo => photo.url)]

    useEffect(() => {
        window.addEventListener('resize', function(event){sizeCheck()});
        
        /*--------------------
        SWIPER
        -------------------*/

        Swiper.use([Navigation, Thumbs, Zoom]); // initialize swiper

        var swiperThumb = new Swiper(".imgSwiper2", {
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerView: 'auto',
        freeMode: true,
        });

        const swiper = new Swiper('.imgSwiper', {
        // Optional parameters
        direction: 'vertical',
        mousewheel: true,
        keyboardControl: true,

        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },

        thumbs: {
            swiper: swiperThumb,
        },
        });

        mainSwiper = swiper;
        thumbSwiper = swiperThumb;
        
        sizeCheck(); 
    }, []);

    return (
        <>
        <Meta/>
        <main>
            <NavBar />
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
                                    <img className="swiper-img" src={img} alt="" />
                                </div>
                            )})}
                        </div>
                    </div>
                </div>
                <div id="ItemParams">
                    <div id="ItemTitle"><h1>{product.title}</h1></div>
                    <div id="ItemQuantity">{product.quantity} in stock</div>
                    <div id="ItemPrice">{product.price} €</div>
                    <div className="line"></div>
                    <div id="ItemDescription" dangerouslySetInnerHTML={{__html: product.content.html}}></div>
                    <div id="ItemButtons">
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
}