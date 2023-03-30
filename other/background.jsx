import { use, useEffect } from "react";
import * as THREE from "three";
import { useRouter } from "next/router";

var playing = false;

export default function ThreeBackground() {
    const router = useRouter();

    useEffect(() => {
        if( router.pathname == "/" ){ playing = true }
        var mobile = window.innerWidth < 800 ? true : false;

        const lightColor = 0x232323
        const buildingCount = mobile ? 30 : 90; // Mobile : Desktop
        const buildingSpread = mobile ? 4 : 6; // Mobile : Desktop

        /* ----------------------
                Three.js setup
        ------------------------ */
        //if( window.innerWidth > 800 ){ // only run on desktop devices
            const canvas = document.querySelector("#ThreeJsCanvas");
            
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                canvas: canvas,
                alpha: true,
            });
            renderer.setSize(window.innerWidth, window.innerHeight);

            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.shadowMap.needsUpdate = true;

            //renderer.toneMapping = THREE.ReinhardToneMapping;
            //console.log(window.innerWidth);

            window.addEventListener('resize', onWindowResize, false);
            function onWindowResize() {
            if(!mobile){
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            }
            };

            // show stats
            var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 500 );

            camera.position.set(0, 2.2, 14);
            
            var scene = new THREE.Scene();
            var city = new THREE.Object3D();
            var smoke = new THREE.Object3D();
            var town = new THREE.Object3D();
            
            var createCarPos = true;
            
            //- FOG background ---------
            
            const bgColor = 0x1c1c1c;
            
            scene.background = new THREE.Color(bgColor);
            scene.fog = new THREE.Fog(bgColor, 10, 16);
            //-- RANDOM Function
            function mathRandom(num = 8) {
            var numValue = - Math.random() * num + Math.random() * num;
            return numValue;
            };
            
            /* ----------------------
                Create city
            ------------------------ */
            function init() {
            var segments = 1;

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

                cube.position.x = Math.round(mathRandom(buildingSpread));
                cube.position.z = Math.round(mathRandom(buildingSpread));

                //floor.position.set(cube.position.x, 0/*floor.scale.y / 2*/, cube.position.z)
                
                //town.add(floor);
                town.add(cube);
            };
            /* ----------------------
                    Particles
            ------------------------ */
            
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
            /* ----------------------
                    Lights
            ------------------------ */
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
            /*
            
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
            */
            
            /* ----------------------
                    Animate
            ------------------------ */
            
            var animate = function() {
            requestAnimationFrame(animate);

            if(playing) {
                // camera rotation
                var cityRotation = 12 + Math.cos(Date.now() / 6000) * 20;

                city.rotation.x = cityRotation * Math.PI / 360;
                city.rotation.y = city.rotation.y - 0.0005;
                
                // particle rotation
                smoke.rotation.y += 0.003;
                smoke.rotation.x += 0.003;
                
                camera.lookAt(city.position);
                renderer.render( scene, camera ); 
            }}
            
            // START functions --------
            //generateLines();
            init();
            animate();
    }, [])

    useEffect(() => {
        console.log(router.asPath, router.asPath === "/")
        const path = router.asPath
        if(path === "/" || path === "/#About" || path === "/#Contact") {
            document.getElementById("ThreeBackground").style.display = "block"
            playing = true
        } else {
            document.getElementById("ThreeBackground").style.display = "none"
            playing = false

        }
    }, [router.asPath])

    return (
        <div id="ThreeBackground">
            <div id="ThreeJsContainer">
            <canvas id="ThreeJsCanvas"></canvas>
            </div>
            <div id="Nukesnshit">
            <h1><strong>Nukes <span style={{color: "var(--color-main)"}}>n'</span> shit</strong></h1>
            <p>- Preserving the past -</p>
            </div>
        </div>
    )
}

