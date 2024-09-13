import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

const Model = forwardRef(({ glbPath, onLoad }, ref) => {
  const { scene } = useGLTF(glbPath);

  useEffect(() => {
    if (scene) {
      if (ref && typeof ref === "function") {
        ref({ scene });
      } else if (ref) {
        ref.current = { scene };
      }

      if (onLoad) {
        onLoad({ scene });
      }
    }
  }, [scene, onLoad, ref]);

  return <primitive object={scene} />;
});

export default Model;
