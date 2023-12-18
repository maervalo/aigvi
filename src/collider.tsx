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


/*import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useState } from "react";
import { useGame } from "./Ecctrl";
import { useEffect } from "react";
import { useFollowCam } from "./Ecctrl";

export default function Collider() {
    // Load models
    const collider = useGLTF("./collider.glb");

    // State for mesh position and rotation
    const [position] = useState<[number, number, number]>([0, 0, 0]);

    const triggerCollision = useGame((state) => state.triggerCollision);

    const { collisionDetected, resetCollision } = useGame((state) => state);

    useEffect(() => {
        if (collisionDetected) {
            console.log("Collision detected");
            // Additional logic for handling collision...
            // Reset the collision state if necessary
            resetCollision();
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
        </RigidBody >

    );
}

/*import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useState } from "react";

export default function Collider() {
// Load models
const collider = useGLTF("./collider.glb");

// State for mesh position and rotation
const [position] = useState<[number, number, number]>([0, 0, 0]);

return (
    <RigidBody
        type="fixed"
        colliders="trimesh"
        position={position}
        onCollisionEnter={() => console.log('Collision detected')}
    >
        <primitive object={collider.scene} />
    </RigidBody>
);
}*/


/* 
import { useEffect, useState } from "react";
import { useControls } from "leva";
// Leva control for position
    const positionControls = useControls('Mesh Position Emotan', {
        x: { value: position[0], min: -50, max: 50, step: 0.1 },
        y: { value: position[1], min: -50, max: 50, step: 0.1 },
        z: { value: position[2], min: -50, max: 50, step: 0.1 },
    });


    // Update position and rotation state when controls change
    useEffect(() => {
        setPosition([positionControls.x, positionControls.y, positionControls.z]);
    }, [positionControls]);*/