import { defineComponent as m, openBlock as a, createElementBlock as c, Fragment as i, createElementVNode as n } from "../vue.esm-browser.prod.js";
import f from "https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.mjs";
const p = /* @__PURE__ */ m({
  __name: "Formula",
  props: {
    content: {}
  },
  setup(t) {
    const o = t, l = (e) => {
      try {
        f.render(o.content, e);
      } catch (r) {
        console.error(`Error rendering formula: ${r}`);
      }
    }, s = (e) => {
      e && l(e);
    };
    return (e, r) => (a(), c(i, null, [
      r[0] || (r[0] = n("link", {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css",
        integrity: "sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC",
        crossorigin: "anonymous"
      }, null, -1)),
      n("div", {
        "data-cy": "block-formula",
        class: "w-full overflow-y-hidden bg-white flex justify-center",
        ref: s
      })
    ], 64));
  }
});
export {
  p as default
};
