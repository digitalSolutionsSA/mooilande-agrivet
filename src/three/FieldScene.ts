import * as THREE from 'three';

/**
 * Golden-hour veld: instanced grass swaying in shader-driven wind and parting
 * around the cursor, drifting pollen and a warm sky.
 * Scrolling glides the camera off the ridge and down a trail between the grass.
 */

// Rolling hills shared by the ground mesh and grass
const hill = (x: number, z: number) =>
  Math.sin(x * 0.11) * 0.7 + Math.cos(z * 0.09 + x * 0.04) * 0.9 + Math.sin((x + z) * 0.05) * 0.6;

// The trampled trail the camera follows
const trailX = (z: number) => Math.sin(z * 0.15) * 1.2;
const TRAIL_GLSL = /* glsl */ `
  float trailX(float z) { return sin(z * 0.15) * 1.2; }
`;

// Smooth value noise for patchy colour and gusts
const NOISE_GLSL = /* glsl */ `
  float hash21(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x), mix(hash21(i + vec2(0.0, 1.0)), hash21(i + 1.0), f.x), f.y);
  }
`;

const FOG = /* glsl */ `
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  vec3 applyFog(vec3 col, float depth) {
    return mix(col, uFogColor, smoothstep(uFogNear, uFogFar, depth));
  }
`;

const SKY_TOP = new THREE.Color('#4f6f84');
const SKY_MID = new THREE.Color('#e9c08e');
const HORIZON = new THREE.Color('#f0a35a');
const FOG_COLOR = new THREE.Color('#e7ad6f');
const FOG_NEAR = 14;
const FOG_FAR = 90;
const SUN_DIR = new THREE.Vector3(0.25, 0.06, -1).normalize();

// Camera travel along the trail (z), from the ridge down into the grass
const CAM_START_Z = 10.5;
const CAM_END_Z = 0.5;

export class FieldScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();
  private grassMat!: THREE.ShaderMaterial;
  private pollenMat!: THREE.ShaderMaterial;
  private raf = 0;
  private running = false;
  private disposed = false;

  private pointer = new THREE.Vector2(0, 0);
  private pointerSmooth = new THREE.Vector2(0, 0);
  private mouseWorld = new THREE.Vector3(0, 0, -100);
  private mouseTarget = new THREE.Vector3(0, 0, -100);
  private mouseStrength = 0;
  private raycaster = new THREE.Raycaster();
  private groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.6);
  private lookTarget = new THREE.Vector3();
  private progress = 0;
  private progressSmooth = 0;
  private intro = 0;
  private grassGeo!: THREE.InstancedBufferGeometry;
  private perfFrames = 0;
  private perfTime = 0;
  private perfLevel = 0; // 0 = full quality; each step down thins the grass and resolution
  private maxPixelRatio = 1.75;
  private pixelBudget = 2_300_000; // rendered pixels per frame, so 4K and ultra-wide screens stay smooth

  constructor(private canvas: HTMLCanvasElement, mobile: boolean) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' });
    this.maxPixelRatio = mobile ? 1.5 : 1.75;
    this.pixelBudget = mobile ? 1_100_000 : 2_300_000;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(FOG_COLOR);

    this.camera = new THREE.PerspectiveCamera(mobile ? 60 : 46, 1, 0.05, 400);

    this.buildSky();
    this.buildGround();
    this.buildGrass(mobile ? 40000 : 130000);
    this.buildPollen(mobile ? 200 : 450);

    this.resize();
    window.addEventListener('resize', this.resize);
    window.addEventListener('pointermove', this.onPointer, { passive: true });
  }

  /* ---------- Build ---------- */

  private buildSky() {
    const geo = new THREE.SphereGeometry(300, 32, 16);
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTop: { value: SKY_TOP },
        uMid: { value: SKY_MID },
        uHorizon: { value: HORIZON },
        uSunDir: { value: SUN_DIR },
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uTop, uMid, uHorizon, uSunDir;
        varying vec3 vDir;
        void main() {
          float y = vDir.y;
          vec3 col = mix(uHorizon, uMid, smoothstep(-0.02, 0.12, y));
          col = mix(col, uTop, smoothstep(0.12, 0.55, y));
          float sun = max(dot(normalize(vDir), uSunDir), 0.0);
          col += vec3(1.0, 0.78, 0.45) * pow(sun, 18.0) * 0.55;
          col += vec3(1.0, 0.92, 0.75) * pow(sun, 900.0) * 2.0;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    this.scene.add(new THREE.Mesh(geo, mat));
  }

  private fogUniforms() {
    return {
      uFogColor: { value: FOG_COLOR },
      uFogNear: { value: FOG_NEAR },
      uFogFar: { value: FOG_FAR },
    };
  }

  private buildGround() {
    const geo = new THREE.PlaneGeometry(260, 260, 160, 160);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, hill(pos.getX(i), pos.getZ(i)));
    }
    const mat = new THREE.ShaderMaterial({
      uniforms: { ...this.fogUniforms() },
      vertexShader: /* glsl */ `
        varying float vDepth;
        varying vec3 vWorld;
        void main() {
          vWorld = position;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vDepth = -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        ${FOG}
        ${TRAIL_GLSL}
        ${NOISE_GLSL}
        varying float vDepth;
        varying vec3 vWorld;
        void main() {
          vec3 col = mix(vec3(0.06, 0.09, 0.03), vec3(0.17, 0.2, 0.07), smoothstep(-2.0, 2.0, vWorld.y));
          // Same dry patches as the grass above it
          float patchN = vnoise(vWorld.xz * 0.06) * 0.65 + vnoise(vWorld.xz * 0.21 + 7.3) * 0.35;
          col = mix(col, vec3(0.24, 0.19, 0.09), smoothstep(0.42, 0.72, patchN) * 0.7);
          // Dusty trampled trail
          float trail = smoothstep(0.5, 0.12, abs(vWorld.x - trailX(vWorld.z))) * step(vWorld.z, 9.0);
          float n = vnoise(vWorld.xz * 3.0);
          vec3 dirt = mix(vec3(0.27, 0.2, 0.11), vec3(0.42, 0.32, 0.18), n);
          col = mix(col, dirt, trail * 0.8);
          gl_FragColor = vec4(applyFog(col, vDepth), 1.0);
        }
      `,
    });
    this.scene.add(new THREE.Mesh(geo, mat));
  }

  private buildGrass(count: number) {
    // One tapered blade, 7 segments tall, height 0..1; `side` lets the shader shade a folded midrib
    const segs = 7;
    const verts: number[] = [];
    const sides: number[] = [];
    const idx: number[] = [];
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const w = 0.021 * Math.pow(1 - t, 0.6) + 0.001;
      verts.push(-w, t, 0, w, t, 0);
      sides.push(-1, 1);
    }
    for (let i = 0; i < segs; i++) {
      const a = i * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }

    const geo = new THREE.InstancedBufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute('side', new THREE.Float32BufferAttribute(sides, 1));
    geo.setIndex(idx);

    const offsets = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const angles = new Float32Array(count);
    const leans = new Float32Array(count);
    const variety = new Float32Array(count);
    const kinds = new Float32Array(count);

    // Plant in tussocks: blades fan out from a shared root like real veld grass,
    // with the odd thin seed stalk standing above the leaves
    let n = 0;
    let guard = 0;
    while (n < count && guard++ < count) {
      const zone = Math.random();
      let x: number;
      let z: number;
      let scale: number;
      if (zone < 0.2) {
        // Foreground band right in front of the lens
        z = 3 + Math.random() * 5.6;
        x = trailX(z) + (Math.random() - 0.5) * 12;
        scale = 0.35 + Math.pow(Math.random(), 1.6) * 0.65;
      } else if (zone < 0.55) {
        // Either side of the trail, where the camera travels
        z = 5 - Math.random() * 20;
        const off = 0.3 + Math.pow(Math.random(), 1.4) * 7;
        x = trailX(z) + (Math.random() < 0.5 ? -off : off);
        scale = 0.36 + Math.pow(Math.random(), 1.6) * 0.75;
      } else {
        // The wider veld fading into the haze
        z = -10 - Math.pow(Math.random(), 1.3) * 68;
        const spread = 16 + (-z) * 0.7;
        x = (Math.random() - 0.5) * 2 * spread;
        scale = 0.45 + Math.random() * 0.5;
      }
      // Keep the trail trampled: sparse short tufts on it, grass shortening toward its edges
      const fromTrail = Math.abs(x - trailX(z));
      const onTrail = fromTrail < 0.3 && z < 9;
      if (onTrail && Math.random() > 0.18) continue;
      if (!onTrail && z < 9) scale *= THREE.MathUtils.smoothstep(fromTrail, 0.1, 1.4) * 0.6 + 0.4;

      const far = z < -10;
      const blades = onTrail ? 2 + Math.floor(Math.random() * 3) : far ? 4 + Math.floor(Math.random() * 5) : 8 + Math.floor(Math.random() * 10);
      const radius = far ? 0.16 : 0.1;

      for (let k = 0; k < blades && n < count; k++) {
        const r = Math.sqrt(Math.random()) * radius;
        const a = Math.random() * Math.PI * 2;
        const ox = Math.cos(a) * r;
        const oz = Math.sin(a) * r;
        const bx = x + ox;
        const bz = z + oz;
        const seed = !onTrail && Math.random() < 0.09;

        offsets[n * 3] = bx;
        offsets[n * 3 + 1] = hill(bx, bz);
        offsets[n * 3 + 2] = bz;
        // The shader leans a blade along (-sin, cos) of its angle: point that away from the root
        angles[n] = Math.atan2(-ox, oz) + (Math.random() - 0.5) * 0.7;
        const outer = r / radius;
        leans[n] = seed ? Math.random() * 0.12 : 0.15 + outer * 0.65 + Math.random() * 0.2;
        scales[n] = onTrail
          ? 0.12 + Math.pow(Math.random(), 2) * 0.35
          : scale * (seed ? 1.2 + Math.random() * 0.25 : 0.6 + Math.random() * 0.5) * (1 - outer * 0.2);
        variety[n] = Math.random();
        kinds[n] = seed ? 1 : 0;
        n++;
      }
    }
    geo.instanceCount = n;

    geo.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3));
    geo.setAttribute('aScale', new THREE.InstancedBufferAttribute(scales, 1));
    geo.setAttribute('aAngle', new THREE.InstancedBufferAttribute(angles, 1));
    geo.setAttribute('aLean', new THREE.InstancedBufferAttribute(leans, 1));
    geo.setAttribute('aVariety', new THREE.InstancedBufferAttribute(variety, 1));
    geo.setAttribute('aKind', new THREE.InstancedBufferAttribute(kinds, 1));

    this.grassMat = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: this.mouseWorld },
        uMouseStrength: { value: 0 },
        uGrow: { value: 0 },
        uCam: { value: new THREE.Vector3() },
        uSunDir: { value: SUN_DIR },
        ...this.fogUniforms(),
      },
      vertexShader: /* glsl */ `
        ${NOISE_GLSL}
        attribute float side;
        attribute vec3 aOffset;
        attribute float aScale;
        attribute float aAngle;
        attribute float aLean;
        attribute float aVariety;
        attribute float aKind;
        uniform float uTime;
        uniform vec3 uMouse;
        uniform float uMouseStrength;
        uniform float uGrow;
        uniform vec3 uCam;
        uniform vec3 uSunDir;
        varying float vH;
        varying float vDepth;
        varying float vVariety;
        varying float vSide;
        varying float vKind;
        varying float vDry;
        varying float vGust;
        varying float vDiffuse;
        varying float vTrans;
        void main() {
          float h = position.y;
          vec3 p = position;
          float height = aScale * mix(0.35, 1.0, uGrow);
          p.y *= height;
          // Seed stalks are thin; distant blades get wider so the field reads solid to the horizon
          float camDist = distance(aOffset.xz, cameraPosition.xz);
          p.x *= mix(1.0, 0.3, aKind) * (1.0 + clamp((camDist - 6.0) * 0.03, 0.0, 1.8));
          float c = cos(aAngle), s = sin(aAngle);
          p = vec3(p.x * c, p.y, p.x * s);
          vec3 w = p + aOffset;
          float bend = h * h;

          // Natural lean, perpendicular to the blade's face
          vec2 leanDir = vec2(-s, c);
          w.xz += leanDir * aLean * bend * height;
          w.y -= aLean * aLean * bend * height * 0.95;

          // Wind: broad gust bands rolling across the field, plus per-blade flutter
          vec2 windDir = normalize(vec2(1.0, 0.45));
          float wave = sin(dot(aOffset.xz, windDir) * 0.22 - uTime * 1.5);
          float gust = wave * 0.5 + 0.5;
          gust *= 0.6 + 0.4 * vnoise(aOffset.xz * 0.05 + uTime * 0.08);
          float flutter = sin(uTime * 2.6 + aVariety * 6.283 + aOffset.x * 0.6);
          w.xz += windDir * (gust * 0.38 + flutter * 0.05) * bend * height;
          w.y -= gust * gust * 0.08 * bend * height;

          // Part the grass around the cursor
          vec2 d = w.xz - uMouse.xz;
          float dist = length(d) + 0.0001;
          float push = smoothstep(3.0, 0.0, dist) * uMouseStrength;
          w.xz += (d / dist) * push * bend * 1.2;
          w.y -= push * bend * 0.4;

          // Brush aside blades right at the lens so the camera slips between them
          vec2 dc = w.xz - uCam.xz;
          float dcl = length(dc) + 0.0001;
          float brush = smoothstep(0.7, 0.05, dcl) * step(w.z, uCam.z + 0.2);
          w.xz += (dc / dcl) * brush * bend * 0.6;

          // Lighting terms: blade normal tilts with its lean
          vec3 nrm = normalize(vec3(leanDir.x, 0.25 + aLean, leanDir.y));
          vDiffuse = abs(dot(nrm, uSunDir));
          vec3 toFrag = normalize(w - cameraPosition);
          vTrans = pow(max(dot(toFrag, uSunDir), 0.0), 3.0);

          // Large drifts of dry, straw-coloured veld between greener patches
          float patchN = vnoise(aOffset.xz * 0.06) * 0.65 + vnoise(aOffset.xz * 0.21 + 7.3) * 0.35;
          vDry = smoothstep(0.42, 0.72, patchN);

          vH = h;
          vVariety = aVariety;
          vSide = side;
          vKind = aKind;
          vGust = smoothstep(0.55, 1.0, wave);
          vec4 mv = viewMatrix * vec4(w, 1.0);
          vDepth = -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        ${FOG}
        varying float vH;
        varying float vDepth;
        varying float vVariety;
        varying float vSide;
        varying float vKind;
        varying float vDry;
        varying float vGust;
        varying float vDiffuse;
        varying float vTrans;
        void main() {
          vec3 green = mix(vec3(0.2, 0.34, 0.09), vec3(0.38, 0.44, 0.14), vVariety);
          vec3 straw = mix(vec3(0.66, 0.53, 0.27), vec3(0.82, 0.68, 0.38), vVariety);
          vec3 albedo = mix(green, straw, vDry * (0.7 + vVariety * 0.3));
          // Tips dry out first
          albedo = mix(albedo, straw * 1.06, smoothstep(0.5, 1.0, vH) * (0.3 + vDry * 0.45));
          // Rusty rooigras seed heads
          albedo = mix(albedo, vec3(0.5, 0.25, 0.12), vKind * smoothstep(0.72, 0.86, vH));

          vec3 sunCol = vec3(1.0, 0.74, 0.45);
          vec3 skyCol = vec3(0.66, 0.6, 0.5);
          vec3 col = albedo * (skyCol * 0.55 + sunCol * vDiffuse * 0.6);
          // Light glowing through the blades when looking toward the sun
          col += albedo * sunCol * vTrans * (0.35 + vH) * 0.85;
          // Self-shadowing deep in the tussock
          col *= mix(0.22, 1.0, smoothstep(0.0, 0.5, vH));
          // Folded midrib catches light, edges fall off
          col *= 0.8 + 0.28 * (1.0 - abs(vSide));
          // Sheen as gusts flatten the blades
          col += vec3(0.16, 0.13, 0.07) * vGust * smoothstep(0.35, 1.0, vH);
          gl_FragColor = vec4(applyFog(col, vDepth), 1.0);
        }
      `,
    });

    this.grassGeo = geo;
    const mesh = new THREE.Mesh(geo, this.grassMat);
    mesh.frustumCulled = false;
    this.scene.add(mesh);
  }

  private buildPollen(count: number) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 4 + 0.4;
      pos[i * 3 + 2] = 10 - Math.random() * 45;
      seed[i] = Math.random();
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));

    this.pollenMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixel: { value: this.renderer.getPixelRatio() },
        uAlpha: { value: 0 },
      },
      vertexShader: /* glsl */ `
        attribute float aSeed;
        uniform float uTime;
        uniform float uPixel;
        varying float vTwinkle;
        void main() {
          vec3 p = position;
          float t = uTime * (0.15 + aSeed * 0.25);
          p.x += sin(t + aSeed * 30.0) * 1.5 + uTime * 0.25;
          p.x = mod(p.x + 20.0, 40.0) - 20.0;
          p.y += sin(t * 1.7 + aSeed * 12.0) * 0.6;
          p.z += cos(t + aSeed * 8.0) * 1.2;
          vTwinkle = 0.5 + 0.5 * sin(uTime * 2.0 + aSeed * 40.0);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = min((4.0 + aSeed * 7.0) * uPixel * (10.0 / -mv.z), 40.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uAlpha;
        varying float vTwinkle;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vec3(1.0, 0.85, 0.55) * a, a * (0.35 + vTwinkle * 0.65) * uAlpha);
        }
      `,
    });
    const pts = new THREE.Points(geo, this.pollenMat);
    pts.frustumCulled = false;
    this.scene.add(pts);
  }

  /* ---------- Interaction ---------- */

  private onPointer = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const r = this.canvas.getBoundingClientRect();
    if (e.clientY > r.bottom || e.clientY < r.top) return;
    this.pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = new THREE.Vector3();
    if (this.raycaster.ray.intersectPlane(this.groundPlane, hit)) {
      this.mouseTarget.copy(hit);
      this.mouseStrength = 1;
    }
  };

  /** 0 → 1 as the hero scrolls away; walks the camera down the trail. */
  setProgress(p: number) {
    this.progress = p;
  }

  /** 0 → 1 intro: grass rises, camera settles, pollen fades in. */
  setIntro(v: number) {
    this.intro = v;
  }

  private resize = () => {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const ratio = Math.min(window.devicePixelRatio, this.maxPixelRatio, Math.sqrt(this.pixelBudget / Math.max(1, w * h)));
    this.renderer.setPixelRatio(Math.max(0.6, ratio));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  /* ---------- Loop ---------- */

  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.clock.getDelta();
    const loop = () => {
      if (!this.running) return;
      this.render();
      this.raf = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  /**
   * Measures ~90 frames after warm-up. If the device can't hold ~45fps it steps quality down
   * (fewer blades, lower resolution) and measures again, up to two steps.
   */
  private watchPerformance(frameTime: number) {
    // Only judge speed once loading and the intro are over, so start-up work isn't mistaken for a slow device
    if (this.perfLevel >= 2 || document.hidden || this.intro < 1) return;
    this.perfFrames++;
    if (this.perfFrames <= 30) return; // skip shader warm-up
    this.perfTime += frameTime;
    if (this.perfFrames < 120) return;
    const slow = this.perfTime / 90 > 1 / 45;
    this.perfFrames = 0;
    this.perfTime = 0;
    if (!slow) {
      this.perfLevel = 2; // fast enough: stop measuring
      return;
    }
    this.perfLevel++;
    // Instances were generated in random order, so trimming the tail thins every zone evenly
    this.grassGeo.instanceCount = Math.floor(this.grassGeo.instanceCount * 0.6);
    this.maxPixelRatio = 1;
    this.pixelBudget *= 0.6;
    this.resize();
  }

  private render() {
    const raw = this.clock.getDelta();
    const dt = Math.min(raw, 0.05);
    this.watchPerformance(raw);
    const t = this.clock.elapsedTime;

    this.pointerSmooth.lerp(this.pointer, 1 - Math.pow(0.02, dt));
    this.mouseWorld.lerp(this.mouseTarget, 1 - Math.pow(0.001, dt));
    this.mouseStrength = Math.max(0, this.mouseStrength - dt * 0.25);
    this.progressSmooth += (this.progress - this.progressSmooth) * (1 - Math.pow(0.004, dt));

    // Walk the trail: high on the ridge looking over the grass → down among the blades
    const p = this.progressSmooth;
    const ease = p * p * (3 - 2 * p);
    const cz = THREE.MathUtils.lerp(CAM_START_Z, CAM_END_Z, ease);
    const sway = Math.sin(t * 0.9) * 0.04 * ease; // gentle walking bob once moving
    const cx = trailX(cz) + this.pointerSmooth.x * 0.5 * (1 - ease * 0.6);
    const eye = THREE.MathUtils.lerp(1.65, 0.45, ease) + (1 - this.intro) * 0.9 + sway;
    const cy = hill(cx, cz) + eye + this.pointerSmooth.y * 0.12;
    this.camera.position.set(cx, cy, cz);

    const lz = cz - 10;
    this.lookTarget.set(
      trailX(lz) * 0.8 + this.pointerSmooth.x * 0.9,
      hill(trailX(lz), lz) + THREE.MathUtils.lerp(0.75, 0.95, ease) + this.pointerSmooth.y * 0.35,
      lz,
    );
    this.camera.lookAt(this.lookTarget);
    this.groundPlane.constant = -hill(cx, cz - 6);

    this.grassMat.uniforms.uTime.value = t;
    this.grassMat.uniforms.uGrow.value = this.intro;
    this.grassMat.uniforms.uMouseStrength.value = this.mouseStrength;
    (this.grassMat.uniforms.uCam.value as THREE.Vector3).set(cx, cy, cz);
    this.pollenMat.uniforms.uTime.value = t;
    this.pollenMat.uniforms.uAlpha.value = this.intro;

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    this.stop();
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('pointermove', this.onPointer);
    this.scene.traverse(obj => {
      const m = obj as THREE.Mesh;
      if (!m.isMesh && !(obj as THREE.Points).isPoints) return;
      m.geometry?.dispose();
      (m.material as THREE.Material | undefined)?.dispose();
    });
    this.renderer.dispose();
  }
}

export function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}
