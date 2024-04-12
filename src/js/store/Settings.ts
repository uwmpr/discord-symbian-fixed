export const defaultSettings: Settings = {
    sendProxy: "dsc2.uwmpr.online",
    token: "",
    debug: false,
    autoConnect: false,
    cdnProxyUrl: "cdndsc.uwmpr.online:80",
    proxyUrl: "uwmpr.online:8080",
    proxydsc: "dsc.uwmpr.online:80",
    https: false
};

export type Settings = {
    token: string
    debug: boolean
    autoConnect: boolean
    cdnProxyUrl: string
    sendProxy: string
    proxyUrl: string
    proxydsc: string
    https: boolean
};

export const Settings = {
    get<K extends keyof Settings>(key: K) {
        const defaultValue = defaultSettings[key];
        const type = typeof defaultValue;
        const value = window.store.get("settings")[key];

        if (!value && type === "string") return defaultValue;

        return value ?? defaultValue;
    },
    set<K extends keyof Settings>(key: K, value: Settings[K]) {
        window.store.fetch("settings", settings => {
            settings[key] = value;
            window.store.set("settings", settings);
        });
    },
};