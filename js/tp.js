// Checks that your browser supports WebGL.

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var renderer    = null;
var scene       = null;
var camera      = null;
var cameraAngle = null;
var controls    = null;

var solarSystem = null;
var sun         = null;
var sunlight    = null;

var mercuryOrbit = null;
var mercury     = null;

var venusOrbit  = null;
var venus       = null;

var earthMoonSystem = null;
var earthOrbit  = null;
var earth       = null;

var moonSystem  = null;
var moonOrbit   = null;
var moon        = null;

var marsOrbit   = null;
var mars        = null;

var jupiterOrbit = null;
var jupiter     = null;

var saturnSystem = null;
var saturnOrbit = null;
var saturn      = null;
var saturnRing  = null;

var uranusOrbit = null;
var uranus      = null;

var neptuneOrbit = null;
var neptune     = null;

var mapUrl      = null;
var geometry    = null;
var map         = null;
var material    = null;
var curTime  = Date.now();

// This function is called whenever the document is loaded
function init() {
    // Get display canvas
    var canvas = document.getElementById("webglcanvas");
    console.log( canvas );

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas,
        antialias: true } );
    // Set the viewport size
    renderer.setSize( canvas.width, canvas.height );
    // Create a new Three.js scene
    scene = new THREE.Scene();
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height,
        1, 4000 );

    camera.position.set(0, 50, 20);
    camera.lookAt(0,0,0);


    createSolarSystem();


    scene.add(solarSystem);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 20;

    // Background
    var path = "images/MilkyWay/";
    var format = '.jpg';
    var urls = [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
    ];
    var textureCube    = new THREE.CubeTextureLoader().load( urls );
    textureCube.format = THREE.RGBFormat;
    scene.background   = textureCube;


    renderer.shadowMap.enabled = true;
    // rendu coûteux mais plus joli (default: THREE.PCFShadowMap)
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}


function createSolarSystem(){
    solarSystem = new THREE.Group();
    solarSystem.position.set(0, 0, 0);

    createSun();
    createMercury();
    createVenus();
    createEarthMoonSystem();
    createMars();
    createJupiter();
    createSaturn();
    createUranus();
    createNeptune();

    solarSystem.add( sun );
    solarSystem.add( sunlight );
    solarSystem.add( mercuryOrbit );
    solarSystem.add( venusOrbit );
    solarSystem.add( earthMoonSystem );
    solarSystem.add( marsOrbit );
    solarSystem.add( jupiterOrbit );
    solarSystem.add( saturnSystem );
    solarSystem.add( uranusOrbit );
    solarSystem.add( neptuneOrbit );

}


function createSun(){

    mapUrl = "images/2k_sun.jpg";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshPhongMaterial({ map: map });
    material.side = THREE.BackSide;

    geometry = new THREE.SphereGeometry(5, 32, 32);

    sun = new THREE.Mesh(geometry, material);
    sun.position.set(0, 0, 0);


    sunlight = new THREE.PointLight( 0xffffff, 1.5);
    sunlight.position.set(0, 0, 0);

    sunlight.castShadow = true;
    // On peut aussi paramétrer la qualité du calcul
    sunlight.shadow.mapSize.width = 512;  // default
    sunlight.shadow.mapSize.height = 512; // default
    sunlight.shadow.camera.near = 0.5;    // default
    sunlight.shadow.camera.far = 50;
}

function createMercury(){
    mercuryOrbit = new THREE.Group();
    mercuryOrbit.position.set(0, 0, 0);

    mapUrl = "images/2k_mercury.jpg";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshPhongMaterial({ map: map });
    geometry = new THREE.SphereGeometry(0.5, 32, 32);

    mercury = new THREE.Mesh(geometry, material);
    mercury.position.set(10, 0, 0);

    mercuryOrbit.add(mercury);
}

function createVenus(){
    venusOrbit = new THREE.Group();
    venusOrbit.position.set(0, 0, 0);

    mapUrl = "images/2k_venus_surface.jpg";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshPhongMaterial({ map: map });
    geometry = new THREE.SphereGeometry(1.2, 32, 32);

    venus = new THREE.Mesh(geometry, material);
    venus.position.set(20, 0, 0);

    venusOrbit.add(venus);
}

function createEarthMoonSystem(){
    earthMoonSystem = new THREE.Group();
    earthMoonSystem.position.set(0, 0, 0);


    /////////////////
    /// Earth Orbit

    earthOrbit = new THREE.Group();
    earthOrbit.position.set(30, 0, 0);


    ///////////
    /// Earth

    mapUrl = "images/earth_atmos_2048.jpg";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshPhongMaterial({ map: map });
    geometry = new THREE.SphereGeometry(1, 32, 32);

    earth = new THREE.Mesh(geometry, material);
    earth.position.set(0, 0, 0);

    earth.rotation.x = Math.PI / 5;
    earth.rotation.y = Math.PI / 5;

    earth.castShadow = true;
    earth.receiveShadow = true;

    /////////////////////////////////
    /// Moon System
    /////////////////////////////////

    moonSystem = new THREE.Group();
    moonSystem.position.set(0, 0, 0);


    /////////////////
    /// Moon Orbit

    moonOrbit = new THREE.Group();
    moonOrbit.position.set(4, 0, 0);


    ///////////
    /// Moon

    mapUrl = "images/moon_1024.jpg";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshPhongMaterial({ map: map });
    geometry = new THREE.SphereGeometry(0.7, 32, 32);

    moon = new THREE.Mesh(geometry, material);
    moon.position.set(0, 0, 0);

    moon.castShadow = true;
    moon.receiveShadow = true;

    earthMoonSystem.add( earthOrbit );

    earthOrbit.add( earth );
    earthOrbit.add( moonSystem );

    moonSystem.add( moonOrbit );

    moonOrbit.add( moon );
}


function createMars(){
    marsOrbit = new THREE.Group();
    marsOrbit.position.set(0, 0, 0);


    mapUrl = "images/2k_mars.jpg";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshPhongMaterial({ map: map });
    geometry = new THREE.SphereGeometry(0.9, 32, 32);

    mars = new THREE.Mesh(geometry, material);
    mars.position.set(40, 0, 0);

    mars.rotation.x = Math.PI / 5;
    mars.rotation.y = Math.PI / 5;

    marsOrbit.add(mars);
}

function createJupiter(){
    jupiterOrbit = new THREE.Group();
    jupiterOrbit.position.set(0, 0, 0);


    mapUrl = "images/2k_jupiter.jpg";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshPhongMaterial({ map: map });
    geometry = new THREE.SphereGeometry(2, 32, 32);

    jupiter = new THREE.Mesh(geometry, material);
    jupiter.position.set(50, 0, 0);

    jupiterOrbit.add(jupiter);
}

function createSaturn(){
    saturnSystem = new THREE.Group();
    saturnSystem.position.set(0, 0, 0);

    saturnOrbit = new THREE.Group();
    saturnOrbit.position.set(65, 0, 0);

    saturnOrbit.rotation.x = Math.PI / 10;

    ////////////
    /// Saturn

    mapUrl = "images/2k_saturn.jpg";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshPhongMaterial({ map: map });
    geometry = new THREE.SphereGeometry(1.5, 32, 32);

    saturn = new THREE.Mesh(geometry, material);
    saturn.position.set(0, 0, 0);


    /////////////////
    /// Saturn Ring

    mapUrl = "images/2k_saturn_ring_alpha.png";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshBasicMaterial({
        map:map,
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true });

    geometry = new THREE.RingBufferGeometry(3, 5, 64);

    let pos = geometry.attributes.position;
    let v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++){
        v3.fromBufferAttribute(pos, i);
        geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
    }

    saturnRing = new THREE.Mesh(geometry, material);
    saturnRing.position.set(0, 0, 0);

    saturnRing.rotation.x = Math.PI / 2;
    saturnRing.rotation.y = Math.PI;

    saturnSystem.add(saturnOrbit);
    saturnOrbit.add(saturn);
    saturnOrbit.add(saturnRing);
}

function createUranus(){
    uranusOrbit = new THREE.Group();
    uranusOrbit.position.set(0, 0, 0);


    mapUrl = "images/2k_uranus.jpg";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshPhongMaterial({ map: map });
    geometry = new THREE.SphereGeometry(1.4, 32, 32);

    uranus = new THREE.Mesh(geometry, material);
    uranus.position.set(80, 0, 0);

    uranus.rotation.x = Math.PI / 2;
    uranus.rotation.y = Math.PI / 2;

    uranusOrbit.add(uranus);
}

function createNeptune(){
    neptuneOrbit = new THREE.Group();
    neptuneOrbit.position.set(0, 0, 0);


    mapUrl = "images/2k_neptune.jpg";
    map    = new THREE.TextureLoader().load( mapUrl );
    material = new THREE.MeshPhongMaterial({ map: map });
    geometry = new THREE.SphereGeometry(1.3, 32, 32);

    neptune = new THREE.Mesh(geometry, material);
    neptune.position.set(90, 0, 0);

    neptune.rotation.x = Math.PI / 10;

    neptuneOrbit.add(neptune);
}



// This function is called regularly to update the canvas webgl.
function run() {
    // Ask to call again run
    requestAnimationFrame( run );

    // Render the scene
    render();

    // Calls the animate function if objects or camera should move
    animate();
}

// This function is called regularly to take care of the rendering.
function render() {
    // Render the scene
    renderer.render( scene, camera );
}

// This function is called regularly to update objects.
function animate() {
    // Computes how time has changed since last display
    var now       = Date.now();
    var deltaTime = now - curTime;
    curTime       = now;
    var fracTime  = deltaTime / 1000; // in seconds
    // Now we can move objects, camera, etc.
    var angle = Math.PI * 2 * fracTime;

    mercuryOrbit.rotation.y += angle / 100;
    mercury.rotation.y += angle / 20;

    venusOrbit.rotation.y += angle / 160;
    venus.rotation.y += angle / 50;

    earthMoonSystem.rotation.y += angle / 220;
    earth.rotation.y += angle / 10;
    moonSystem.rotation.y += angle / 28;
    moon.rotation.y += angle / 28;

    marsOrbit.rotation.y += angle / 280;
    mars.rotation.y += angle / 10;

    jupiterOrbit.rotation.y += angle / 340;
    jupiter.rotation.y += angle / 4;

    saturnSystem.rotation.y += angle / 400;
    saturnOrbit.rotation.y += angle / 4;

    uranusOrbit.rotation.y += angle / 460;
    uranus.rotation.y += angle / 7;

    neptuneOrbit.rotation.y += angle / 520;
    neptune.rotation.y += angle / 6;

    controls.update()
}
