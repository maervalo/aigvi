import { RigidBody } from "@react-three/rapier";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

export default function RightSaintMaurice() {
    // Load models
    const portrait = useGLTF("./RightSaintMaurice.glb");

    // Load the baked texture
    const bakedTexture = useTexture("/textures/rightSaintMaurice.jpeg");
    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;

    // State for mesh position and rotation
    const [position, setPosition] = useState<[number, number, number]>([0, -0.9, 0]);

    useEffect(() => {
        // Apply the texture to the model
        portrait.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                child.material.map = bakedTexture;
                child.material.needsUpdate = true;
            }
        });
    }, [bakedTexture, portrait.scene]);

    return (
        <RigidBody type="fixed" colliders="trimesh" position={position}>
            <primitive object={portrait.scene} />
        </RigidBody>
    );
}