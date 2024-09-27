import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { texture, textureLoad } from 'three/webgpu'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(-90, 140, 140)
controls.update()

// axes helper
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

// point light
const pointLight = new THREE.PointLight(0xffffff, 1, 300)
scene.add(pointLight)

// star texture background
const cubeTextureLoader = new THREE.CubeTextureLoader();
const starTexture = cubeTextureLoader.load([
    'squareMilk.png',
    'squareMilk.png',
    'squareMilk.png',
    'squareMilk.png',
    'squareMilk.png',
    'squareMilk.png',
])

scene.background = starTexture

// texture loader
const textureLoader = new THREE.TextureLoader()

// create planets
function createPlanet(radius, texture, distance, ring) {
    const planetGeo = new THREE.SphereGeometry(radius, 30, 30)
    const planetMat = new THREE.MeshStandardMaterial({ map: textureLoader.load(texture) })
    const planet = new THREE.Mesh(planetGeo, planetMat)
    planet.position.x = distance

    const planetObj = new THREE.Object3D()
    planetObj.add(planet)

    if (ring) {
        const ringTexture = textureLoader.load(ring.texture)
        ringTexture.colorSpace = THREE.SRGBColorSpace
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32)
        const ringMat = new THREE.MeshPhongMaterial({ map: ringTexture, side: THREE.DoubleSide })
        const ringMesh = new THREE.Mesh(ringGeo, ringMat)
        ringMesh.position.x = distance
        ringMesh.rotation.x = -0.5 * Math.PI
        planetObj.add(ringMesh)
    }

    scene.add(planetObj)

    return { planet, planetObj }
}


// sun
const sunTexture = textureLoader.load('sun.jpg')
sunTexture.colorSpace = THREE.SRGBColorSpace
const sunGeo = new THREE.SphereGeometry(16, 30, 30)
const sunMat = new THREE.MeshBasicMaterial({ map: sunTexture })
const sunMesh = new THREE.Mesh(sunGeo, sunMat)
scene.add(sunMesh)

// mercury
const mercury = createPlanet(3.2, 'mercurymap.jpg', 28)

// venus
const venus = createPlanet(5.8, 'venusmap.jpg', 44)

// earth
const earth = createPlanet(6, 'earthmap1k.jpg', 62)

// mars
const mars = createPlanet(4, 'mars_1k_color.jpg', 78)

// jupiter
const jupiter = createPlanet(12, 'jupitermap.jpg', 100)

// saturn
const saturn = createPlanet(10, 'saturnmap.jpg', 138, { innerRadius: 10, outerRadius: 20, texture: 'saturnringcolor.jpg' })

// uranus
const uranus = createPlanet(7, 'uranus.jpg', 176, { innerRadius: 7, outerRadius: 12, texture: 'uranusringcolour.jpg' })

// neptune
const neptune = createPlanet(7, 'neptunemap.jpg', 200)

// pluto
const pluto = createPlanet(2.8, 'plutomap1k.jpg', 216)


function animate(time) {
    sunMesh.rotateY(0.004)

    mercury.planet.rotateY(0.004)
    mercury.planetObj.rotateY(0.04)

    venus.planet.rotateY(0.002)
    venus.planetObj.rotateY(0.015)

    earth.planet.rotateY(0.02)
    earth.planetObj.rotateY(0.01)

    mars.planet.rotateY(0.018)
    mars.planetObj.rotateY(0.008)

    jupiter.planet.rotateY(0.04)
    jupiter.planetObj.rotateY(0.002)

    saturn.planet.rotateY(0.038)
    saturn.planetObj.rotateY(0.0009)

    uranus.planet.rotateY(0.03)
    uranus.planetObj.rotateY(0.0004)

    neptune.planet.rotateY(0.032)
    neptune.planet.rotateY(0.0001)

    pluto.planet.rotateY(0.008)
    pluto.planet.rotateY(0.00007)

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
window.addEventListener('resize', (e) => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})