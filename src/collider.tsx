import { RigidBody } from "@react-three/rapier";
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
}


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