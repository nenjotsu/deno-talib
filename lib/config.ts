let config:any = {};
export function setConfig(key: string, value: string) {
    config[key] = value;
}
export function getConfig(key: string) {
    return config[key];
}
