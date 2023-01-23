import Head from 'next/head'
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFirePreset } from 'tsparticles-preset-fire';
import { particlesSettings } from '../other/particles';

import Link from 'next/link';
import NavBar from '../other/navbar';
import Footer from '../other/footer';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRadiation } from '@fortawesome/free-solid-svg-icons';

var currentTime = 0
export function calcAosTime(index, delay = 50, reset = false){
    if(reset){currentTime = 0; return 0}
    currentTime += index * delay
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
    await console.log(container);
  }, []);

  return (
    <>
      <Head>
        <title>Nukes n' shit</title>
        <meta name="description" content="A place where you can buy collectable war items and other cool stuff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <section id="Hero">
          <div id="HeroContainer">
            <div id='HeroTitle'>
              <div className="heroText">Nukes <span style={{color: "var(--color-main)"}}>n'</span> shit</div>
            </div>
            <div id='HeroNav'>
              <Link className="aeffect fixBug" href='blog'>BLOG</Link>
              <Link className="aeffect fixBug" href='shop'>SHOP</Link>
              <Link className="aeffect fixBug" href='blog'>CONTACT</Link>
              <Link className="aeffect fixBug" href='#About'>ABOUT</Link>
            </div>
          </div>
        <Particles id="tsparticles" options={particlesSettings} init={particlesInit} loaded={particlesLoaded} />
        </section>
        <section className='background'>
          <div className='inner'>
            <div className='container'>
              <div className='fancyTitle'>
                <h5>NUKESNSHIT.COM</h5>
                <h2>About us</h2>
              </div>
              <p className='textContent textCenter'>
                We are a heritage preservation company, dedicated to the preservation and restoration of historical artifacts. Our services include expert restoration work, the buying and selling of antiques, and visiting and documenting historically significant locations. We strive to preserve the past for future generations and make it accessible to all.
              </p>
            </div>
            <div className='container'>
              <div className='fancyTitle'>
                <h5>QUALITIES</h5>
                <h2>Why choose us</h2>
              </div>
              <div className='flexcenter'>
                <div className='card'>
                  <div className='cardIcon'>
                    <FontAwesomeIcon icon={faRadiation} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
