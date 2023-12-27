import { KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import Ecctrl from "../src/Ecctrl";
import Floor from "./Floor";
import Lights from "./Lights";
import { useControls } from "leva";
import CharacterModel from "./CharacterModel";
import PortalMasks from "../src/PortalMasks";
import Walls from "../src/Walls";
import Portal from "../src/Portal";
import Collider from "../src/collider";
import PyramidFront from "../src/portraits/PyramidFront";
import RightSaintMaurice from "../src/portraits/rightSaintMaurice";
import RightKubaMasquerade from "../src/portraits/rightKubaMasquerade";
import RightNubienKermaSudan from "../src/portraits/rightNubienKermaSudan";
import RightKimpaVita from "../src/portraits/rightKimpaVita";
import RightBeninBronzes from "../src/portraits/rightBeninBronzes";
import RightSaidOfMogadishu from "../src/portraits/rightSaidOfMogadishu";
import RightDonFransciscoDeArobe from "../src/portraits/rightDonFransiscoDeAdobe";
import BackGriots from "../src/portraits/backGriots";
import BackQueenNzinga from "../src/portraits/backQueenNzinga";
import BackMinoMothers from "../src/portraits/backMinoMothers";
import BackQueenNzinga2 from "../src/portraits/backQueenNzinga2";
import BackHaiti from "../src/portraits/backHaiti";
import MiddleLeftDogonHouse from "../src/portraits/middleLeftDogonHouse";
import MiddleLeftKimpaVita from "../src/portraits/middleLeftKimpaVita";
import MiddleLeftMaliEmpire from "../src/portraits/middleLeftMaliEmpire";
import MiddleLeftTimbuktu from "../src/portraits/middleLeftTimbuktu";
import MiddleLeftMansaMusaMap from "../src/portraits/middleLeftMansaMusaMap";
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
      <Perf position="top-left" minimal />


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
        <PyramidFront />
        <RightSaintMaurice />
        <RightKubaMasquerade />
        <RightNubienKermaSudan />
        <RightKimpaVita />
        <RightBeninBronzes />
        <RightSaidOfMogadishu />
        <RightDonFransciscoDeArobe />
        <BackGriots />
        <BackQueenNzinga />
        <BackMinoMothers />
        <BackQueenNzinga2 />
        <BackHaiti />
        <MiddleLeftDogonHouse />
        <MiddleLeftKimpaVita />
        <MiddleLeftMaliEmpire />
        <MiddleLeftTimbuktu />
        <MiddleLeftMansaMusaMap />

        <PortalMasks />
        <Walls />
        <Portal />

        {/* Floor */}
        <Floor />

      </Physics >
    </>
  );
}
