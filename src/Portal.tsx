import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import portalVertexShader from "./shaders/vertex.glsl";
import portalFragmentShader from "./shaders/fragment.glsl";

export default function Portal() {
    const portal = useGLTF("./Portal.glb");

    // Create shader material for the portal
    const portalLightMaterial = useRef(new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColorStart: { value: new THREE.Color(0xff0000) },
            uColorEnd: { value: new THREE.Color(0x0000ff) },
        },
        vertexShader: portalVertexShader,
        fragmentShader: portalFragmentShader,
        side: THREE.BackSide,
    })).current;

    // State for mesh position
    const [position,] = useState<[number, number, number]>([0, -0.9, 0]);


    // Animate the shader
    useFrame(({ clock, camera }) => {
        const elapsedTime = clock.getElapsedTime();
        portalLightMaterial.uniforms.uTime.value = elapsedTime;

        // Update camera's projection matrix if necessary
        camera.updateProjectionMatrix();
    });

    useEffect(() => {
        // Apply the shader material to the portal model
        portal.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                child.material = portalLightMaterial;
            }
        });
    }, [portal.scene]);

    return (
        <primitive object={portal.scene} position={position} />
    );
}

/*import { useEffect, useState } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import portalVertexShader from './vertex.glsl'
import portalFragmentShader from './fragment.glsl'

export default function Portal() {

    const debugObject = {}
    // Load models
    const portal = useGLTF("./Portal.glb");

    // Load the baked texture
    //const bakedTexture = useTexture("/textures/blackwalls.jpg");

    const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

    // State for mesh position and rotation
    const [position] = useState<[number, number, number]>([0, -0.9, 0]);

    useEffect(() => {
        // Apply the texture to the model
        portal.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                //child.material.map = bakedTexture;
                child.material = portalLightMaterial;
                child.material.side = THREE.BackSide;
                child.material.needsUpdate = true;
            }
        });
    }, [portalLightMaterial, portal.scene]);

    return (
        <primitive object={portal.scene} position={position} />
    );
}*/