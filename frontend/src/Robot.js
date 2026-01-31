import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Robot(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/robot.glb');
  const { actions } = useAnimations(animations, group);

  // 🔢 CHANGE THIS NUMBER TO TRY DIFFERENT ANIMATIONS
  const ANIMATION_INDEX = 2;

  useEffect(() => {
    if (!actions || animations.length === 0) return;

    // Print all animation names + indexes
    console.log("🎬 Available animations:");
    animations.forEach((a, i) => {
      console.log(i, "→", a.name);
    });

    const index = Math.min(ANIMATION_INDEX, animations.length - 1);
    const clip = animations[index];

    const action = actions[clip.name];
    if (action) {
      action.reset().fadeIn(0.5).play();
      console.log("▶ Playing animation index:", index, clip.name);
    }

  }, [actions, animations]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/robot.glb');
