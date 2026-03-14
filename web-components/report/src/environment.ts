/* eslint no-undef: "error" */

const getHostName = (): string | null => {
    return window.dipLocal ? null : window.location.origin.concat("/");
};

const env: any = {};
env.url = getHostName();
export default env;
