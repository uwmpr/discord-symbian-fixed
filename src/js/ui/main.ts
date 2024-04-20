import { Client } from "client/Client";
import { DatabaseStore } from "store/DatabaseStore";
import { Settings } from "store/Settings";

declare const backButton: Qml.ToolButton;
declare const switchGuildsButton: Qml.ToolButton;
declare const loginButton: Qml.ToolButton;
declare const settingsButton: Qml.ToolButton;
declare const menuButton: Qml.ToolButton;
declare const minimizeButton: Qml.ToolButton;
declare const clearAllNotBut: Qml.ToolButton;
declare const menu: Qml.Menu;
declare const banner: Qml.InfoBanner;
declare const symbian: Qml.Symbian;
declare const hapticsEffect: Qml.HapticsEffect;

function loadGlobalScope() {
    Object.defineProperty(window, "client", {
        value: new Client(),
    });

    Object.defineProperty(window, "store", {
        value: new DatabaseStore(),
    });
}

function handleReady() {
    loadGlobalScope();
    const autoConnect = Settings.get("autoConnect");
    const token = Settings.get("token");

    symbian.foregroundChanged.connect(() => {
        window.client.setBackground(!symbian.foreground);
    });

    backButton.clicked.connect(() => {
        Qt.quit();
    });
 switchGuildsButton.clicked.connect(() => {
    window.pageStack.push(
       Qt.resolvedUrl("GuildPage/GuildPage.qml")
   );
 });

    loginButton.clicked.connect(() => {


        if (token) {
            window.client.login(token);
        } else {
            banner.text = "You need to provide a token in order to sign in.";
            banner.open();
        }
    });


    settingsButton.clicked.connect(() => {
       window.pageStack.push(
            Qt.resolvedUrl("SettingsPage/SettingsPage.qml")
        );
    });

    menuButton.clicked.connect(() => {
        menu.open();
    });

    minimizeButton.clicked.connect(() => {
        avkon.minimize();
    });

    clearAllNotBut.clicked.connect(() => {
        avkon.clearAllNot();
    });

    window.client.on("ready", () => {
        console.log("Connected to Discord.");
    });

    window.client.on("debug", msg => {
        if (Settings.get("debug")) {
            console.log("[Socket DEBUG]", msg);
        }
    });

    window.client.on("message", msg => {
        if (msg.author.id !== window.client.user!.id
            && (!msg.guild_id || msg.mentions.some(m => m.id === window.client.user!.id))
        ) {
            if (symbian.foreground) {
                banner.text = `<b>${msg.author.username}</b><br />${msg.content}`;
                banner.open();
                hapticsEffect.running = true;
            } else {
                avkon.showPopup(msg.author.username, msg.content);

                hapticsEffect.running = true;
                setTimeout(() => { hapticsEffect.running = true; }, 500);
            }
        }
    });

    window.client.ready();

    const dmPage = Qt.createComponent("./DMPage/DMPage.qml") as Qml.Page;

    dmPage.createObject(window);

    window.initialPage = dmPage;

    if(autoConnect && token){
        window.client.login(token);

    }
}