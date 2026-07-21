// Particle swarm for experiencia-3d.html. The page itself is otherwise an
// exact copy of index.html — this script is a page-wide overlay effect: a
// lot of small, near-invisible glassy bubbles drift toward the viewer
// through real depth (starfield + fog sell the distance). When a bubble
// lines up with an actual card/button/section, it pops — a burst of froth
// and it's gone, instantly recycled somewhere far in the background — but
// the card/button itself never disappears, it just gets a shake + flash.
// When a bubble reaches empty screen space with nothing to pop against, it
// simply bounces off and keeps drifting. Everything here is procedural
// spheres — nothing to 404.
import * as THREE from "three";

const BUBBLE_COUNT = 55;
const SPAWN_DISTANCE = 18;
const EXIT_Z = 3;
const BOUNCE_DISTANCE = 1.4;
const COLORS = ["#00F0FF", "#FF00FF", "#7DF4FF"];
const FOG_NEAR = 7;
const FOG_FAR = 22;
const FLASH_FADE_SECONDS = 1.1;
const COLLISION_COOLDOWN = 0.6;

function isWebGLAvailable() {
    try {
        const canvas = document.createElement("canvas");
        return !!(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch (e) {
        return false;
    }
}

function collectTargets() {
    const selector = [
        "#category-grid > a",
        "#product-grid > div",
        "#inicio a",
        "#inicio button",
        "#soluciones .glass-panel",
        "#confianza .grid > div"
    ].join(",");
    return Array.from(document.querySelectorAll(selector));
}

function buildStarfield() {
    const count = 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const radius = 24 + Math.random() * 28;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
        positions[i * 3 + 2] = -Math.abs(radius * Math.cos(phi)) - 10;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color: 0xdfeaff,
        size: 0.045,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        fog: false // stars stay visible regardless of distance — they ARE the depth backdrop
    });
    return new THREE.Points(geometry, material);
}

function spawnBurst(scene, position, color, count = 6, speed = 2.4) {
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
        positions[i * 3] = position.x;
        positions[i * 3 + 1] = position.y;
        positions[i * 3 + 2] = position.z;
        velocities.push(new THREE.Vector3((Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed));
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color: new THREE.Color(color),
        size: 0.08,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    return { points, geometry, material, velocities, age: 0 };
}

function init() {
    const canvas = document.getElementById("meteor-canvas");
    if (!canvas || !isWebGLAvailable()) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return; // the effect is purely decorative motion — skip entirely

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    } catch (e) {
        return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if ("outputColorSpace" in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    // Fog dims/desaturates distant bubbles toward the page's own near-black
    // background instead of a flat void, so depth reads correctly even
    // though the canvas itself has no opaque backdrop.
    scene.fog = new THREE.Fog(0x050506, FOG_NEAR, FOG_FAR);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 65);
    camera.position.set(0, 0, 0);

    scene.add(new THREE.AmbientLight(0x404040, 1.3));
    const light1 = new THREE.PointLight(0x00f0ff, 2, 24);
    light1.position.set(-3, 2, -4);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xff00ff, 2, 24);
    light2.position.set(3, -2, -6);
    scene.add(light2);

    scene.add(buildStarfield());

    function resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }
    resize();
    window.addEventListener("resize", resize);

    const targets = collectTargets();
    const vFOVrad = THREE.MathUtils.degToRad(camera.fov);

    function apparentRadiusPx(worldRadius, distance) {
        const visibleHeight = 2 * Math.tan(vFOVrad / 2) * Math.max(distance, 0.001);
        const pixelsPerUnit = window.innerHeight / visibleHeight;
        return worldRadius * pixelsPerUnit;
    }

    function projectToScreen(position) {
        const p = position.clone().project(camera);
        return {
            x: ((p.x + 1) / 2) * window.innerWidth,
            y: ((1 - p.y) / 2) * window.innerHeight
        };
    }

    function frustumHalfExtentsAt(distance) {
        const halfHeight = distance * Math.tan(vFOVrad / 2);
        return { halfWidth: halfHeight * camera.aspect, halfHeight };
    }

    // --- Bubble swarm ------------------------------------------------------
    const sharedGeometry = new THREE.SphereGeometry(1, 12, 8);
    const bubbles = [];

    function placeAtSpawn(bubble, atRandomDepth) {
        const depth = atRandomDepth ? Math.random() * SPAWN_DISTANCE : SPAWN_DISTANCE;
        const { halfWidth, halfHeight } = frustumHalfExtentsAt(depth);
        bubble.mesh.position.set((Math.random() * 2 - 1) * halfWidth * 0.9, (Math.random() * 2 - 1) * halfHeight * 0.75, -depth);

        const speed = 1.4 + Math.random() * 1.4;
        bubble.velocity.set((Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 0.7 - 0.1, speed);
        bubble.flashLevel = 0;
        bubble.cooldown = 0;
        bubble.mesh.visible = true;
        bubble.mesh.scale.setScalar(bubble.size);
    }

    function buildBubble() {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size = 0.05 + Math.random() * 0.09; // small, per request
        const baseOpacity = 0.14 + Math.random() * 0.12;
        const baseEmissive = 0.35;

        const material = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            emissive: new THREE.Color(color),
            emissiveIntensity: baseEmissive,
            roughness: 0.15,
            metalness: 0.05,
            transparent: true,
            opacity: baseOpacity,
            depthWrite: false,
            fog: true
        });
        const mesh = new THREE.Mesh(sharedGeometry, material);

        const bubble = {
            mesh,
            material,
            color,
            size,
            baseOpacity,
            baseEmissive,
            velocity: new THREE.Vector3(),
            flashLevel: 0,
            cooldown: 0
        };
        placeAtSpawn(bubble, true);
        return bubble;
    }

    for (let i = 0; i < BUBBLE_COUNT; i++) {
        const bubble = buildBubble();
        scene.add(bubble.mesh);
        bubbles.push(bubble);
    }

    // Pure check (no side effects) so it's safe to call every qualifying
    // frame while a bubble approaches — the DOM is only actually touched
    // once we've decided a collision is really happening this frame.
    function overlappingTargets(screenPoint) {
        const hits = [];
        for (const el of targets) {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) continue;
            const withinViewport = rect.bottom > 0 && rect.top < window.innerHeight;
            if (!withinViewport) continue;
            const hit =
                screenPoint.x >= rect.left - 20 &&
                screenPoint.x <= rect.right + 20 &&
                screenPoint.y >= rect.top - 20 &&
                screenPoint.y <= rect.bottom + 20;
            if (hit) hits.push(el);
        }
        return hits;
    }

    // Shake + flash only — never touches opacity/display, so the card or
    // button itself can never disappear because a bubble popped on it.
    function applyDomImpact(hits, color) {
        hits.forEach((el) => {
            el.style.setProperty("--meteor-impact-color", color);
            el.classList.remove("meteor-impact");
            void el.offsetWidth; // restart the animation if it's already mid-flight
            el.classList.add("meteor-impact");
            el.addEventListener("animationend", () => el.classList.remove("meteor-impact"), { once: true });
        });
    }

    // Hit a real card/button/section: the bubble pops (bigger, frothier
    // burst) and is immediately recycled far in the background. Only the
    // bubble is ever removed here — the DOM target just shakes.
    function triggerPop(scene, bubble, hits) {
        applyDomImpact(hits, bubble.color);
        activeBursts.push(spawnBurst(scene, bubble.mesh.position.clone(), bubble.color, 14, 3.2));
        placeAtSpawn(bubble, false);
    }

    // Nothing there to pop against: the bubble just caroms off the "glass"
    // and keeps drifting, no destruction involved.
    function triggerBounce(bubble) {
        bubble.flashLevel = 1;
        bubble.cooldown = COLLISION_COOLDOWN;
        bubble.velocity.z *= -0.6;
        bubble.velocity.x += (Math.random() - 0.5) * 1.2;
        bubble.velocity.y += (Math.random() - 0.5) * 1.2;
    }

    const activeBursts = [];
    const clock = new THREE.Clock();
    let rafId = null;

    function animate() {
        rafId = requestAnimationFrame(animate);
        if (document.hidden) return;

        const delta = Math.min(clock.getDelta(), 0.05);

        for (let i = 0; i < bubbles.length; i++) {
            const bubble = bubbles[i];

            bubble.mesh.position.addScaledVector(bubble.velocity, delta);

            if (bubble.cooldown > 0) bubble.cooldown -= delta;
            if (bubble.flashLevel > 0) bubble.flashLevel = Math.max(0, bubble.flashLevel - delta / FLASH_FADE_SECONDS);
            bubble.material.opacity = THREE.MathUtils.lerp(bubble.baseOpacity, 0.85, bubble.flashLevel);
            bubble.material.emissiveIntensity = THREE.MathUtils.lerp(bubble.baseEmissive, 2.4, bubble.flashLevel);

            const distance = -bubble.mesh.position.z;
            if (bubble.cooldown <= 0 && distance > 0.2 && distance < SPAWN_DISTANCE) {
                const radiusPx = apparentRadiusPx(bubble.size * 0.6, distance);
                if (radiusPx > 4) {
                    const screenPoint = projectToScreen(bubble.mesh.position);
                    const hits = overlappingTargets(screenPoint);
                    if (hits.length > 0) {
                        triggerPop(scene, bubble, hits);
                    } else if (distance <= BOUNCE_DISTANCE) {
                        triggerBounce(bubble);
                    }
                }
            }

            if (bubble.mesh.position.z > EXIT_Z || bubble.mesh.position.z < -SPAWN_DISTANCE * 1.2) {
                placeAtSpawn(bubble, false);
            }
        }

        for (let i = activeBursts.length - 1; i >= 0; i--) {
            const burst = activeBursts[i];
            burst.age += delta;
            const positions = burst.geometry.attributes.position.array;
            for (let p = 0; p < burst.velocities.length; p++) {
                positions[p * 3] += burst.velocities[p].x * delta;
                positions[p * 3 + 1] += burst.velocities[p].y * delta;
                positions[p * 3 + 2] += burst.velocities[p].z * delta;
            }
            burst.geometry.attributes.position.needsUpdate = true;
            burst.material.opacity = Math.max(0, 1 - burst.age / 0.6);
            if (burst.age > 0.6) {
                scene.remove(burst.points);
                burst.geometry.dispose();
                burst.material.dispose();
                activeBursts.splice(i, 1);
            }
        }

        renderer.render(scene, camera);
    }
    animate();

    document.addEventListener("visibilitychange", () => {
        if (document.hidden && rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        } else if (!document.hidden && rafId === null) {
            clock.getDelta(); // drop the paused-time gap
            animate();
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
