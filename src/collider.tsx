import { useEffect, useState } from 'react';
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useGame } from "./Ecctrl";

export default function Collider() {
    // Load models
    const collider = useGLTF("./collider.glb");

    // State for mesh position and rotation
    const [position] = useState<[number, number, number]>([0, 0, 0]);

    /*const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    const overlayMaterial = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
            uAlpha: { value: 0 } // Initially fully transparent
        },
        vertexShader: `
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uAlpha;
            void main() {
                gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            }
        `
    });*/

    const { collisionDetected, triggerCollision, resetCollision } = useGame((state) => state);

    //const overlayMaterialRef = useRef<THREE.ShaderMaterial>(null);
    //const { scene } = useThree();
    //const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
    //scene.add(overlay)

    useEffect(() => {
        if (collisionDetected) {
            console.log("Collision detected");
            //gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 1 });

        }
    }, [collisionDetected, resetCollision]);

    return (
        <RigidBody
            type="fixed"
            colliders="trimesh"
            position={position}
            onCollisionEnter={triggerCollision}
        >
            <primitive object={collider.scene} />
        </RigidBody>
    );
}
