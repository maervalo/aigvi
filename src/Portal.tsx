import { RigidBody } from "@react-three/rapier";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { useControls } from "leva";

export default function Portal() {
    // Load models
    const portal = useGLTF("./Portal.glb");

    // Load the baked texture
    //const bakedTexture = useTexture("/textures/blackwalls.jpg");
    const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

    // State for mesh position and rotation
    const [position, setPosition] = useState<[number, number, number]>([0, -0.9, 0]);

    // Leva control for position
    const positionControls = useControls('Portal', {
        x: { value: position[0], min: -50, max: 50, step: 0.1 },
        y: { value: position[1], min: -50, max: 50, step: 0.1 },
        z: { value: position[2], min: -50, max: 50, step: 0.1 },
    });

    // Update position and rotation state when controls change
    useEffect(() => {
        setPosition([positionControls.x, positionControls.y, positionControls.z]);
    }, [positionControls]);

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
}