import { Settings } from "store/Settings";

declare const dialog: Qml.CommonDialog;
declare const tokenItem: Qml.ListItem;
declare const cdnProxyUrlItem: Qml.ListItem;
declare const proxyUrlItem: Qml.ListItem;
declare const dialogField: Qml.TextField;
declare const debugModeItem: Qml.SelectionListItem;
declare const proxydscItem: Qml.ListItem;

function loadSettings() {
    debugModeItem.subTitle = Settings.get("debug") ? "Enabled" : "Disabled";
}

function handleReady() {
    let property: keyof Settings = "token";

    dialog.buttonClicked.connect(bi => {
        if (bi === 0) {
            Settings.set(property, dialogField.text);
            loadSettings();
        }
    });

    tokenItem.clicked.connect(() => {
        dialog.titleText = "Token";
        dialogField.text = Settings.get("token") ?? "";
        dialogField.placeholderText = "";
        property = "token";
        dialog.open();
    });

    cdnProxyUrlItem.clicked.connect(() => {
        dialog.titleText = "CDN proxy URL";
        dialogField.text = Settings.get("cdnProxyUrl") ?? "";
        dialogField.placeholderText = "hostname:port";
        property = "cdnProxyUrl";
        dialog.open();
    });

    proxyUrlItem.clicked.connect(() => {
        dialog.titleText = "Gateway proxy URL";
        dialogField.text = Settings.get("proxyUrl") ?? "";
        dialogField.placeholderText = "hostname:port";
        property = "proxyUrl";
        dialog.open();
    });
        proxydscItem.clicked.connect(() => {
        dialog.titleText = "discord proxy url";
        dialogField.text = Settings.get("proxydsc") ?? "";
        dialogField.placeholderText = "hostname:port";
        property = "proxydsc";
        dialog.open();
    });

    debugModeItem.clicked.connect(() => {
        Settings.set("debug", !Settings.get("debug"));
        loadSettings();
    });

    loadSettings();
}