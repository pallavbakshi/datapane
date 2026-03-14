/* eslint-disable */

// URLs

export const URLS = {
    PARAMS_APP: `${Cypress.env("paramsAppURL")}`,
    NO_PARAMS_APP: `${Cypress.env("noParamsAppURL")}`,
    SCHEDULE: `${Cypress.env("paramsAppURL")}schedules/create/`,
    FILE: `${Cypress.env("fileURL")}`,
    STYLE_REPORT: `${Cypress.env("styleReportURL")}`,
};

export const HTML_HEADER = `<style type="text/css">
:root {
  --dip-accent-color: green;
  --dip-bg-color: black;
  --dip-text-align: right;
  --dip-font-family: monospace;
}
</style>`;

export const HTML_HEADER_LIGHT = `<style type="text/css">
:root {
  --dip-accent-color: red;
  --dip-bg-color: white;
  --dip-text-align: right;
  --dip-font-family: monospace;
}
</style>`;
