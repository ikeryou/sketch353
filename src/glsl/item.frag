uniform float alpha;
uniform float radius;
uniform float center;

varying vec3 vPos;
varying vec3 vColor;

void main(void) {
  vec4 dest = vec4(vColor, 1.0);
  dest.a *= step(distance(vPos.y, center), radius);
  gl_FragColor = dest;
}
