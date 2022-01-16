let config:Record<string, unknown> = {

};
export function setConfig(key:string, value:unknown) {
    config[key] = value;
}

export function getConfig(key:string){
    return config[key];
}
