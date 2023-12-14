import { KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import Ecctrl from "../src/Ecctrl";
import Floor from "./Floor";
import Lights from "./Lights";
import { useControls } from "leva";
import CharacterModel from "./CharacterModel";
import Emotan from "../src/EmotanPortrait";
import PortalMasks from "../src/PortalMasks";
import Walls from "../src/Walls";
import Portal from "../src/Portal";
import Collider from "../src/collider";
import RightEyes from "../src/Eyes";
//import { useState } from "react";
//import PageLoader from "../src/PageLoader";

export default function Experience() {

  //const [isLoading, setIsLoading] = useState(false);
  // Handler for collision events
  //const handleCollision = () => {
  //setIsLoading(true);

  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
  ];

  return (
    <>
      {/* Conditionally render the PageLoader 
        {isLoading && <PageLoader />}*/}
      <Perf position="top-left" minimal />
      {/* Collider with the collision handler 
        <Collider onCollision={handleCollision} />*/}
      <Lights />

      <Physics debug={physics} timeStep="vary">
        {/* Keyboard preset */}
        <KeyboardControls map={keyboardMap}>
          {/* Character Control */}
          <Ecctrl
            debug
            animated
            followLight
            springK={2}
            dampingC={0.2}
            autoBalanceSpringK={1.2}
            autoBalanceDampingC={0.04}
          >
            {/* Replace your model here */}
            <CharacterModel />
          </Ecctrl>
        </KeyboardControls>

        {/* Portraits */}
        <Emotan />
        <PortalMasks />
        <Walls />
        <Portal />
        <Collider />
        <RightEyes />

        {/* Floor */}
        <Floor />

      </Physics >
    </>
  );
}
