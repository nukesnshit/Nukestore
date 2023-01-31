import Head from 'next/head'
import { useCallback, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFirePreset } from 'tsparticles-preset-fire';
import { particlesSettings } from '../other/particles';

import Link from 'next/link';
import NavBar from '../other/navbar';
import Footer from '../other/footer';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar
        , faHeart
        , faLayerGroup
        , faBoxOpen
        } from '@fortawesome/free-solid-svg-icons';

//animate on scroll library
import AOS from 'aos';
import 'aos/dist/aos.css';

var currentTime = 0
export function calcAosTime(index, delay = 50, reset = false){
    if(reset){currentTime = 0; return 0}
    currentTime = index * delay
    return currentTime
}

export default function Home() {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFirePreset(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    console.log(container);
  }, []);

  useEffect(() => { AOS.init() }, [])

  return (
    <>
      <main>
        <NavBar />
        <section id="Hero">
          <div id="HeroContainer">
            <div id='HeroTitle'>
              <div className="heroText">Nukes <span style={{color: "var(--color-main)"}}>n'</span> shit</div>
            </div>
            <div id='HeroNav'>
              <Link className="aeffect fixBug" href='/blog'>BLOG</Link>
              <Link className="aeffect fixBug" href='/shop'>SHOP</Link>
              <Link className="aeffect fixBug" href='/#About'>ABOUT</Link>
              <Link className="aeffect fixBug" href='/#Contact'>CONTACT</Link>
            </div>
          </div>
        <Particles id="tsparticles" options={particlesSettings} init={particlesInit} loaded={particlesLoaded} />
        </section>
        <section className='background'>
          <div className='inner'>
            <div className='container' id="About">
              <div className='fancyTitle'>
                <h5 data-aos="fade-down">NUKESNSHIT.COM</h5>
                <h2 data-aos="fade-down" id="AboutCheck">About us</h2>
              </div>
              <p className='textContent textCenter' data-aos="fade-down">
                We are committed to preserving and restoring historical artifacts through expert restoration work, acquisition and sales of antiques, and documentation of historically significant locations. Our goal is to ensure that the past is preserved for future generations and made accessible to all.
              </p>
            </div>
            <div className='container'>
              <div className='fancyTitle'>
                <h5 data-aos="fade-down">QUALITIES</h5>
                <h2 data-aos="fade-down">Why choose us</h2>
              </div>
              <div className='flexcenter' id="cardContainer">
                <div className='card' data-aos="fade-down" data-aos-delay={calcAosTime(0, 50, true)}>
                  <div className='cardIcon flexcenter'>
                    <FontAwesomeIcon icon={faLayerGroup} />
                  </div>
                  <h5>We innovate</h5>
                  <p>We are constantly exploring and experimenting with various advanced restoration methods and testing cutting-edge technologies to improve the effectiveness and efficiency of our preservation efforts.</p> 
                </div>
                <div className='card' data-aos="fade-down" data-aos-delay={calcAosTime(1)}>
                  <div className='cardIcon flexcenter'>
                    <FontAwesomeIcon icon={faBoxOpen} />
                  </div>
                  <h5>We guarantee quality</h5>
                  <p>All of our products for sale undergo a thorough inspection process to ensure they are free of defects and of the highest quality. We stand behind our products and offer a comprehensive guarantee to give our customers peace of mind in their purchase. </p> 
                </div>
                <div className='card' data-aos="fade-down" data-aos-delay={calcAosTime(2)}>
                  <div className='cardIcon flexcenter'>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <h5>We listen to you</h5>
                  <p>We value your input and actively seek out your advice and feedback to guide us in our continuous improvement efforts. Your suggestions and observations play a vital role in helping us evolve and become better in what we do.</p> 
                </div>
                <div className='card' data-aos="fade-down" data-aos-delay={calcAosTime(3)}>
                  <div className='cardIcon flexcenter'>
                    <FontAwesomeIcon icon={faHandHoldingDollar} />
                  </div>
                  <h5> We reinvest </h5>
                  <p> A significant portion of our profits are strategically reinvested back into the company to enhance the quality of our products and to optimize the performance and functionality of our website. </p> 
                </div>
              </div>
            </div>
            <div className='container flexcenter' id='Contact'>
              <div className='fancyTitle'>
                <h5 data-aos="fade-down" id="ContactCheck">CONTACT</h5>
                <h2 data-aos="fade-down">Get in touch</h2>
              </div>
              <p className="centerText" data-aos="fade-down" style={{fontSize: "var(--fz-md)"}}>My inbox is always open, whether you have a question, offer or just want to say hi, I’ll try my best to get back to you!</p>
              <div style={{margin: "var(--pad-4x) 0"}} data-aos="fade-down"><a href='mailto:info@nukesnshit.com'><button>Contact</button></a></div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
