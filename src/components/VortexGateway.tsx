import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NUM_POINTS_PER_CIRCLE = 36
const NUM_ROWS = 100

const vertexShader = `
precision highp float;

attribute vec4 particlePosRow;
attribute vec3 orientation;

uniform float aspectRatio;
uniform float rowId;
uniform float time;
uniform float speed;
uniform float angle;
uniform float rowScale;
uniform float radius;
uniform float focus;

varying vec2 vUv;
varying float vRowId;

#define PI 3.141592653589793

vec4 getQuaternionFromAxisAngle(vec3 axis, float angle) {
  vec3 nAxis = normalize(axis);
  float halfAngle = angle * 0.5;
  float s = sin(halfAngle);
  return vec4(nAxis.xyz * s, cos(halfAngle));
}

vec3 rotateVector(vec4 q, vec3 v) {
  vec3 qv = q.xyz;
  float qs = q.w;
  return v + 2.0 * cross(qv, cross(qv, v) + qs * v);
}

void main() {
  vRowId = rowId;
  float particleId = particlePosRow.w;
  vec3 position2 = particlePosRow.xyz;

  float rowTime = time * speed;
  float loopDuration = 40.0;
  float currentTime = mod(rowTime + rowId, loopDuration);

  float angleOffset = angle * position.y;
  float angleStep = angleOffset + currentTime;
  float radiusScale = clamp(1.0 - currentTime + 5.0, 0.0, 1.0);

  vec3 ringPos = vec3(cos(angleStep) * radius, position2.y, sin(angleStep) * radius);

  vec4 qRotation = getQuaternionFromAxisAngle(vec3(0.0, 1.0, 0.0), angleStep);
  vec4 qFront = getQuaternionFromAxisAngle(vec3(0.0, 1.0, 0.0), PI * 0.5);
  vec4 qOrientation = getQuaternionFromAxisAngle(orientation, angleOffset);

  vec4 q1 = qRotation;
  vec4 q2 = qOrientation;
  vec4 qTemp = vec4(q1.xyz * q2.w + q2.xyz * q1.w + cross(q1.xyz, q2.xyz), q1.w * q2.w - dot(q1.xyz, q2.xyz));

  q1 = qTemp;
  q2 = qFront;
  vec4 q = vec4(q1.xyz * q2.w + q2.xyz * q1.w + cross(q1.xyz, q2.xyz), q1.w * q2.w - dot(q1.xyz, q2.xyz));

  vec3 finalRingPos = rotateVector(q, position);

  vec3 scaledPos = finalRingPos * vec3(radiusScale * rowScale * radius, rowScale, radiusScale * rowScale * radius);

  vec4 transformedPos = vec4(scaledPos.x, scaledPos.y * aspectRatio, scaledPos.z + focus + (1.0 - currentTime) * 10.0, 1.0);

  gl_Position = projectionMatrix * modelViewMatrix * transformedPos;
  gl_PointSize = (80.0 + (particleId / 36.0) * 120.0) * (1.0 / -transformedPos.z);
}
`

const fragmentShader = `
precision highp float;

uniform float time;
uniform vec3 color;

varying float vRowId;

vec3 mod289v3(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289v2(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289v3(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float circle(vec2 st, float r) {
  return 1.0 - smoothstep(r, r + 0.1, distance(st, vec2(0.5)));
}

void main() {
  float dist = distance(gl_PointCoord, vec2(0.5));
  float angle = atan(gl_PointCoord.y - 0.5, gl_PointCoord.x - 0.5);
  float spiral = sin(dist * 10.0 - angle * 2.0 + time + vRowId) * 0.5 + 0.5;
  float n = snoise(vec2(gl_PointCoord.x * 5.0 + time, gl_PointCoord.y * 5.0 + vRowId)) * 0.5 + 0.5;
  float t = circle(gl_PointCoord, 0.5 + n * 0.2 * (1.0 - dist));
  float alpha = smoothstep(0.5, 0.4, dist) * 0.8;
  float white = smoothstep(0.1, 0.6, t * spiral);
  vec3 colorRGB = color;
  colorRGB = mix(colorRGB, vec3(0.2, 0.4, 1.0), smoothstep(0.48, 0.5, t * spiral));
  colorRGB = mix(colorRGB, vec3(1.0), smoothstep(0.4, 0.6, t * (spiral * 2.5)));
  colorRGB *= alpha;
  gl_FragColor = vec4(colorRGB, alpha);
}
`

function createVortex(scene: THREE.Scene, material: THREE.RawShaderMaterial) {
  const circlePoints: THREE.Vector3[] = []
  for (let i = 0; i < NUM_POINTS_PER_CIRCLE; i++) {
    const angle = (i / NUM_POINTS_PER_CIRCLE) * Math.PI * 2
    circlePoints.push(new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0))
  }

  const rows: THREE.Points[] = []

  for (let rowId = 0; rowId < NUM_ROWS; rowId++) {
    const geometry = new THREE.BufferGeometry()
    ;(geometry as any).particleCount = NUM_POINTS_PER_CIRCLE

    const position = new Float32Array(NUM_POINTS_PER_CIRCLE * 3)
    const particlePosRow = new Float32Array(NUM_POINTS_PER_CIRCLE * 4)
    const orientation = new Float32Array(NUM_POINTS_PER_CIRCLE * 3)

    for (let i = 0; i < NUM_POINTS_PER_CIRCLE; i++) {
      const p = circlePoints[i]
      position[i * 3] = p.x
      position[i * 3 + 1] = p.y
      position[i * 3 + 2] = p.z

      particlePosRow[i * 4] = p.x
      particlePosRow[i * 4 + 1] = p.y
      particlePosRow[i * 4 + 2] = rowId
      particlePosRow[i * 4 + 3] = i

      orientation[i * 3] = p.x
      orientation[i * 3 + 1] = 0
      orientation[i * 3 + 2] = p.y
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
    geometry.setAttribute('particlePosRow', new THREE.BufferAttribute(particlePosRow, 4))
    geometry.setAttribute('orientation', new THREE.BufferAttribute(orientation, 3))

    const rowMesh = new THREE.Points(geometry, material.clone())
    ;(rowMesh.material as THREE.RawShaderMaterial).uniforms.rowId.value = rowId
    rows.push(rowMesh)
    scene.add(rowMesh)
  }

  return rows
}

export default function VortexGateway() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Prevent duplicate initializations
    if (cleanupRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        aspectRatio: { value: canvas.clientWidth / canvas.clientHeight },
        angle: { value: 0.4 },
        speed: { value: 1.0 },
        color: { value: new THREE.Color(0.9, 0.9, 1.0) },
        rowScale: { value: 0.05 },
        radius: { value: 2.0 },
        focus: { value: 2.0 },
        rowId: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    createVortex(scene, material)

    let prevScrollY = 0
    let animId = 0
    let isDestroyed = false

    const animate = () => {
      if (isDestroyed) return
      animId = requestAnimationFrame(animate)

      const scrollY = window.scrollY
      const scrollVel = (scrollY - prevScrollY) * 0.1
      prevScrollY = scrollY

      const now = performance.now()

      const targetZ = (scrollY * 0.01) - 5.0
      camera.position.z += (targetZ - camera.position.z) * 0.1

      material.uniforms.focus.value = 2.0 + camera.position.z
      material.uniforms.time.value = now * 0.001
      material.uniforms.speed.value += (1.0 + scrollVel - material.uniforms.speed.value) * 0.1

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!canvas || isDestroyed) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      material.uniforms.aspectRatio.value = w / h
    }

    window.addEventListener('resize', handleResize)

    cleanupRef.current = () => {
      isDestroyed = true
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      material.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose()
        }
      })
      cleanupRef.current = null
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
