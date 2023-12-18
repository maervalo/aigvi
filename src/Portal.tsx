import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import portalVertexShader from "./shaders/vertex.glsl";
import portalFragmentShader from "./shaders/fragment.glsl";

export default function Portal() {
    const portal = useGLTF("./portal5.glb");

    // Create shader material for the portal
    const portalLightMaterial = useRef(new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColorStart: { value: new THREE.Color(0xeeeeee) },
            uColorEnd: { value: new THREE.Color(0xffffff) },
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