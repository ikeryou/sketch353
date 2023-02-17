uniform float radius;
uniform float center;
uniform vec3 colorA;
uniform vec3 colorB;
uniform vec3 colorC;

varying vec3 vColor;
varying vec3 vPos;

const float PI  = 3.141592653589793;
const float PI2 = PI * 2.;

void main(){
  vPos = position;

  // float l0 = atan(position.x, position.z) / PI;
  // float l1 = fract(atan(position.x, position.z) / PI2 + 1.0);

  // float d = distance(position, vec3(0.0, 0.0, 0.0));
  // float c = (d * (abs(position.y)) + 1.0) * 0.5;

  vColor = colorA;
  // vColor = mix(colorC, vColor, l1);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
