import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
/**
 * Loaders
 * Initialize loading bar element and loading manager to handle asset loading events.
 */
//const loadingBarElement = document.querySelector('.loading-bar')
/*const loadingManager = new THREE.LoadingManager(
    // Function to execute when all assets are loaded
    () => {
        // Wait a little
        window.setTimeout(() => {
            // Animate the fade-out of the overlay once all assets are loaded
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            // Update the loading bar's appearance to indicate loading completion
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)
    },

    // Function to execute during loading progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        // Calculate loading progress and update the loading bar's scale accordingly
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)

/**
 * Overlay
 * Create a shader material and a plane geometry that will be used as an overlay.
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 } // The alpha (opacity) uniform, initially set to fully opaque
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})

// Create a mesh using the overlay geometry and material, then add it to the scene
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

// Scene (line 65 need definition of scene)
const scene = new THREE.Scene()