var z = Object.defineProperty;
var D = (i, e, _) => e in i ? z(i, e, { enumerable: !0, configurable: !0, writable: !0, value: _ }) : i[e] = _;
var o = (i, e, _) => D(i, typeof e != "symbol" ? e + "" : e, _);
import { m as L, c as C, a as O } from "./Bokeh.DokG02HM.es.js";
import { AnnularWedgeGL as tt } from "./annular_wedge.BG7IMTr4.es.js";
import { AnnulusGL as it } from "./annulus.DTr65E9X.es.js";
import { B as _t } from "./base_line.C1h3r5iy.es.js";
import { B as rt } from "./base_marker.CtSsUvtm.es.js";
import { CircleGL as st } from "./circle.D3n4R2If.es.js";
import { HexTileGL as ct } from "./hex_tile.D0O0VwTr.es.js";
import { ImageGL as dt } from "./image.LCBQTS26.es.js";
import { LineGL as vt } from "./line_gl.B39THbxD.es.js";
import { LRTBGL as gt } from "./lrtb.D1zMqQMC.es.js";
import { MultiLineGL as mt } from "./multi_line.DN-D21WK.es.js";
import { MultiMarkerGL as bt } from "./multi_marker.F-YdddJN.es.js";
import { NgonGL as St } from "./ngon.CA3xvh-q.es.js";
import { RectGL as Et } from "./rect.QhoFfHiR.es.js";
import { S as Ut } from "./single_line.w5FsUEOv.es.js";
import { S as At } from "./single_marker.5fFBTLFr.es.js";
import { StepGL as Tt } from "./step.f6NJv4GZ.es.js";
import { WedgeGL as Dt } from "./wedge.CjeBpql5.es.js";
function I(i, e) {
  let _, a;
  i > e ? (_ = i, a = e) : (_ = e, a = i);
  let n = _ % a;
  for (; n != 0; )
    _ = a, a = n, n = _ % a;
  return a;
}
function S(i) {
  let e = i[0];
  for (let _ = 1; _ < i.length; _++)
    e = I(e, i[_]);
  return e;
}
function P(i) {
  return (i & i - 1) == 0 && i != 0;
}
class w {
  constructor(e) {
    o(this, "_regl");
    // Needed to create textures.
    o(this, "_map");
    this._regl = e, this._map = /* @__PURE__ */ new Map();
  }
  _create_texture(e) {
    const _ = e.length;
    let a = 0;
    const n = [];
    let t = 0, c = 0;
    for (let l = 0; l < _; l++)
      a += e[l], n.push(e[l] + e[(l + 1) % _]), l % 2 == 0 ? c = Math.max(c, e[l]) : t = Math.min(t, -e[l]);
    t *= 0.5, c *= 0.5;
    const d = S(n), s = [0];
    for (let l = 0; l < _; l++)
      s.push(s[l] + e[l]);
    const r = 2 * a / d, m = P(r), u = m ? r : 128, h = 0.5 * d * r / u;
    let f;
    if (m) {
      if (f = 0.5 * e[0], h < f) {
        const l = Math.floor(f / h);
        f -= l * h;
      }
    } else
      f = 0;
    const A = f - 0.5 * h, x = new Uint8Array(u);
    let v = 0;
    for (let l = 0; l < u; l++) {
      const b = f + l * h;
      b > s[v + 1] && v++;
      const y = e[v], T = s[v] + 0.5 * y;
      let g = 0.5 * y - Math.abs(b - T);
      v % 2 == 1 && (g = -g), x[l] = Math.round(255 * (g - t) / (c - t));
    }
    const N = this._regl.texture({
      shape: [u, 1, 1],
      data: x,
      wrapS: "repeat",
      format: "alpha",
      type: "uint8",
      mag: "linear",
      min: "linear"
    });
    return [[a, A, t, c], N];
  }
  _get_key(e) {
    return e.join(",");
  }
  _get_or_create(e) {
    const _ = this._get_key(e);
    let a = this._map.get(_);
    if (a == null) {
      const n = S(e);
      if (n > 1) {
        e = L(e, (s) => s / n), a = this._get_or_create(e);
        const [t, c, d] = a;
        a = [t, c, n], this._map.set(_, a);
      } else {
        const [t, c] = this._create_texture(e);
        a = [t, c, n], this._map.set(_, a);
      }
    }
    return a;
  }
  get(e) {
    return e.length % 2 == 1 && (e = C([e, e])), this._get_or_create(e);
  }
}
o(w, "__name__", "DashCache");
const G = `
precision mediump float;attribute vec2 a_position;varying vec2 v_tex_coords;void main(){gl_Position=vec4(a_position.x,a_position.y,0.,1.);v_tex_coords=0.5*(1.+a_position);}`, Q = `
precision mediump float;uniform sampler2D u_framebuffer_tex;varying vec2 v_tex_coords;void main(){gl_FragColor=texture2D(u_framebuffer_tex,v_tex_coords);}`, k = `
precision mediump float;attribute vec2 a_position;attribute vec4 a_bounds;uniform vec2 u_canvas_size;varying vec2 v_tex_coords;void main(){v_tex_coords=vec2(a_position.x<0.?0.:1.,a_position.y<0.?0.:1.);float x=a_position.x<0.?a_bounds[0]:a_bounds[2];float y=a_position.y<0.?a_bounds[1]:a_bounds[3];vec2 xy=vec2(x,y);vec2 pos=xy+0.5;pos/=u_canvas_size;gl_Position=vec4(2.*pos.x-1.,1.-2.*pos.y,0.,1.);}`, M = `
precision mediump float;uniform sampler2D u_tex;uniform float u_global_alpha;varying vec2 v_tex_coords;void main(){vec4 color=texture2D(u_tex,v_tex_coords);float alpha=color.a*u_global_alpha;gl_FragColor=vec4(color.rgb*alpha,alpha);}`, E = `
precision mediump float;const int butt_cap=0;const int round_cap=1;const int square_cap=2;const int miter_join=0;const int round_join=1;const int bevel_join=2;attribute vec2 a_position;attribute vec2 a_point_prev;attribute vec2 a_point_start;attribute vec2 a_point_end;attribute vec2 a_point_next;attribute float a_show_prev;attribute float a_show_curr;attribute float a_show_next;attribute float a_linewidth;attribute vec4 a_line_color;attribute float a_line_cap;attribute float a_line_join;
#ifdef DASHED
attribute float a_length_so_far;attribute vec4 a_dash_tex_info;attribute float a_dash_scale;attribute float a_dash_offset;
#endif
uniform vec2 u_canvas_size;uniform float u_antialias;uniform float u_miter_limit;varying float v_linewidth;varying vec4 v_line_color;varying float v_line_cap;varying float v_line_join;varying float v_segment_length;varying vec2 v_coords;varying float v_flags;varying float v_cos_turn_angle_start;varying float v_cos_turn_angle_end;
#ifdef DASHED
varying float v_length_so_far;varying vec4 v_dash_tex_info;varying float v_dash_scale;varying float v_dash_offset;
#endif
#define SMALL  1e-6
float cross_z(in vec2 v0,in vec2 v1){return v0.x*v1.y-v0.y*v1.x;}vec2 right_vector(in vec2 v){return vec2(v.y,-v.x);}float calc_turn_angle(in bool has_cap,in vec2 segment_right,in vec2 other_right,out vec2 point_right,out float sin_turn_angle){float cos_turn_angle;vec2 diff=segment_right+other_right;float len=length(diff);if(has_cap||len<SMALL){point_right=segment_right;cos_turn_angle=-1.;sin_turn_angle=0.;}else{point_right=diff/len;cos_turn_angle=dot(segment_right,other_right);sin_turn_angle=cross_z(segment_right,other_right);}return cos_turn_angle;}bool miter_too_large(in int join_type,in float cos_turn_angle){float cos_half_angle_sqr=0.5*(1.+cos_turn_angle);return join_type==miter_join&&cos_half_angle_sqr<1./(u_miter_limit*u_miter_limit);}vec2 normalize_check_len(in vec2 vec,in float len){if(abs(len)<SMALL)return vec2(1.,0.);else return vec/len;}vec2 normalize_check(in vec2 vec){return normalize_check_len(vec,length(vec));}void main(){if(a_show_curr<0.5){gl_Position=vec4(-2.,-2.,0.,1.);return;}int join_type=int(a_line_join+0.5);int cap_type=int(a_line_cap+0.5);v_linewidth=a_linewidth;v_line_color=a_line_color;if(v_linewidth<1.){v_line_color.a*=v_linewidth;v_linewidth=1.;}float halfwidth=0.5*(v_linewidth+u_antialias);vec2 segment_along=a_point_end-a_point_start;v_segment_length=length(a_point_end-a_point_start);segment_along=normalize_check_len(segment_along,v_segment_length);vec2 segment_right=right_vector(segment_along);vec2 xy;vec2 prev_along=normalize_check(a_point_start-a_point_prev);vec2 prev_right=right_vector(prev_along);vec2 next_right=right_vector(normalize_check(a_point_next-a_point_end));v_coords.y=a_position.y*halfwidth;bool has_start_cap=a_show_prev<0.5;bool has_end_cap=a_show_next<0.5;vec2 point_right_start,point_right_end;float sin_turn_angle_start,sin_turn_angle_end;v_cos_turn_angle_start=calc_turn_angle(has_start_cap,segment_right,prev_right,point_right_start,sin_turn_angle_start);v_cos_turn_angle_end=calc_turn_angle(has_end_cap,segment_right,next_right,point_right_end,sin_turn_angle_end);float sign_turn_right_start=sin_turn_angle_start>=0.?1.:-1.;bool miter_too_large_start=!has_start_cap&&miter_too_large(join_type,v_cos_turn_angle_start);bool miter_too_large_end=!has_end_cap&&miter_too_large(join_type,v_cos_turn_angle_end);float sign_at_start=-sign(a_position.x);vec2 point=sign_at_start>0.?a_point_start:a_point_end;if((has_start_cap&&sign_at_start>0.)||(has_end_cap&&sign_at_start<0.)){xy=point-segment_right*(halfwidth*a_position.y);if(cap_type==butt_cap)xy-=sign_at_start*0.5*u_antialias*segment_along;else xy-=sign_at_start*halfwidth*segment_along;}else if(sign_at_start>0.){vec2 inside_point=a_point_start+segment_right*(sign_turn_right_start*halfwidth);vec2 prev_outside_point=a_point_start-prev_right*(sign_turn_right_start*halfwidth);if(join_type==round_join||join_type==bevel_join||miter_too_large_start){if(v_cos_turn_angle_start<=0.){xy=a_point_start-segment_right*(halfwidth*a_position.y)-halfwidth*segment_along;}else{if(a_position.x<-1.5){xy=prev_outside_point;v_coords.y=-dot(xy-a_point_start,segment_right);}else if(a_position.y*sign_turn_right_start>0.){float d=halfwidth*abs(sin_turn_angle_start);xy=a_point_start-segment_right*(halfwidth*a_position.y)-d*segment_along;}else{xy=inside_point;}}}else{if(a_position.x<-1.5){xy=prev_outside_point;v_coords.y=-dot(xy-a_point_start,segment_right);}else if(a_position.y*sign_turn_right_start>0.){float tan_half_turn_angle=(1.-v_cos_turn_angle_start)/sin_turn_angle_start;float d=sign_turn_right_start*halfwidth*tan_half_turn_angle;xy=a_point_start-segment_right*(halfwidth*a_position.y)-d*segment_along;}else{xy=inside_point;}}}else{xy=point-segment_right*(halfwidth*a_position.y);}vec2 pos=xy+0.5;pos/=u_canvas_size;gl_Position=vec4(2.*pos.x-1.,1.-2.*pos.y,0.,1.);bool turn_right_start=sin_turn_angle_start>=0.;bool turn_right_end=sin_turn_angle_end>=0.;v_coords.x=dot(xy-a_point_start,segment_along);v_flags=float(int(has_start_cap)+2*int(has_end_cap)+4*int(miter_too_large_start)+8*int(miter_too_large_end)+16*int(turn_right_start)+32*int(turn_right_end));v_line_cap=a_line_cap;v_line_join=a_line_join;
#ifdef DASHED
v_length_so_far=a_length_so_far;v_dash_tex_info=a_dash_tex_info;v_dash_scale=a_dash_scale;v_dash_offset=a_dash_offset;
#endif
}`, R = `
precision mediump float;const int butt_cap=0;const int round_cap=1;const int square_cap=2;const int miter_join=0;const int round_join=1;const int bevel_join=2;uniform float u_antialias;
#ifdef DASHED
uniform sampler2D u_dash_tex;
#endif
varying float v_linewidth;varying vec4 v_line_color;varying float v_line_cap;varying float v_line_join;varying float v_segment_length;varying vec2 v_coords;varying float v_flags;varying float v_cos_turn_angle_start;varying float v_cos_turn_angle_end;
#ifdef DASHED
varying float v_length_so_far;varying vec4 v_dash_tex_info;varying float v_dash_scale;varying float v_dash_offset;
#endif
#define ONE_MINUS_SMALL  (1.0 - 1e-6)
float cross_z(in vec2 v0,in vec2 v1){return v0.x*v1.y-v0.y*v1.x;}vec2 right_vector(in vec2 v){return vec2(v.y,-v.x);}float bevel_join_distance(in vec2 coords,in vec2 other_right,in float sign_turn_right){float hw=0.5*v_linewidth;if(other_right.y>=ONE_MINUS_SMALL){return abs(hw-v_coords.x);}else{const vec2 segment_right=vec2(0.,-1.);vec2 corner_right=normalize(other_right+segment_right);vec2 outside_point=(-hw*sign_turn_right)*segment_right;return hw+sign_turn_right*dot(outside_point-coords,corner_right);}}float cap(in int cap_type,in float x,in float y){if(cap_type==butt_cap)return max(0.5*v_linewidth-x,abs(y));else if(cap_type==square_cap)return max(-x,abs(y));else return distance(vec2(min(x,0.),y),vec2(0.,0.));}float distance_to_alpha(in float dist){return 1.-smoothstep(0.5*(v_linewidth-u_antialias),0.5*(v_linewidth+u_antialias),dist);}vec2 turn_angle_to_right_vector(in float cos_turn_angle,in float sign_turn_right){float sin_turn_angle=sign_turn_right*sqrt(1.-cos_turn_angle*cos_turn_angle);return vec2(sin_turn_angle,-cos_turn_angle);}
#ifdef DASHED
float dash_distance(in float x){float tex_length=v_dash_tex_info.x;float tex_offset=v_dash_tex_info.y;float tex_dist_min=v_dash_tex_info.z;float tex_dist_max=v_dash_tex_info.w;x+=v_length_so_far-v_dash_scale*tex_offset+v_dash_offset;float dist=texture2D(u_dash_tex,vec2(x/(tex_length*v_dash_scale),0.)).a;dist=tex_dist_min+dist*(tex_dist_max-tex_dist_min);return v_dash_scale*dist;}mat2 rotation_matrix(in vec2 other_right){float sin_angle=other_right.x;float cos_angle=-other_right.y;return mat2(cos_angle,-sin_angle,sin_angle,cos_angle);}
#endif
void main(){int join_type=int(v_line_join+0.5);int cap_type=int(v_line_cap+0.5);float halfwidth=0.5*(v_linewidth+u_antialias);float half_antialias=0.5*u_antialias;int flags=int(v_flags+0.5);bool turn_right_end=(flags/32>0);float sign_turn_right_end=turn_right_end?1.:-1.;flags-=32*int(turn_right_end);bool turn_right_start=(flags/16>0);float sign_turn_right_start=turn_right_start?1.:-1.;flags-=16*int(turn_right_start);bool miter_too_large_end=(flags/8>0);flags-=8*int(miter_too_large_end);bool miter_too_large_start=(flags/4>0);flags-=4*int(miter_too_large_start);bool has_end_cap=(flags/2>0);flags-=2*int(has_end_cap);bool has_start_cap=flags>0;vec2 prev_right=turn_angle_to_right_vector(v_cos_turn_angle_start,sign_turn_right_start);vec2 next_right=turn_angle_to_right_vector(v_cos_turn_angle_end,sign_turn_right_end);float dist=v_coords.y;vec2 end_coords=vec2(v_segment_length,0.)-v_coords;if(v_coords.x<=half_antialias){if(has_start_cap)dist=cap(cap_type,v_coords.x,v_coords.y);else if(join_type==round_join){if(v_coords.x<=0.)dist=distance(v_coords,vec2(0.,0.));}else{if(join_type==bevel_join||miter_too_large_start)dist=max(abs(dist),bevel_join_distance(v_coords,prev_right,sign_turn_right_start));float prev_sideways_dist=-sign_turn_right_start*dot(v_coords,prev_right);dist=max(abs(dist),prev_sideways_dist);}}if(end_coords.x<=half_antialias){if(has_end_cap){dist=max(abs(dist),cap(cap_type,end_coords.x,v_coords.y));}else if(join_type==bevel_join||miter_too_large_end){dist=max(abs(dist),bevel_join_distance(end_coords,next_right,sign_turn_right_end));}}float alpha=distance_to_alpha(abs(dist));
#ifdef DASHED
if(v_dash_tex_info.x>=0.){dist=dash_distance(v_coords.x);vec2 prev_coords=rotation_matrix(prev_right)*v_coords;float start_dash_distance=dash_distance(0.);if(!has_start_cap&&cap_type==butt_cap){bool outer_solid=start_dash_distance>=0.&&v_coords.x<half_antialias&&prev_coords.x>-half_antialias;if(outer_solid){float half_aa_dist=dash_distance(half_antialias);if(half_aa_dist>0.)dist=half_aa_dist-v_coords.x+half_antialias;else dist=start_dash_distance-v_coords.x;half_aa_dist=dash_distance(-half_antialias);if(half_aa_dist>0.)dist=min(dist,half_aa_dist+prev_coords.x+half_antialias);else dist=min(dist,start_dash_distance+prev_coords.x);}else{if(v_coords.x<half_antialias)dist=min(0.,dash_distance(half_antialias)-half_antialias)+v_coords.x;if(prev_coords.x>-half_antialias&&prev_coords.x<=half_antialias){float prev_dist=min(0.,dash_distance(-half_antialias)-half_antialias)-prev_coords.x;prev_dist=min(prev_dist,0.5*v_linewidth-abs(prev_coords.y));dist=max(dist,prev_dist);}}}if(!has_end_cap&&cap_type==butt_cap&&end_coords.x<half_antialias){float end_dash_distance=dash_distance(v_segment_length);bool increasing=end_dash_distance>=0.&&sign_turn_right_end*v_coords.y<0.;if(!increasing){float half_aa_dist=dash_distance(v_segment_length-half_antialias);dist=min(0.,half_aa_dist-half_antialias)+end_coords.x;}}dist=cap(cap_type,dist,v_coords.y);float dash_alpha=distance_to_alpha(dist);alpha=min(alpha,dash_alpha);}
#endif
alpha=v_line_color.a*alpha;gl_FragColor=vec4(v_line_color.rgb*alpha,alpha);}`, H = `
precision mediump float;attribute vec2 a_position;attribute vec2 a_center;attribute float a_width;attribute float a_height;attribute float a_angle;attribute float a_aux;attribute float a_linewidth;attribute vec4 a_line_color;attribute vec4 a_fill_color;attribute float a_line_cap;attribute float a_line_join;attribute float a_show;
#ifdef HATCH
attribute float a_hatch_pattern;attribute float a_hatch_scale;attribute float a_hatch_weight;attribute vec4 a_hatch_color;
#endif
uniform vec2 u_canvas_size;uniform float u_antialias;
#ifdef MULTI_MARKER
uniform float u_size_hint;
#endif
#ifdef USE_ROUND_RECT
uniform vec4 u_border_radius;varying vec4 v_border_radius;
#endif
#ifdef USE_ANNULAR_WEDGE
varying float v_outer_radius;varying float v_inner_radius;varying float v_start_angle;varying float v_end_angle;
#endif
#ifdef USE_ANNULUS
varying float v_outer_radius;varying float v_inner_radius;
#endif
#ifdef USE_WEDGE
varying float v_radius;varying float v_start_angle;varying float v_end_angle;
#endif
#if defined(USE_CIRCLE) || defined(USE_NGON)
varying float v_radius;
#endif
#ifdef USE_NGON
varying float v_n;
#endif
varying float v_linewidth;varying vec2 v_size;varying vec4 v_line_color;varying vec4 v_fill_color;varying float v_line_cap;varying float v_line_join;varying vec2 v_coords;
#ifdef HATCH
varying float v_hatch_pattern;varying float v_hatch_scale;varying float v_hatch_weight;varying vec4 v_hatch_color;varying vec2 v_hatch_coords;
#endif
#ifdef MULTI_MARKER
#define M_DASH          1
#define M_DOT           2
#define M_DIAMOND       3
#define M_HEX           4
#define M_SQUARE_PIN    5
#define M_TRIANGLE      6
#define M_TRIANGLE_PIN  7
#define M_STAR          8
vec2 enclosing_size(){int size_hint=int(u_size_hint+0.5);if(size_hint==M_DASH)return vec2(v_size.x+v_linewidth+u_antialias,v_linewidth+u_antialias);else if(size_hint==M_DOT)return 0.25*v_size+u_antialias;else if(size_hint==M_DIAMOND)return vec2(v_size.x*(2./3.)+(v_linewidth+u_antialias)*1.20185,v_size.y+(v_linewidth+u_antialias)*1.80278);else if(size_hint==M_HEX)return v_size+(v_linewidth+u_antialias)*vec2(2./sqrt(3.),1.);else if(size_hint==M_SQUARE_PIN)return v_size+(v_linewidth+u_antialias)*3.1;else if(size_hint==M_TRIANGLE)return vec2(v_size.x+(v_linewidth+u_antialias)*sqrt(3.),v_size.y*(2./sqrt(3.))+(v_linewidth+u_antialias)*2.);else if(size_hint==M_TRIANGLE_PIN)return v_size+(v_linewidth+u_antialias)*vec2(4.8,6.);else if(size_hint==M_STAR)return vec2(v_size.x*0.95106+(v_linewidth+u_antialias)*3.,v_size.y+(v_linewidth+u_antialias)*3.2);else return v_size+v_linewidth+u_antialias;}
#else
vec2 enclosing_size(){return v_size+v_linewidth+u_antialias;}
#endif
void main(){
#if defined(USE_RECT) || defined(USE_ROUND_RECT) || defined(USE_HEX_TILE)
v_size=vec2(a_width,a_height);
#elif defined(USE_ANNULUS) || defined(USE_ANNULAR_WEDGE) || defined(USE_WEDGE)
v_size=vec2(2.*a_width,2.*a_width);
#else
v_size=vec2(a_width,a_width);
#endif
#ifdef USE_NGON
v_n=a_aux;
#endif
if(a_show<0.5||v_size.x<0.||v_size.y<0.||(v_size.x==0.&&v_size.y==0.)
#ifdef USE_NGON
||v_n<3.
#endif
){gl_Position=vec4(-2.,-2.,0.,1.);return;}
#ifdef USE_ANNULAR_WEDGE
v_outer_radius=a_width;v_inner_radius=a_height;v_start_angle=a_angle;v_end_angle=a_aux;
#endif
#ifdef USE_ANNULUS
v_outer_radius=a_width;v_inner_radius=a_height;
#endif
#ifdef USE_WEDGE
v_radius=a_width;v_start_angle=a_angle;v_end_angle=a_aux;
#endif
#if defined(USE_CIRCLE) || defined(USE_NGON)
v_radius=0.5*a_width;
#endif
#ifdef USE_ROUND_RECT
const vec2 unit2=vec2(1.,1.);float scale=min(v_size.x/max(dot(u_border_radius.xy,unit2),dot(u_border_radius.zw,unit2)),v_size.y/max(dot(u_border_radius.yz,unit2),dot(u_border_radius.wx,unit2)));v_border_radius=u_border_radius*min(scale,1.);
#endif
v_linewidth=a_linewidth;v_line_color=a_line_color;v_fill_color=a_fill_color;v_line_cap=a_line_cap;v_line_join=a_line_join;if(v_linewidth<1.){v_line_color.a*=v_linewidth;v_linewidth=1.;}
#ifdef HATCH
v_hatch_pattern=a_hatch_pattern;v_hatch_scale=a_hatch_scale;v_hatch_weight=a_hatch_weight;v_hatch_color=a_hatch_color;
#endif
v_coords=a_position*enclosing_size();
#if defined(USE_CIRCLE) || defined(USE_ANNULUS) || defined(USE_ANNULAR_WEDGE) || defined(USE_WEDGE)
vec2 pos=a_center+v_coords;
#else
float c=cos(-a_angle);float s=sin(-a_angle);mat2 rotation=mat2(c,-s,s,c);vec2 pos=a_center+rotation*v_coords;
#endif
#ifdef HATCH
v_hatch_coords=pos-0.5;
#endif
pos+=0.5;pos/=u_canvas_size;gl_Position=vec4(2.*pos.x-1.,1.-2.*pos.y,0.,1.);}`, q = `
precision mediump float;const float SQRT2=sqrt(2.);const float SQRT3=sqrt(3.);const float PI=3.14159265358979323846;const int butt_cap=0;const int round_cap=1;const int square_cap=2;const int miter_join=0;const int round_join=1;const int bevel_join=2;
#ifdef HATCH
const int hatch_dot=1;const int hatch_ring=2;const int hatch_horizontal_line=3;const int hatch_vertical_line=4;const int hatch_cross=5;const int hatch_horizontal_dash=6;const int hatch_vertical_dash=7;const int hatch_spiral=8;const int hatch_right_diagonal_line=9;const int hatch_left_diagonal_line=10;const int hatch_diagonal_cross=11;const int hatch_right_diagonal_dash=12;const int hatch_left_diagonal_dash=13;const int hatch_horizontal_wave=14;const int hatch_vertical_wave=15;const int hatch_criss_cross=16;
#endif
uniform float u_antialias;varying vec2 v_coords;varying vec2 v_size;
#ifdef USE_ANNULAR_WEDGE
varying float v_outer_radius;varying float v_inner_radius;varying float v_start_angle;varying float v_end_angle;
#endif
#ifdef USE_ANNULUS
varying float v_outer_radius;varying float v_inner_radius;
#endif
#ifdef USE_WEDGE
varying float v_radius;varying float v_start_angle;varying float v_end_angle;
#endif
#if defined(USE_CIRCLE) || defined(USE_NGON)
varying float v_radius;
#endif
#ifdef USE_NGON
varying float v_n;
#endif
#ifdef USE_ROUND_RECT
varying vec4 v_border_radius;
#endif
varying float v_linewidth;varying vec4 v_line_color;varying vec4 v_fill_color;varying float v_line_cap;varying float v_line_join;
#ifdef HATCH
varying float v_hatch_pattern;varying float v_hatch_scale;varying float v_hatch_weight;varying vec4 v_hatch_color;varying vec2 v_hatch_coords;
#endif
#if defined(USE_CIRCLE_DOT) || defined(USE_DIAMOND_DOT) || defined(USE_DOT) || defined(USE_HEX_DOT) || defined(USE_SQUARE_DOT) || defined(USE_STAR_DOT) || defined(USE_TRIANGLE_DOT)
#define APPEND_DOT 
#endif
#if defined(USE_CIRCLE_CROSS) || defined(USE_SQUARE_CROSS)
#define APPEND_CROSS 
#endif
#ifdef USE_DIAMOND_CROSS
#define APPEND_CROSS_2 
#endif
#ifdef USE_CIRCLE_X
#define APPEND_X 
#define APPEND_X_LEN  (0.5*v_size.x)
#endif
#ifdef USE_SQUARE_X
#define APPEND_X 
#define APPEND_X_LEN  (v_size.x/SQRT2)
#endif
#ifdef USE_CIRCLE_Y
#define APPEND_Y 
#endif
#if defined(USE_ASTERISK) || defined(USE_CROSS) || defined(USE_DASH) || defined(USE_DOT) || defined(USE_X) || defined(USE_Y)
#define LINE_ONLY 
#endif
#if defined(LINE_ONLY) || defined(APPEND_CROSS) || defined(APPEND_CROSS_2) || defined(APPEND_X) || defined(APPEND_Y)
float end_cap_distance(in vec2 p,in vec2 end_point,in vec2 unit_direction,in int line_cap){vec2 offset=p-end_point;if(line_cap==butt_cap)return dot(offset,unit_direction)+0.5*v_linewidth;else if(line_cap==square_cap)return dot(offset,unit_direction);else if(line_cap==round_cap&&dot(offset,unit_direction)>0.)return length(offset);else return-v_linewidth-u_antialias;}
#endif
#if !(defined(LINE_ONLY) || defined(USE_SQUARE_PIN) || defined(USE_TRIANGLE_PIN))
float line_join_distance_no_miter(in vec2 p,in vec2 corner,in vec2 unit_normal,in float offset,in int line_join){float dist_outside=dot((p-corner),unit_normal)-offset;if(line_join==bevel_join&&dist_outside>-0.5*u_antialias)return dist_outside+0.5*v_linewidth;else if(dist_outside>0.)return distance(p,corner);else return-v_linewidth-u_antialias;}
#endif
#if defined(USE_SQUARE_PIN) || defined(USE_TRIANGLE_PIN)
float line_join_distance_incl_miter(in vec2 p,in vec2 corner,in vec2 unit_normal,in float offset,in int line_join,vec2 miter_unit_normal){float dist_outside=dot((p-corner),unit_normal)-offset;if(line_join==miter_join&&dist_outside>0.)return dot((p-corner),miter_unit_normal);else if(line_join==bevel_join&&dist_outside>-0.5*u_antialias)return dist_outside+0.5*v_linewidth;else if(dist_outside>0.)return distance(p,corner);else return-v_linewidth-u_antialias;}
#endif
#if defined(APPEND_CROSS) || defined(APPEND_X) || defined(USE_ASTERISK) || defined(USE_CROSS) || defined(USE_X)
float one_cross(in vec2 p,in int line_cap,in float len){p=abs(p);p=(p.y>p.x)?p.yx:p.xy;float dist=p.y;float end_dist=end_cap_distance(p,vec2(len,0.),vec2(1.,0.),line_cap);return max(dist,end_dist);}
#endif
#ifdef APPEND_CROSS_2
float one_cross_2(in vec2 p,in int line_cap,in vec2 lengths){p=abs(p);bool switch_xy=(p.y>p.x);p=switch_xy?p.yx:p.xy;float len=switch_xy?lengths.y:lengths.x;float dist=p.y;float end_dist=end_cap_distance(p,vec2(len,0.),vec2(1.,0.),line_cap);return max(dist,end_dist);}
#endif
#if defined(APPEND_Y) || defined(USE_Y)
float one_y(in vec2 p,in int line_cap,in float len){p=vec2(abs(p.x),-p.y);const float k=6./sqrt(13.);vec2 unit_along=vec2(0.5*k,k/3.);vec2 end_point=vec2(0.5*len*SQRT3,len*SQRT3/3.);float dist=max(abs(dot(p,vec2(-unit_along.y,unit_along.x))),end_cap_distance(p,end_point,unit_along,line_cap));if(p.y<0.){float vert_dist=max(p.x,end_cap_distance(p,vec2(0.,-len),vec2(0.,-1.),line_cap));dist=min(dist,vert_dist);}return dist;}
#endif
#ifdef USE_ASTERISK
float marker_distance(in vec2 p,in int line_cap,in int line_join){vec2 p_diag=vec2((p.x+p.y)/SQRT2,(p.x-p.y)/SQRT2);float len=0.5*v_size.x;return min(one_cross(p,line_cap,len),one_cross(p_diag,line_cap,len));}
#endif
#if defined(USE_ANNULUS) || defined(USE_WEDGE) || defined(USE_ANNULAR_WEDGE)
float merge(in float d1,in float d2){return min(d1,d2);}float intersect(in float d1,in float d2){return max(d1,d2);}float subtract(in float d1,in float d2){return max(d1,-d2);}float circle(in vec2 p,in float radius){return length(p)-radius;}float segment_square(in vec2 p,in vec2 q){vec2 v=p-q*clamp(dot(p,q)/dot(q,q),0.,1.);return dot(v,v);}vec2 xy(in float angle){return vec2(cos(angle),sin(angle));}float cross_z(in vec2 v0,in vec2 v1){return v0.x*v1.y-v0.y*v1.x;}float wedge(in vec2 p,in float r,in float start_angle,in float end_angle){vec2 a=r*xy(start_angle);vec2 b=r*xy(end_angle);float d=sqrt(merge(segment_square(p,a),segment_square(p,b)));float s;if(cross_z(a,b)<0.){s=sign(max(cross_z(a,p),cross_z(p,b)));}else{s=-sign(max(cross_z(p,a),cross_z(b,p)));}return s*d;}float annulus(in vec2 p,in float outer_radius,in float inner_radius){float outer=circle(p,outer_radius);float inner=circle(p,inner_radius);return subtract(outer,inner);}
#endif
#if defined(USE_ANNULUS)
float marker_distance(in vec2 p,in int line_cap,in int line_join){return annulus(p,v_outer_radius,v_inner_radius);}
#endif
#if defined(USE_WEDGE)
float marker_distance(in vec2 p,in int line_cap,in int line_join){return intersect(circle(p,v_radius),wedge(p,v_radius,v_start_angle,v_end_angle));}
#endif
#if defined(USE_ANNULAR_WEDGE)
float marker_distance(in vec2 p,in int line_cap,in int line_join){return intersect(annulus(p,v_outer_radius,v_inner_radius),wedge(p,v_outer_radius,v_start_angle,v_end_angle));}
#endif
#if defined(USE_CIRCLE) || defined(USE_CIRCLE_CROSS) || defined(USE_CIRCLE_DOT) || defined(USE_CIRCLE_X) || defined(USE_CIRCLE_Y)
float marker_distance(in vec2 p,in int line_cap,in int line_join){return length(p)-0.5*v_size.x;}
#endif
#ifdef USE_CROSS
float marker_distance(in vec2 p,in int line_cap,in int line_join){return one_cross(p,line_cap,0.5*v_size.x);}
#endif
#ifdef USE_DASH
float marker_distance(in vec2 p,in int line_cap,in int line_join){p=abs(p);float dist=p.y;float end_dist=end_cap_distance(p,vec2(0.5*v_size.x,0.),vec2(1.,0.),line_cap);return max(dist,end_dist);}
#endif
#if defined(USE_DIAMOND) || defined(USE_DIAMOND_CROSS) || defined(USE_DIAMOND_DOT)
float marker_distance(in vec2 p,in int line_cap,in int line_join){p=abs(p);float r=0.5*v_size.x;const float SQRT13=sqrt(13.);float dist=dot(p,vec2(3.,2.))/SQRT13-2.*r/SQRT13;if(line_join!=miter_join){dist=max(dist,line_join_distance_no_miter(p,vec2(0.,r),vec2(0.,1.),v_linewidth/SQRT13,line_join));dist=max(dist,line_join_distance_no_miter(p,vec2(r*2./3.,0.),vec2(1.,0.),v_linewidth*(1.5/SQRT13),line_join));}return dist;}
#endif
#ifdef USE_DOT
float marker_distance(in vec2 p,in int line_cap,in int line_join){return v_linewidth+u_antialias;}
#endif
#if defined(USE_HEX_TILE) || defined(USE_HEX) || defined(USE_HEX_DOT)
float marker_distance(in vec2 p,in int line_cap,in int line_join){p=abs(p);float rx=v_size.x/2.;float h=v_size.y*(SQRT3/4.);float len_normal=sqrt(h*h+0.25*rx*rx);vec2 unit_normal=vec2(h,0.5*rx)/len_normal;float dist=max(dot(p,unit_normal)-rx*h/len_normal,p.y-h);if(line_join!=miter_join){dist=max(dist,line_join_distance_no_miter(p,vec2(rx,0.),vec2(1.,0.),0.5*v_linewidth*unit_normal.x,line_join));unit_normal=normalize(unit_normal+vec2(0.,1.));dist=max(dist,line_join_distance_no_miter(p,vec2(0.5*rx,h),unit_normal,0.5*v_linewidth*unit_normal.y,line_join));}return dist;}
#endif
#ifdef USE_NGON
float marker_distance(in vec2 p,in int line_cap,in int line_join){float side_angle=2.*PI/v_n;p.y=-p.y;float angle=mod(atan(p.x,p.y),side_angle);angle=min(angle,side_angle-angle);p=length(p)*vec2(sin(angle),cos(angle));float half_angle=0.5*side_angle;float cos_half_angle=cos(half_angle);vec2 unit_normal=vec2(sin(half_angle),cos_half_angle);vec2 corner=vec2(0.,v_size.y/2.);float dist=dot(p-corner,unit_normal);if(line_join!=miter_join){dist=max(dist,line_join_distance_no_miter(p,corner,vec2(0.,1.),0.5*v_linewidth*cos_half_angle,line_join));}return dist;}
#endif
#ifdef USE_PLUS
float marker_distance(in vec2 p,in int line_cap,in int line_join){p=abs(p);p=(p.y>p.x)?p.yx:p.xy;float r=0.5*v_size.x;p=p-vec2(r,0.375*r);float dist=max(p.x,p.y);if(line_join!=miter_join){dist=max(dist,line_join_distance_no_miter(p,vec2(0.,0.),vec2(1./SQRT2,1./SQRT2),v_linewidth/(2.*SQRT2),line_join));dist=min(dist,-line_join_distance_no_miter(p,vec2(-5.*r/8.,0.),vec2(-1./SQRT2,-1./SQRT2),v_linewidth/(2.*SQRT2),line_join));}return dist;}
#endif
#if defined(USE_ROUND_RECT)
float marker_distance(in vec2 p,in int line_cap,in int line_join){vec2 halfsize=v_size/2.;vec2 p2=abs(p)-halfsize;float dist=max(p2.x,p2.y);if(line_join!=miter_join){dist=max(dist,line_join_distance_no_miter(p2,vec2(0.,0.),vec2(1./SQRT2,1./SQRT2),v_linewidth/(2.*SQRT2),line_join));}vec4 border_radius=v_border_radius;vec4 xsign=vec4(-1.,1.,1.,-1.);vec4 ysign=vec4(-1.,-1.,1.,1.);for(int i=0;i<4;i++){float radius=border_radius.x;p2=p*vec2(xsign.x,ysign.x);vec2 offset=p2-halfsize+radius;if(min(radius,min(offset.x,offset.y))>0.){dist=max(dist,length(offset)-radius);}border_radius.xyzw=border_radius.yzwx;xsign.xyzw=xsign.yzwx;ysign.xyzw=ysign.yzwx;}return dist;}
#endif
#if defined(USE_RECT) || defined(USE_SQUARE) || defined(USE_SQUARE_CROSS) || defined(USE_SQUARE_DOT) || defined(USE_SQUARE_X)
float marker_distance(in vec2 p,in int line_cap,in int line_join){vec2 p2=abs(p)-v_size/2.;float dist=max(p2.x,p2.y);if(line_join!=miter_join){dist=max(dist,line_join_distance_no_miter(p2,vec2(0.,0.),vec2(1./SQRT2,1./SQRT2),v_linewidth/(2.*SQRT2),line_join));}return dist;}
#endif
#ifdef USE_SQUARE_PIN
float marker_distance(in vec2 p,in int line_cap,in int line_join){p=abs(p);p=(p.y>p.x)?p.yx:p.xy;float r=0.5*v_size.x;float center_x=r*2.44375;float radius=r*1.75626;float dist=radius-distance(p,vec2(center_x,0.));dist=max(dist,line_join_distance_incl_miter(p,vec2(r,r),vec2(1./SQRT2,1./SQRT2),v_linewidth*0.1124297533493792,line_join,vec2(8./sqrt(89.),-5./sqrt(89.))));return dist;}
#endif
#if defined(USE_STAR) || defined(USE_STAR_DOT)
float marker_distance(in vec2 p,in int line_cap,in int line_join){const float SQRT5=sqrt(5.);const float COS72=0.25*(SQRT5-1.);const float SIN72=sqrt((5.+SQRT5)/8.);float angle=atan(p.x,p.y);angle=mod(angle,0.4*PI)-0.2*PI;p=length(p)*vec2(cos(angle),abs(sin(angle)));float r=0.5*v_size.x;float a=r*sqrt(5.-2.*SQRT5);float dist=dot(p,vec2(COS72,SIN72))-r*COS72;if(line_join!=miter_join){dist=max(dist,line_join_distance_no_miter(p,vec2(r,0.),vec2(1.,0.),v_linewidth*(0.5*COS72),line_join));const float COS36=sqrt(0.5+COS72/2.);const float SIN36=sqrt(0.5-COS72/2.);dist=min(dist,-line_join_distance_no_miter(p,vec2(r-a*SIN72,a*COS72),vec2(-COS36,-SIN36),v_linewidth*(0.5*COS36),line_join));}return dist;}
#endif
#if defined(USE_TRIANGLE) || defined(USE_TRIANGLE_DOT) || defined(USE_INVERTED_TRIANGLE)
float marker_distance(in vec2 p,in int line_cap,in int line_join){float r=0.5*v_size.x;float a=r*SQRT3/3.;
#ifdef USE_INVERTED_TRIANGLE
p=vec2(abs(p.x),-p.y);
#else
p=vec2(abs(p.x),p.y);
#endif
float dist=max(0.5*dot(p,vec2(SQRT3,-1.))-a,p.y-a);if(line_join!=miter_join){dist=max(dist,line_join_distance_no_miter(p,vec2(0.,-(2./SQRT3)*r),vec2(0.,-1.),v_linewidth*0.25,line_join));dist=max(dist,line_join_distance_no_miter(p,vec2(r,a),vec2(SQRT3/2.,0.5),v_linewidth*0.25,line_join));}return dist;}
#endif
#ifdef USE_TRIANGLE_PIN
float marker_distance(in vec2 p,in int line_cap,in int line_join){float angle=atan(p.x,-p.y);angle=mod(angle,PI*2./3.)-PI/3.;p=length(p)*vec2(cos(angle),abs(sin(angle)));const float a=1./SQRT3;const float b=SQRT3/8.;const float c=(a-b)/2.;const float x=(1.-c*c)/(2.*c);const float center_x=x+a;const float radius=x+c;float r=0.5*v_size.x;float dist=r*radius-distance(p,vec2(r*center_x,0.));dist=max(dist,line_join_distance_incl_miter(p,vec2(a*r,r),vec2(0.5,0.5*SQRT3),v_linewidth*0.0881844526878324,line_join,vec2(8.*SQRT3,-5.)/sqrt(217.)));return dist;}
#endif
#ifdef USE_X
float marker_distance(in vec2 p,in int line_cap,in int line_join){p=vec2((p.x+p.y)/SQRT2,(p.x-p.y)/SQRT2);return one_cross(p,line_cap,0.5*v_size.x);}
#endif
#ifdef USE_Y
float marker_distance(in vec2 p,in int line_cap,in int line_join){return one_y(p,line_cap,0.5*v_size.x);}
#endif
float distance_to_fraction(in float dist){return 1.-smoothstep(-0.5*u_antialias,0.5*u_antialias,dist);}float fill_fraction(in float dist){return distance_to_fraction(dist);}float line_fraction(in float dist){return distance_to_fraction(abs(dist)-0.5*v_linewidth);}vec4 fractional_color(in vec4 color,in float fraction){color.a*=fraction;color.rgb*=color.a;return color;}vec4 blend_colors(in vec4 src,in vec4 dest){return(1.-src.a)*dest+src;}
#ifdef APPEND_DOT
float dot_fraction(in vec2 p){float radius=0.125*v_size.x;float dot_distance=max(length(p)-radius,-0.5*u_antialias);return fill_fraction(dot_distance);}
#endif
#ifdef HATCH
float wrap(in float x){return fract(x)-0.5;}vec2 wrap(in vec2 xy){return fract(xy)-0.5;}float hatch_fraction(in vec2 coords,in int hatch_pattern){float scale=v_hatch_scale;coords=coords/scale;float halfwidth=0.5*v_hatch_weight/scale;float dist=u_antialias;if(hatch_pattern==hatch_dot){const float dot_radius=0.25;dist=length(wrap(coords))-dot_radius;}else if(hatch_pattern==hatch_ring){const float ring_radius=0.25;dist=abs(length(wrap(coords))-ring_radius)-halfwidth;}else if(hatch_pattern==hatch_horizontal_line){dist=abs(wrap(coords.y))-halfwidth;}else if(hatch_pattern==hatch_vertical_line){dist=abs(wrap(coords.x))-halfwidth;}else if(hatch_pattern==hatch_cross){dist=min(abs(wrap(coords.x)),abs(wrap(coords.y)))-halfwidth;}else if(hatch_pattern==hatch_horizontal_dash){const float halflength=0.25;dist=max(abs(wrap(coords.y)),abs(wrap(coords.x)+0.25)-halflength)-halfwidth;}else if(hatch_pattern==hatch_vertical_dash){const float halflength=0.25;dist=max(abs(wrap(coords.x)),abs(wrap(coords.y)+0.25)-halflength)-halfwidth;}else if(hatch_pattern==hatch_spiral){vec2 wrap2=wrap(coords);float angle=wrap(atan(wrap2.y,wrap2.x)/(2.*PI));const float dr=PI/15.;float radius=length(wrap2);float frac=fract((radius-dr*angle)/dr);dist=dr*(abs(frac-0.5));dist=min(dist,radius)-halfwidth;}else if(hatch_pattern==hatch_right_diagonal_line){dist=abs(wrap(2.*coords.x+coords.y))/sqrt(5.)-halfwidth;}else if(hatch_pattern==hatch_left_diagonal_line){dist=abs(wrap(2.*coords.x-coords.y))/sqrt(5.)-halfwidth;}else if(hatch_pattern==hatch_diagonal_cross){coords=vec2(coords.x+coords.y+0.5,coords.x-coords.y+0.5);dist=min(abs(wrap(coords.x)),abs(wrap(coords.y)))/SQRT2-halfwidth;}else if(hatch_pattern==hatch_right_diagonal_dash){float across=coords.x+coords.y+0.5;dist=abs(wrap(across))/SQRT2;across=floor(across);float along=wrap(0.5*(coords.x-coords.y+across));const float halflength=0.25;along=abs(along)-halflength;dist=max(dist,along)-halfwidth;}else if(hatch_pattern==hatch_left_diagonal_dash){float across=coords.x-coords.y+0.5;dist=abs(wrap(across))/SQRT2;across=floor(across);float along=wrap(0.5*(coords.x+coords.y+across));const float halflength=0.25;along=abs(along)-halflength;dist=max(dist,along)-halfwidth;}else if(hatch_pattern==hatch_horizontal_wave){float wrapx=wrap(coords.x);float wrapy=wrap(coords.y-0.25+abs(wrapx));dist=abs(wrapy)/SQRT2-halfwidth;}else if(hatch_pattern==hatch_vertical_wave){float wrapy=wrap(coords.y);float wrapx=wrap(coords.x-0.25+abs(wrapy));dist=abs(wrapx)/SQRT2-halfwidth;}else if(hatch_pattern==hatch_criss_cross){float plus=min(abs(wrap(coords.x)),abs(wrap(coords.y)));coords=vec2(coords.x+coords.y+0.5,coords.x-coords.y+0.5);float X=min(abs(wrap(coords.x)),abs(wrap(coords.y)))/SQRT2;dist=min(plus,X)-halfwidth;}return distance_to_fraction(dist*scale);}
#endif
void main(){int line_cap=int(v_line_cap+0.5);int line_join=int(v_line_join+0.5);
#ifdef HATCH
int hatch_pattern=int(v_hatch_pattern+0.5);
#endif
float dist=marker_distance(v_coords,line_cap,line_join);
#ifdef LINE_ONLY
vec4 color=vec4(0.,0.,0.,0.);
#else
float fill_frac=fill_fraction(dist);vec4 color=fractional_color(v_fill_color,fill_frac);
#endif
#if defined(HATCH) && !defined(LINE_ONLY)
if(hatch_pattern>0&&fill_frac>0.){float hatch_frac=hatch_fraction(v_hatch_coords,hatch_pattern);vec4 hatch_color=fractional_color(v_hatch_color,hatch_frac*fill_frac);color=blend_colors(hatch_color,color);}
#endif
float line_frac=line_fraction(dist);
#ifdef APPEND_DOT
line_frac=max(line_frac,dot_fraction(v_coords));
#endif
#ifdef APPEND_CROSS
line_frac=max(line_frac,line_fraction(one_cross(v_coords,line_cap,0.5*v_size.x)));
#endif
#ifdef APPEND_CROSS_2
vec2 lengths=vec2(v_size.x/3.,v_size.x/2.);line_frac=max(line_frac,line_fraction(one_cross_2(v_coords,line_cap,lengths)));
#endif
#ifdef APPEND_X
vec2 p=vec2((v_coords.x+v_coords.y)/SQRT2,(v_coords.x-v_coords.y)/SQRT2);line_frac=max(line_frac,line_fraction(one_cross(p,line_cap,APPEND_X_LEN)));
#endif
#ifdef APPEND_Y
line_frac=max(line_frac,line_fraction(one_y(v_coords,line_cap,0.5*v_size.x)));
#endif
if(line_frac>0.){vec4 line_color=fractional_color(v_line_color,line_frac);color=blend_colors(line_color,color);}gl_FragColor=color;}`;
let p = null;
function V(i) {
  return p == null && (p = new U(i)), p;
}
class U {
  constructor(e) {
    o(this, "_regl");
    o(this, "_regl_available");
    o(this, "_dash_cache");
    // Drawing functions.
    o(this, "_accumulate");
    o(this, "_image");
    o(this, "_solid_line");
    o(this, "_dashed_line");
    o(this, "_marker_no_hatch_map", /* @__PURE__ */ new Map());
    o(this, "_marker_hatch_map", /* @__PURE__ */ new Map());
    // Static Buffers/Elements
    o(this, "_line_geometry");
    o(this, "_line_triangles");
    o(this, "_rect_geometry");
    o(this, "_rect_triangles");
    // WebGL state variables.
    o(this, "_scissor");
    o(this, "_viewport");
    // WebGL framebuffer used to accumulate glyph rendering before single blit to Canvas.
    o(this, "_framebuffer");
    o(this, "_framebuffer_texture");
    try {
      this._regl = O({
        gl: e,
        extensions: [
          "ANGLE_instanced_arrays",
          "EXT_blend_minmax"
        ]
      }), this._regl_available = !0, this._line_geometry = this._regl.buffer({
        usage: "static",
        type: "float",
        data: [[-2, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]]
      }), this._line_triangles = this._regl.elements({
        usage: "static",
        primitive: "triangle fan",
        data: [0, 1, 2, 3, 4]
      }), this._rect_geometry = this._regl.buffer({
        usage: "static",
        type: "float",
        data: [[-1, -1], [1, -1], [1, 1], [-1, 1]]
      }), this._rect_triangles = this._regl.elements({
        usage: "static",
        primitive: "triangle fan",
        data: [0, 1, 2, 3]
      });
    } catch {
      this._regl_available = !1;
    }
  }
  // Create and return ReGL Buffer.
  buffer(e) {
    return this._regl.buffer(e);
  }
  clear(e, _) {
    this._viewport = { x: 0, y: 0, width: e, height: _ }, this._regl.clear({ color: [0, 0, 0, 0] });
  }
  clear_framebuffer(e) {
    this._regl.clear({ color: [0, 0, 0, 0], framebuffer: e });
  }
  get framebuffer_and_texture() {
    const { _regl: e } = this, { _gl: _ } = e, a = {
      height: _.drawingBufferHeight,
      width: _.drawingBufferWidth
    };
    return this._framebuffer_texture == null ? this._framebuffer_texture = e.texture(a) : this._framebuffer_texture(a), this._framebuffer == null && (this._framebuffer = e.framebuffer({
      // Auto-sizes to size of texture.
      color: this._framebuffer_texture,
      depth: !1,
      stencil: !1
    })), [this._framebuffer, this._framebuffer_texture];
  }
  get has_webgl() {
    return this._regl_available;
  }
  get scissor() {
    return this._scissor;
  }
  set_scissor(e, _, a, n) {
    this._scissor = { x: e, y: _, width: a, height: n };
  }
  texture(e) {
    return this._regl.texture(e);
  }
  get viewport() {
    return this._viewport;
  }
  accumulate() {
    return this._accumulate == null && (this._accumulate = X(this._regl, this._rect_geometry, this._rect_triangles)), this._accumulate;
  }
  dashed_line() {
    return this._dashed_line == null && (this._dashed_line = $(this._regl, this._line_geometry, this._line_triangles)), this._dashed_line;
  }
  get_dash(e) {
    return this._dash_cache == null && (this._dash_cache = new w(this._regl)), this._dash_cache.get(e);
  }
  image() {
    return this._image == null && (this._image = W(this._regl, this._rect_geometry, this._rect_triangles)), this._image;
  }
  marker_no_hatch(e) {
    let _ = this._marker_no_hatch_map.get(e);
    return _ == null && (_ = j(this._regl, e), this._marker_no_hatch_map.set(e, _)), _;
  }
  marker_hatch(e) {
    let _ = this._marker_hatch_map.get(e);
    return _ == null && (_ = Y(this._regl, e), this._marker_hatch_map.set(e, _)), _;
  }
  solid_line() {
    return this._solid_line == null && (this._solid_line = B(this._regl, this._line_geometry, this._line_triangles)), this._solid_line;
  }
}
o(U, "__name__", "ReglWrapper");
function X(i, e, _) {
  const a = {
    vert: G,
    frag: Q,
    attributes: {
      a_position: {
        buffer: e,
        divisor: 0
      }
    },
    uniforms: {
      u_framebuffer_tex: i.prop("framebuffer_tex")
    },
    elements: _,
    blend: {
      enable: !0,
      func: {
        srcRGB: "one",
        srcAlpha: "one",
        dstRGB: "one minus src alpha",
        dstAlpha: "one minus src alpha"
      }
    },
    depth: { enable: !1 },
    scissor: {
      enable: !0,
      box: i.prop("scissor")
    },
    viewport: i.prop("viewport")
  };
  return i(a);
}
function W(i, e, _) {
  const a = {
    vert: k,
    frag: M,
    attributes: {
      a_position: {
        buffer: e,
        divisor: 0
      },
      a_bounds(n, t) {
        return t.bounds.to_attribute_config();
      }
    },
    uniforms: {
      u_canvas_size: i.prop("canvas_size"),
      u_tex: i.prop("tex"),
      u_global_alpha: i.prop("global_alpha")
    },
    elements: _,
    blend: {
      enable: !0,
      func: {
        srcRGB: "one",
        srcAlpha: "one",
        dstRGB: "one minus src alpha",
        dstAlpha: "one minus src alpha"
      }
    },
    depth: { enable: !1 },
    scissor: {
      enable: !0,
      box: i.prop("scissor")
    },
    viewport: i.prop("viewport")
  };
  return i(a);
}
function B(i, e, _) {
  const a = {
    vert: E,
    frag: R,
    attributes: {
      a_position: {
        buffer: e,
        divisor: 0
      },
      a_point_prev(n, t) {
        return t.points.to_attribute_config(t.point_offset);
      },
      a_point_start(n, t) {
        return t.points.to_attribute_config(t.point_offset + 2);
      },
      a_point_end(n, t) {
        return t.points.to_attribute_config(t.point_offset + 4);
      },
      a_point_next(n, t) {
        return t.points.to_attribute_config(t.point_offset + 6);
      },
      a_show_prev(n, t) {
        return t.show.to_attribute_config(t.point_offset / 2 - t.line_offset);
      },
      a_show_curr(n, t) {
        return t.show.to_attribute_config(t.point_offset / 2 - t.line_offset + 1);
      },
      a_show_next(n, t) {
        return t.show.to_attribute_config(t.point_offset / 2 - t.line_offset + 2);
      },
      a_linewidth(n, t) {
        return t.linewidth.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      },
      a_line_color(n, t) {
        return t.line_color.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      },
      a_line_cap(n, t) {
        return t.line_cap.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      },
      a_line_join(n, t) {
        return t.line_join.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      }
    },
    uniforms: {
      u_canvas_size: i.prop("canvas_size"),
      u_antialias: i.prop("antialias"),
      u_miter_limit: i.prop("miter_limit")
    },
    elements: _,
    instances: i.prop("nsegments"),
    blend: {
      enable: !0,
      equation: "max",
      func: {
        srcRGB: 1,
        srcAlpha: 1,
        dstRGB: 1,
        dstAlpha: 1
      }
    },
    depth: { enable: !1 },
    framebuffer: i.prop("framebuffer"),
    scissor: {
      enable: !0,
      box: i.prop("scissor")
    },
    viewport: i.prop("viewport")
  };
  return i(a);
}
function $(i, e, _) {
  const a = {
    vert: `#define DASHED
${E}
`,
    frag: `#define DASHED
${R}
`,
    attributes: {
      a_position: {
        buffer: e,
        divisor: 0
      },
      a_point_prev(n, t) {
        return t.points.to_attribute_config(t.point_offset);
      },
      a_point_start(n, t) {
        return t.points.to_attribute_config(t.point_offset + 2);
      },
      a_point_end(n, t) {
        return t.points.to_attribute_config(t.point_offset + 4);
      },
      a_point_next(n, t) {
        return t.points.to_attribute_config(t.point_offset + 6);
      },
      a_show_prev(n, t) {
        return t.show.to_attribute_config(t.point_offset / 2 - t.line_offset);
      },
      a_show_curr(n, t) {
        return t.show.to_attribute_config(t.point_offset / 2 - t.line_offset + 1);
      },
      a_show_next(n, t) {
        return t.show.to_attribute_config(t.point_offset / 2 - t.line_offset + 2);
      },
      a_linewidth(n, t) {
        return t.linewidth.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      },
      a_line_color(n, t) {
        return t.line_color.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      },
      a_line_cap(n, t) {
        return t.line_cap.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      },
      a_line_join(n, t) {
        return t.line_join.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      },
      a_length_so_far(n, t) {
        return t.length_so_far.to_attribute_config(t.point_offset / 2 - 3 * t.line_offset);
      },
      a_dash_tex_info(n, t) {
        return t.dash_tex_info.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      },
      a_dash_scale(n, t) {
        return t.dash_scale.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      },
      a_dash_offset(n, t) {
        return t.dash_offset.to_attribute_config_nested(t.line_offset, t.nsegments + 3);
      }
    },
    uniforms: {
      u_canvas_size: i.prop("canvas_size"),
      u_antialias: i.prop("antialias"),
      u_miter_limit: i.prop("miter_limit"),
      u_dash_tex: i.prop("dash_tex")
    },
    elements: _,
    instances: i.prop("nsegments"),
    blend: {
      enable: !0,
      equation: "max",
      func: {
        srcRGB: 1,
        srcAlpha: 1,
        dstRGB: 1,
        dstAlpha: 1
      }
    },
    depth: { enable: !1 },
    framebuffer: i.prop("framebuffer"),
    scissor: {
      enable: !0,
      box: i.prop("scissor")
    },
    viewport: i.prop("viewport")
  };
  return i(a);
}
function j(i, e, _ = [], a = [], n) {
  const t = _.map((s) => `#define ${s}`).join(`
`), c = a.map((s) => `#define ${s}`).join(`
`), d = {
    vert: `${t}
#define MULTI_MARKER
#define USE_${e.toUpperCase()}
${H}
`,
    frag: `${c}
#define USE_${e.toUpperCase()}
${q}
`,
    attributes: {
      a_position: {
        buffer: i.buffer([[-0.5, -0.5], [-0.5, 0.5], [0.5, 0.5], [0.5, -0.5]]),
        divisor: 0
      },
      a_center(s, r) {
        return r.center.to_attribute_config(0, r.nmarkers);
      },
      a_width(s, r) {
        return r.width.to_attribute_config(0, r.nmarkers);
      },
      a_height(s, r) {
        return r.height.to_attribute_config(0, r.nmarkers);
      },
      a_angle(s, r) {
        return r.angle.to_attribute_config(0, r.nmarkers);
      },
      a_aux(s, r) {
        return r.aux.to_attribute_config(0, r.nmarkers);
      },
      a_linewidth(s, r) {
        return r.linewidth.to_attribute_config(0, r.nmarkers);
      },
      a_line_color(s, r) {
        return r.line_color.to_attribute_config(0, r.nmarkers);
      },
      a_fill_color(s, r) {
        return r.fill_color.to_attribute_config(0, r.nmarkers);
      },
      a_line_cap(s, r) {
        return r.line_cap.to_attribute_config(0, r.nmarkers);
      },
      a_line_join(s, r) {
        return r.line_join.to_attribute_config(0, r.nmarkers);
      },
      a_show(s, r) {
        return r.show.to_attribute_config(0, r.nmarkers);
      },
      ...n
    },
    uniforms: {
      u_canvas_size: i.prop("canvas_size"),
      u_antialias: i.prop("antialias"),
      u_size_hint: i.prop("size_hint"),
      u_border_radius: i.prop("border_radius")
    },
    count: 4,
    primitive: "triangle fan",
    instances: i.prop("nmarkers"),
    blend: {
      enable: !0,
      func: {
        srcRGB: "one",
        srcAlpha: "one",
        dstRGB: "one minus src alpha",
        dstAlpha: "one minus src alpha"
      }
    },
    depth: { enable: !1 },
    scissor: {
      enable: !0,
      box: i.prop("scissor")
    },
    viewport: i.prop("viewport")
  };
  return i(d);
}
function Y(i, e) {
  return j(i, e, ["HATCH"], ["HATCH"], {
    a_hatch_pattern(a, n) {
      return n.hatch_pattern.to_attribute_config(0, n.nmarkers);
    },
    a_hatch_scale(a, n) {
      return n.hatch_scale.to_attribute_config(0, n.nmarkers);
    },
    a_hatch_weight(a, n) {
      return n.hatch_weight.to_attribute_config(0, n.nmarkers);
    },
    a_hatch_color(a, n) {
      return n.hatch_color.to_attribute_config(0, n.nmarkers);
    }
  });
}
export {
  tt as AnnularWedgeGL,
  it as AnnulusGL,
  _t as BaseLineGL,
  rt as BaseMarkerGL,
  st as CircleGL,
  ct as HexTileGL,
  dt as ImageGL,
  gt as LRTBGL,
  vt as LineGL,
  mt as MultiLineGL,
  bt as MultiMarkerGL,
  St as NgonGL,
  Et as RectGL,
  Ut as SingleLineGL,
  At as SingleMarkerGL,
  Tt as StepGL,
  Dt as WedgeGL,
  V as get_regl
};
