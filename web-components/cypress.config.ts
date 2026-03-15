import { defineConfig } from "cypress";

export default defineConfig({
    viewportWidth: 1680,
    viewportHeight: 1050,
    defaultCommandTimeout: 8000,
    includeShadowDom: true,
    video: false,
    env: {
        styleReportURL: "",
    },
    e2e: {
        baseUrl: "http://localhost:8090",
    },
});
