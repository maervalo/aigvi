import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

// LoadingPage.js
export default function PageLoader() {
    return (
        <div className="loading-page">
            {/* Your loading page content here */}
            <p>Loading...</p>
        </div>
    );
}