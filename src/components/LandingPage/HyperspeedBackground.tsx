import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import styles from "./index.module.css";

interface HyperspeedBackgroundProps {
  darkMode: boolean;
}

const HyperspeedStars = ({ darkMode }: { darkMode: boolean }) => {
  const starsGeometry = new THREE.BufferGeometry();
  const starCount = 2000;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 1000;
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: darkMode ? 0xffffff : 0x333333, // dark gray instead of pure black
    size: 1.0,                             // bigger size
    transparent: true,
    opacity: 0.9,                          // higher opacity
  });
  

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += 0.002;
      pointsRef.current.rotation.y += 0.002;
    }
  });

  return <points ref={pointsRef} geometry={starsGeometry} material={material} />;
};

const HyperspeedBackground = ({ darkMode }: HyperspeedBackgroundProps) => {
  return (
    <div className={styles.hyperspeedBackground}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <HyperspeedStars darkMode={darkMode} />
      </Canvas>
    </div>
  );
};

export default HyperspeedBackground;
