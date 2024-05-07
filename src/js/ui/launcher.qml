import QtQuick 1.1
import QtMobility.feedback 1.1
import com.nokia.symbian 1.1
import com.nokia.extras 1.1
import "DMPage"
import "./launcher.js" as Js

PageStackWindow {
    id: window
    platformSoftwareInputPanelEnabled: true
    platformInverted: false
    showStatusBar: true
    showToolBar: true

    Component.onCompleted: Js.handleReady()

    HapticsEffect {
        id: hapticsEffect;
        attackTime: 250;
        fadeTime: 250;
        attackIntensity: 0;
        fadeIntensity: 0
    }

    InfoBanner {
        id: banner
    }

    Menu {
        id: menu
        content: MenuLayout {
            MenuItem {
                id: switchGuildsButton
                text: "swith servers/DMs"
            }
            MenuItem {
                id: clearAllNotBut
                text: "clear all notifications"
            }
            MenuItem {
                id: loginButton
                text: "Sign in"
            }
            MenuItem {
                id: settingsButton
                text: "Settings"
            }
            MenuItem {
                id: backButton
                text: "Exit"
            }
        }
    }

    ToolBarLayout {
        id: toolbar

        ToolButton {
            id: minimizeButton
            flat: true
            iconSource: "toolbar-back"
        }

        ToolButton {
            id: menuButton
            iconSource: "toolbar-menu"
        }
    }

    StatusBar {
        y: -window.y
        Item {
            anchors { left: parent.left; leftMargin: 6; bottom: parent.bottom; top: parent.top }
            width: parent.width - 186;
            clip: true
            Text {
                id: statusBarText
                anchors.verticalCenter: parent.verticalCenter
                maximumLineCount: 1
                color: "white"
                font.pointSize: 6
                font.bold: true
            }
            Rectangle {
                width: 25
                anchors { top: parent.top; bottom: parent.bottom; right: parent.right }
                rotation: -90
                gradient: Gradient {
                    GradientStop { position: 0.0; color: "#00000000" }
                    GradientStop { position: 1.0; color: "#ff000000" }
                }
            }
        }
        Connections {
            target: pageStack
            onCurrentPageChanged: statusBarText.text = pageStack.currentPage.pageName
        }
    }

    function module() {}

    function exports() {}

    function require(url) {
        return Js.require(url);
    }

    function setTimeout(callback, timeout) {
        const timer = Qt.createQmlObject("import QtQuick 1.0; Timer {}", window);

        timer.interval = timeout || 1;
        timer.repeat = false;
        timer.triggered.connect(callback);
        timer.start();

        return Js.timers.push(timer) - 1;
    }

    function clearTimeout(index) {
        const timer = Js.timers[index];

        if (!timer) return;

        timer.stop();
        delete Js.timers[index];
    }

    function setInterval(callback, timeout) {
        const timer = Qt.createQmlObject("import QtQuick 1.0; Timer {}", window);


        timer.interval = timeout || 1;
        timer.repeat = true;
        timer.triggered.connect(callback);
        timer.start();

        return Js.timers.push(timer) - 1;
    }

    function clearInterval(index) {
        const timer = Js.timers[index];

        if (!timer) return;

        timer.stop();
        delete Js.timers[index];
    }
}
