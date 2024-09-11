import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Html } from "@react-three/drei";
const ThreeJSScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const barWidth = 1;
    const barMargin = 1;
    const barHeightMax = 10;
    const colors = [
      "#431A42",
      "#4E2453",
      "#582E66",
      "#613979",
      "#68468D",
      "#6D52A3",
      "#6F60B8",
      "#6F6ECE",
      "#6A7DE5",
      "#618DFB",
    ];

    const scene = new THREE.Scene();

    // Create the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(10, 5, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: 1 });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a color material
    const materials = colors.map(
      (color) => new THREE.MeshPhongMaterial({ color: color, shininess: 0 })
    );

    // Add controls to move the camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // Define data
    const data = [
      { cat1: 1, cat2: 1, value: 1 },
      { cat1: 1, cat2: 2, value: 0.4 },
      { cat1: 1, cat2: 3, value: 0.1 },
      { cat1: 1, cat2: 4, value: 0.6 },
      { cat1: 2, cat2: 1, value: 0.8 },
      { cat1: 2, cat2: 2, value: 0.3 },
      { cat1: 2, cat2: 3, value: 0.2 },
      { cat1: 2, cat2: 4, value: 0.5 },
      { cat1: 3, cat2: 1, value: 0.9 },
      { cat1: 3, cat2: 2, value: 0.5 },
      { cat1: 3, cat2: 3, value: 0.7 },
      { cat1: 3, cat2: 4, value: 0.4 },
      { cat1: 4, cat2: 1, value: 0.6 },
      { cat1: 4, cat2: 2, value: 1 },
      { cat1: 4, cat2: 3, value: 0.4 },
      { cat1: 4, cat2: 4, value: 0.3 },
    ];

    // Create a bar
    function createBar(i, cat1, cat2, value, material) {
      let geometry = new THREE.BoxGeometry(1, 1, 1);
      let bar = new THREE.Mesh(geometry, material);
      bar.castShadow = true;
      scene.add(bar);

      bar = scaleBar(bar, value);
      bar = positionBar(bar, i, cat1, cat2, value);

      return bar;
    }

    function scaleBar(bar, value) {
      bar.scale.y = value * barHeightMax;
      bar.scale.x = barWidth;

      return bar;
    }

    function positionBar(bar, i, cat1, cat2, value) {
      bar.position.x =
        (cat2 - 1) * (barWidth + barMargin) -
        (data.length / 8) * (barWidth + barMargin) +
        (barWidth + barMargin) / 2;
      bar.position.y += (value * barHeightMax) / 2 - barHeightMax / 2;
      bar.position.z -=
        (cat1 - 1) * (barWidth + barMargin) -
        (data.length / 8) * (barWidth + barMargin) +
        (barWidth + barMargin) / 2;

      return bar;
    }

    let bars = [];
    data.forEach((d, i) => {
      const materialIndex = Math.floor(d.value * 10) - 1;
      let bar = {
        geometry: createBar(
          i,
          d.cat1,
          d.cat2,
          d.value,
          materials[materialIndex]
        ),
        d: d,
        i: i,
      };
      bars.push(bar);
      scene.add(bar.geometry);
    });

    // Add light
    const light = new THREE.DirectionalLight("grey", 1);
    light.position.set(-1, 0, 1);
    scene.add(light);

    const lightAmbient = new THREE.AmbientLight("white");
    scene.add(lightAmbient);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // Initial rendering and animation
    setTimeout(animate, 1000);

    // React to window resizing
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Html  position={[1, 2, 1]}>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
    </Html>
  );
};

export default ThreeJSScene;
