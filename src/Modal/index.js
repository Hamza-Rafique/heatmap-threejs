import { useGLTF } from "@react-three/drei";
import React from "react";


const Model = React.forwardRef(({ glbPath }, ref) => {
    const { scene } = useGLTF(glbPath);
    React.useImperativeHandle(ref, () => ({ scene })); // Expose scene via ref
    return <primitive object={scene} />;
  });

  export default Model