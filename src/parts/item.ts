import vt from '../glsl/item.vert';
import fg from '../glsl/item.frag';
import { Mesh } from 'three/src/objects/Mesh';
import { Color } from 'three/src/math/Color';
// import { FrontSide, DoubleSide, BackSide } from 'three/src/constants';
// import { SphereGeometry } from 'three/src/core/BufferGeometry';
import { MyObject3D } from "../webgl/myObject3D";
import { Func } from '../core/func';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Util } from '../libs/util';
import { MousePointer } from '../core/mousePointer';

export class Item extends MyObject3D {

  private _id: number;
  private _mesh: Mesh;
  private _isRed: boolean;

  constructor(opt: {geo: any, id: number, total: number, color: Color}) {
    super();

    this._id = opt.id;

    this._isRed = this._id % 8 == 0;

    const radius = (1 / opt.total) * 0.5;
    const range = 0.5
    const center = Util.instance.map(opt.id, -range, range, 0, opt.total - 1);

    const gray = Util.instance.map(opt.id, 0, 1, 0, opt.total - 1);
    const col = this._isRed ? new Color(0xff0000) : new Color(gray, gray, gray);

    this._mesh = new Mesh(
      opt.geo,
      new ShaderMaterial({
        vertexShader:vt,
        fragmentShader:fg,
        transparent:true,
        depthTest:false,
        // side: DoubleSide,
        uniforms:{
          colorA:{value: col},
          colorB:{value: new Color(0xffffff)},
          colorC:{value: new Color(0xffffff)},
          alpha:{value: 1},
          radius:{value: radius * 1},
          center:{value: center},
        }
      })
    );
    this.add(this._mesh);

    this._mesh.visible = this._id % 2 == 0
  }

  protected _update():void {
    super._update();

    if(!this._mesh.visible) return;

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    const speed = 0.75;
    const c = this._c * 0.08 * speed

    const mx = MousePointer.instance.easeNormal.x;
    // const my = MousePointer.instance.easeNormal.y;

    const itA = 0.05;
    const itB = 0.05;

    const s = Math.max(sw, sh) * 0.5;
    const offsetScale = Util.instance.map(Math.sin(c + this._id * itA), 0.5, 1.5, -1, 1)
    // const offsetScale = 1
    this._mesh.scale.set(s * offsetScale, s * offsetScale, s * offsetScale);

    // this._mesh.position.x = Math.sin(this._c * 0.01 * speed + this._id * itB) * this._mesh.scale.y * 0.5 * mx;

    // if(this._isRed) {
    //   this._mesh.position.y = Math.cos(this._c * 0.02 * speed + this._id * itB) * this._mesh.scale.y * 0.25 * mx;
    // }

    this._mesh.rotation.y = Util.instance.radian(Math.sin(c + this._id * itB) * (mx * 90))
  }
}