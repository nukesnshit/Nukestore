import { useEffect } from "react";
import * as THREE from "three";

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

export default function home() {
  useEffect(() => {
    const canvas = document.querySelector("#ThreeJsCanvas");

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas,
        alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerWidth > 800) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.shadowMap.needsUpdate = true;
      //renderer.toneMapping = THREE.ReinhardToneMapping;
      //console.log(window.innerWidth);
    };
    //---
    
    document.body.prepend( renderer.domElement );
    
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    };
    
    var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 500 );
    
    camera.position.set(0, 2.2, 14);
    
    var scene = new THREE.Scene();
    var city = new THREE.Object3D();
    var smoke = new THREE.Object3D();
    var town = new THREE.Object3D();
    
    var createCarPos = true;
    var uSpeed = 0.001;
    
    //----------------------------------------------------------------- FOG background
    
    const bgColor = 0x1c1c1c;
    //var setcolor = 0xF2F111;
    //var setcolor = 0xFF6347;
    
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.Fog(bgColor, 10, 16);
    //scene.fog = new THREE.FogExp2(bgColor, 0.05);
    //-- RANDOM Function
    function mathRandom(num = 8) {
      var numValue = - Math.random() * num + Math.random() * num;
      return numValue;
    };
    
    //-- CREATE City
    
    function init() {
      var segments = 1;
      const buildingCount = 90;

      for (var i = 1; i<buildingCount; i++) {
        const cubeWidth = .6 + Math.random() * 0.1;
        const cubeHeight = 0.5 + Math.abs(mathRandom(5));
        var geometry = new THREE.BoxGeometry(cubeWidth,cubeHeight,cubeWidth,segments,segments,segments);
        
        var material = new THREE.MeshStandardMaterial({
          color:0x000000,
          side:THREE.DoubleSide});
        var wmaterial = new THREE.MeshLambertMaterial({
          color:0x1c1c1c,
          wireframe:true,
          transparent:true,
          opacity: 0.1,
          side:THREE.DoubleSide,
        });
    
        var cube = new THREE.Mesh(geometry, material);
        // var wire = new THREE.Mesh(geometry, wmaterial);
        //var floor = new THREE.Mesh(geometry, material);
        var wfloor = new THREE.Mesh(geometry, wmaterial);
        
        cube.add(wfloor);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.rotationValue = 0.1+Math.abs(mathRandom(8));
        
        //floor.scale.y = 0.05;//+mathRandom(0.5);

        cube.position.x = Math.round(mathRandom(6));
        cube.position.z = Math.round(mathRandom(6));

        //floor.position.set(cube.position.x, 0/*floor.scale.y / 2*/, cube.position.z)
        
        //town.add(floor);
        town.add(cube);
      };
      //---- Particles ----
      
      var gmaterial = new THREE.MeshToonMaterial({color:0xFF0000, side:THREE.DoubleSide});
      var gparticular = new THREE.CircleGeometry(0.01, 3);
      var aparticular = 5;
      
      for (var h = 1; h<250; h++) {
        var particular = new THREE.Mesh(gparticular, gmaterial);
        particular.position.set(mathRandom(aparticular), mathRandom(aparticular),mathRandom(aparticular));
        particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
        smoke.add(particular);
      };
      
      var pmaterial = new THREE.MeshPhongMaterial({
        color:0x000000,
        side:THREE.DoubleSide,
        opacity:0.9,
        transparent:true});
      var pgeometry = new THREE.PlaneGeometry(60,60);
      var pelement = new THREE.Mesh(pgeometry, pmaterial);
      pelement.rotation.x = -90 * Math.PI / 180;
      pelement.position.y = -0.001;
      pelement.receiveShadow = true;
      //pelement.material.emissive.setHex(0xFFFFFF + Math.random() * 100000);
    
      city.add(pelement);
    };
    
    //--------------------- MOUSE function
    /*
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(), INTERSECTED;
    var intersected;
    
    function onMouseMove(event) {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    function onDocumentTouchStart( event ) {
      if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouse.x = event.touches[ 0 ].pageX -  window.innerWidth / 2;
        mouse.y = event.touches[ 0 ].pageY - window.innerHeight / 2;
      };
    };
    function onDocumentTouchMove( event ) {
      if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouse.x = event.touches[ 0 ].pageX -  window.innerWidth / 2;
        mouse.y = event.touches[ 0 ].pageY - window.innerHeight / 2;
      }
    }
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('touchstart', onDocumentTouchStart, false );
    window.addEventListener('touchmove', onDocumentTouchMove, false );
    */
    // Lights -------
    const lightColor = 0x232323
    const mouseLightColor = 0xffffff
    //const lightColor = 0xffffff

    var ambientLight = new THREE.AmbientLight(lightColor, 4);
    var lightFront = new THREE.SpotLight(lightColor, 20, 10);
    //var mouseLight = new THREE.SpotLight(mouseLightColor, 10, 2);
    var lightBack = new THREE.PointLight(lightColor, 0.5);
    
    /*
    var spotLightHelper = new THREE.SpotLightHelper( mouseLight );
    scene.add( spotLightHelper );

    mouseLight.rotation.x = 0;
    mouseLight.rotation.z = 0;
    mouseLight.position.set(5, 2, 5);
    */

    lightFront.rotation.x = 45 * Math.PI / 180;
    lightFront.rotation.z = -45 * Math.PI / 180;
    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;
    lightFront.shadow.mapSize.width = 6000;
    lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
    lightFront.penumbra = 0.1;
    lightBack.position.set(0,6,0);
    
    smoke.position.y = 2;
    
    scene.add(ambientLight);
    city.add(lightFront);
    scene.add(lightBack);
    //scene.add(mouseLight);
    scene.add(city);
    city.add(smoke);
    city.add(town);
    
    // GRID Helper -----------
    var gridHelper = new THREE.GridHelper( 60, 120, 0xffce10, 0x000000);
    city.add( gridHelper );
    
    // LINES world ------------
    
    var createCars = function(cScale = 2, cPos = 20, cColor = 0xFF0000) {
      var cMat = new THREE.MeshToonMaterial({color:cColor, side:THREE.DoubleSide});
      var cGeo = new THREE.BoxGeometry(1, cScale/40, cScale/40);
      var cElem = new THREE.Mesh(cGeo, cMat);
      var cAmp = 3;
      
      if (createCarPos) {
        createCarPos = false;
        cElem.position.x = -cPos;
        cElem.position.z = (mathRandom(cAmp));
    
        //TweenMax.to(cElem.position, 3, {x:cPos, repeat:-1, yoyo:true, delay:mathRandom(3)});
      } else {
        createCarPos = true;
        cElem.position.x = (mathRandom(cAmp));
        cElem.position.z = -cPos;
        cElem.rotation.y = 90 * Math.PI / 180;
      
        //TweenMax.to(cElem.position, 5, {z:cPos, repeat:-1, yoyo:true, delay:mathRandom(3), ease:Power1.easeInOut});
      };
      cElem.receiveShadow = true;
      cElem.castShadow = true;
      cElem.position.y = Math.abs(mathRandom(5));
      city.add(cElem);
    };
    
    var generateLines = function() {
      for (var i = 0; i<2; i++) {
        createCars(0.1, 20);
      };
    };
    
    // ANIMATE --------------
    
    var animate = function() {
      requestAnimationFrame(animate);

      // camera rotation
      var cityRotation = 12 + Math.cos(Date.now() / 6000) * 20;

      city.rotation.x = cityRotation * Math.PI / 360;
      city.rotation.y = city.rotation.y - 0.0005;
      
      // particle rotation
      smoke.rotation.y += 0.003;
      smoke.rotation.x += 0.003;
      
      camera.lookAt(city.position);
      renderer.render( scene, camera );  
    }
    
    // START functions --------
    generateLines();
    init();
    animate();

    //AOS
    AOS.init()
    }, []);
    
  return (
    <main>
      <div>
        <div id="ThreeJsContainer">
          <canvas id="ThreeJsCanvas"></canvas>
        </div>
        <div id="Nukesnshit">
          <h1><strong>Nukes <span style={{color: "var(--color-main)"}}>n'</span> shit</strong></h1>
          <p>- Preserving the past -</p>
        </div>
      </div>
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
                <h5 data-aos="fade-down">CONTACT</h5>
                <h2 data-aos="fade-down">Get in touch</h2>
              </div>
              <p className="centerText" id="ContactCheck" data-aos="fade-down" style={{fontSize: "var(--fz-md)"}}>My inbox is always open, whether you have a question, offer or just want to say hi, I’ll try my best to get back to you!</p>
              <div style={{margin: "var(--pad-4x) 0"}} data-aos="fade-down"><a href='mailto:info@nukesnshit.com'><button>Contact</button></a></div>
              <a className="aeffect" href="mailto:info@nukesnshit.com" data-aos="fade-down" style={{color: "var(--color-main)", fontSize: "16px"}}>info@nukesnshit.com</a>
            </div>
          </div>
        </section>
    </main>
  );
}