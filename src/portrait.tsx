import { RigidBody } from "@react-three/rapier";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Portraits() {
    // Load models
    const fourPortraits = useGLTF("./emotan2.glb");

    // Load the baked texture
    // Replace 'bakedTexture.jpg' with the name of your texture file
    const bakedTexture = useTexture("/textures/emotan.jpg");
    bakedTexture.flipY = false
    bakedTexture.colorSpace = THREE.SRGBColorSpace

    useEffect(() => {
        // Apply the texture to the model
        fourPortraits.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                // Assign the loaded texture to the material's map
                child.material.map = bakedTexture;
                child.material.needsUpdate = true;
            }
        });
    }, [bakedTexture, fourPortraits.scene]);

    return (
        <RigidBody type="fixed" colliders="trimesh" position={[0, 0, 0]}>
            <primitive object={fourPortraits.scene} />
        </RigidBody>
    );
}

