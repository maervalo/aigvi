import { RigidBody } from "@react-three/rapier";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { useControls } from "leva";

export default function Emotan() {
    // Load models
    const emotan = useGLTF("./emotan2.glb");

    // Load the baked texture
    const bakedTexture = useTexture("/textures/emotan.jpg");
    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;

    // State for mesh position and rotation
    const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
    const [rotationY, setRotationY] = useState(0);

    // Leva control for position
    const positionControls = useControls('Mesh Position Emotan', {
        x: { value: position[0], min: -50, max: 50, step: 0.1 },
        y: { value: position[1], min: -50, max: 50, step: 0.1 },
        z: { value: position[2], min: -50, max: 50, step: 0.1 },
    });

    // Leva control for rotation
    const rotationControl = useControls('Mesh Rotation Emotan', {
        rotationY: { value: rotationY, min: -Math.PI, max: Math.PI, step: 0.01 },
    });

    // Update position and rotation state when controls change
    useEffect(() => {
        setPosition([positionControls.x, positionControls.y, positionControls.z]);
        setRotationY(rotationControl.rotationY);
    }, [positionControls, rotationControl]);

    useEffect(() => {
        // Apply the texture to the model
        emotan.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                child.material.map = bakedTexture;
                child.material.needsUpdate = true;
            }
        });
    }, [bakedTexture, emotan.scene]);

    return (
        <RigidBody type="fixed" colliders="trimesh" position={position}>
            <primitive object={emotan.scene} rotation={[0, rotationY, 0]} />
        </RigidBody>
    );
}