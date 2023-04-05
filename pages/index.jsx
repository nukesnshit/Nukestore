import { useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar
        , faHeart
        , faLayerGroup
        , faBoxOpen
        } from '@fortawesome/free-solid-svg-icons';

//animate on scroll library
import AOS from 'aos';
import 'aos/dist/aos.css';

import Head from "next/head";
import Link from "next/link";

export const api = "https://nukesnshit.ignuxas.com/api";

var currentTime = 0
export function calcAosTime(index, delay = 50, reset = false){
  if(reset){currentTime = 0; return 0}
  currentTime = index * delay
  return currentTime
}

export async function getStaticProps(){
  const products = await fetch(`${api}/products?quantity=8&sort=createdAt:desc`).then(res => res.ok ? res.json(): []);
  const blogPosts = await fetch(`${api}/blog-posts?quantity=4`).then(res => res.ok ? res.json(): []);
  return {
    props: {
      products,
      blogPosts,
    },
    revalidate: 300,
  }
}

export default function Home({products, blogPosts}) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
    <Head>
      <meta name="description" content="We are committed to preserving and restoring historical artifacts through expert restoration work, acquisition and sales of antiques, and documentation of historically significant locations. Our goal is to ensure that the past is preserved for future generations and made accessible to all." />
      <meta name="keywords" content="USSR, abandoned, bunker, dosimeter, gasmask, restoration, nuclear, radioactive"/>
      <meta name="page-topic" content="Preserving the past" />
      <meta name="page-type" content="website" />
      <meta rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Nukes n' shit</title>
    </Head>
    <main>
      <section className='background'>
          <div className='inner'>
            <div className='container' id="About">
              <div className='fancyTitle'>
                <h5 data-aos="fade-up">NUKESNSHIT.COM</h5>
                <h2 data-aos="fade-up" id="AboutCheck">About us</h2>
              </div>
              <div className="flexcenter">
                <p className='textContent textCenter' data-aos="fade-up">
                  We are committed to preserving and restoring historical artifacts through expert restoration work, acquisition and sales of antiques, and documentation of historically significant locations. Our goal is to ensure that the past is preserved for future generations and made accessible to all.
                </p>
              </div>
            </div>
            <div className='container'>
              <div className='fancyTitle'>
                <h5 data-aos="fade-up">QUALITIES</h5>
                <h2 data-aos="fade-up">Why choose us?</h2>
                <p data-aos="fade-up">Why we are the best in our field</p>
              </div>
              <div className='flexcenter' id="cardContainer">
                <div className='card' data-aos="zoom-in" data-aos-delay={calcAosTime(0, 50, true)}>
                  <div className='cardIcon flexcenter'>
                    <FontAwesomeIcon icon={faLayerGroup} />
                  </div>
                  <h5>We innovate</h5>
                  <p>We are constantly exploring and experimenting with various advanced restoration methods and testing cutting-edge technologies to improve the effectiveness and efficiency of our preservation efforts.</p> 
                </div>
                <div className='card' data-aos="zoom-in" data-aos-delay={calcAosTime(1)}>
                  <div className='cardIcon flexcenter'>
                    <FontAwesomeIcon icon={faBoxOpen} />
                  </div>
                  <h5>We guarantee quality</h5>
                  <p>All of our products for sale undergo a thorough inspection process to ensure they are free of defects and of the highest quality. We stand behind our products and offer a comprehensive guarantee to give our customers peace of mind in their purchase. </p> 
                </div>
                <div className='card' data-aos="zoom-in" data-aos-delay={calcAosTime(2)}>
                  <div className='cardIcon flexcenter'>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <h5>We listen to you</h5>
                  <p>We value your input and actively seek out your advice and feedback to guide us in our continuous improvement efforts. Your suggestions and observations play a vital role in helping us evolve and become better in what we do.</p> 
                </div>
                <div className='card' data-aos="zoom-in" data-aos-delay={calcAosTime(3)}>
                  <div className='cardIcon flexcenter'>
                    <FontAwesomeIcon icon={faHandHoldingDollar} />
                  </div>
                  <h5> We reinvest </h5>
                  <p> A significant portion of our profits are strategically reinvested back into the company to enhance the quality of our products and to optimize the performance and functionality of our website. </p> 
                </div>
              </div>
            </div>
            <div className='container flexcenter' style={{flexDirection:"column"}}>
              <div className='fancyTitle'>
                <h5 data-aos="fade-up">PRODUCTS</h5>
                <h2 data-aos="fade-up">Newest products</h2>
                <p data-aos="fade-up">Recently uploaded products</p>
              </div>
              <div className="postContainer" id="itemContainer">
                  {products.length ? products.map((item, i) => {
                      const rowIndex = i > 3 ? i - 3 : i // 4 is the number of items per row
                      return (
                          <div key={i} className="itemWrapper" data-aos="zoom-in" data-aos-delay={calcAosTime(rowIndex, 50, !rowIndex)} style={{pointerEvents: "all"}}>
                              <div className="itemInner">
                                  <Link href={`/shop/${item.slug}`}>
                                      <div className="imgContainer">
                                          <div className="itemPrice">{item.price} €</div>
                                          <img src={item.coverPhoto} alt="" />
                                      </div>
                                  </Link>
                                  <div className="textContainer">
                                      <p className="dateName"><span>{item.condition === "New_old_stock" ? "New Old Stock":"Used"}</span><span className="textCenter">Quantity: {item.quantity}</span></p>
                                      <Link href={`/shop/${item.slug}`}>
                                          <h2>{item.title}</h2>
                                      </Link>
                                  </div>
                              </div>
                          </div>
                      )
                  }): <p>The website is having some issues, we are working on a fix!</p>}
              </div>
            </div>
            <div className='container flexcenter' style={{flexDirection:"column"}}>
              <div className='fancyTitle'>
                <h5 data-aos="fade-up">BLOG POSTS</h5>
                <h2 data-aos="fade-up">Latest blog posts</h2>
                <p data-aos="fade-up">Latest blog posts from some of our most experienced explorers</p>
              </div>
              <div className="postContainer">
                {blogPosts.length ? blogPosts.map((post, i) => {
                    const rowIndex = i > 3 ? i - 3 : i // 4 is the number of items per row
                    return (
                    <div key={i} className="itemWrapper" data-aos="zoom-in" data-aos-delay={calcAosTime(rowIndex, 50, !rowIndex)} style={{pointerEvents: "all"}}>
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
                  )}) : <p>The website is having some issues, we are working on a fix!</p>}
              </div>
            </div>
            <div className='container flexcenter' id='Contact'>
              <div className='fancyTitle'>
                <h5 data-aos="fade-up">CONTACT</h5>
                <h2 data-aos="fade-up">Get in touch</h2>
              </div>
              <p className="centerText" id="ContactCheck" data-aos="fade-up" style={{fontSize: "var(--fz-md)"}}>My inbox is always open, whether you have a question, offer or just want to say hi, I’ll try my best to get back to you!</p>
              <div style={{margin: "var(--pad-4x) 0"}} data-aos="fade-up"><a href='mailto:info@nukesnshit.com'><button>Contact</button></a></div>
              <a className="aeffect" href="mailto:info@nukesnshit.com" data-aos="fade-up" style={{color: "var(--color-main)", fontSize: "16px"}}>info@nukesnshit.com</a>
            </div>
          </div>
        </section>
    </main></>
  );
}