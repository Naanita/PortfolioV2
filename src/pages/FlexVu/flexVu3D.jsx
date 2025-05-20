import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";


const MODEL_URL = "/1234.glb";

const FlexVu3D = () => {
    const mountRef = useRef(null);
    const controlsRef = useRef(null);
    const rendererRef = useRef(null);
    const modelRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Escena y cámara
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x222233);

        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1, 5);

        // Renderizador
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(
            mountRef.current.clientWidth,
            mountRef.current.clientHeight
        );
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Luces
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        // OrbitControls
        controlsRef.current = new OrbitControls(camera, renderer.domElement);
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = 0.05;
        controlsRef.current.enablePan = false;

        // Loader GLTF
        const loader = new GLTFLoader();
        loader.load(
            MODEL_URL,
            (gltf) => {
                modelRef.current = gltf.scene;
                modelRef.current.position.set(0, 0, 0);

                // Centrado automático del modelo
                const box = new THREE.Box3().setFromObject(modelRef.current);
                const center = box.getCenter(new THREE.Vector3());
                modelRef.current.position.sub(center);

                scene.add(modelRef.current);

                // Animación de aparición con GSAP
                modelRef.current.scale.set(0.01, 0.01, 0.01);
                gsap.to(modelRef.current.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1.2,
                    ease: "bounce.out",
                });
            },
            undefined,
            (error) => {
                console.error("Error cargando el modelo:", error);
            }
        );

        // ResizeObserver para responsividad
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect =
                mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(
                mountRef.current.clientWidth,
                mountRef.current.clientHeight
            );
        };
        const resizeObserver = new window.ResizeObserver(handleResize);
        resizeObserver.observe(mountRef.current);

        // Loop de animación
        let animationId;
        const animate = () => {
            controlsRef.current?.update();
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Limpieza
        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            controlsRef.current?.dispose();
            renderer.dispose();
            if (modelRef.current) {
                scene.remove(modelRef.current);
                modelRef.current.traverse(child => {
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(mat => mat.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                    if (child.geometry) {
                        child.geometry.dispose();
                    }
                });
            }
            if (mountRef.current?.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                position: "relative",
                touchAction: "none",
            }}
        />
    );
};

export default FlexVu3D;
