import { E as r, y as e, v as o } from "./dimension.helpers-D5lwLPzd.CkLv_Kqh.es.js";
/*!
 * Built by Revolist OU ❤️
 */
function c(t) {
  return o.BACKSPACE === t || o.DELETE === t;
}
function i(t) {
  return o.TAB === t;
}
function u(t) {
  return e.ENTER === t;
}
function y(t) {
  return t.ctrlKey && t.code === "KeyX" || // Ctrl + X on Windows
  t.metaKey && t.code === "KeyX";
}
function a(t) {
  return t.ctrlKey && t.code === "KeyC" || // Ctrl + C on Windows
  t.metaKey && t.code === "KeyC";
}
function n(t) {
  return t.ctrlKey && t.code === "KeyV" || // Ctrl + V on Windows
  t.metaKey && t.code === "KeyV";
}
function K(t) {
  return t.ctrlKey && t.code === "KeyA" || // Ctrl + A on Windows
  t.metaKey && t.code === "KeyA";
}
function f(t) {
  return !!(t != null && t.closest(`.${r}`));
}
function d(t) {
  return typeof t == "function" && typeof t.prototype == "object";
}
export {
  c as a,
  i as b,
  u as c,
  a as d,
  y as e,
  n as f,
  K as g,
  d as h,
  f as i
};
