import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(-90, 100, 100)
controls.update()

// axes helper
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// ambient light
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

// point light
const pointLight = new THREE.PointLight(0xff0000, 1500, 300)
scene.add(pointLight)

// star texture background
const cubeTextureLoader = new THREE.CubeTextureLoader();
const starTexture = cubeTextureLoader.load([
    'Cropped_Image.png',
    'Cropped_Image.png',
    'Cropped_Image.png',
    'Cropped_Image.png',
    'Cropped_Image.png',
    'Cropped_Image.png',
])

scene.background = starTexture

// texture loader
const textureLoader = new THREE.TextureLoader()

// sun
const sunTexture = textureLoader.load('sun.jpg')
sunTexture.colorSpace = THREE.SRGBColorSpace
const sunGeo = new THREE.SphereGeometry(16, 30, 30)
const sunMat = new THREE.MeshBasicMaterial({ map: sunTexture })
const sunMesh = new THREE.Mesh(sunGeo, sunMat)
scene.add(sunMesh)

// mercury
const mercuryTexture = textureLoader.load('mercury.jpg')
mercuryTexture.colorSpace = THREE.SRGBColorSpace
const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30)
const mercuryMat = new THREE.MeshStandardMaterial({ map: mercuryTexture })
const mercuryMesh = new THREE.Mesh(mercuryGeo, mercuryMat)
mercuryMesh.position.x = 28
sunMesh.add(mercuryMesh)


function animate(time) {
    sunMesh.rotateY(0.004)
    mercuryMesh.rotateY(0.008)
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
window.addEventListener('resize', (e) => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})