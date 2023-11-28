import QtQuick 1.1
import com.nokia.symbian 1.1
import "GuildPage.js" as Js

PageStackWindow {
    id: window
    platformSoftwareInputPanelEnabled: true
    platformInverted: false
    showStatusBar: true
    showToolBar: true

    Component.onCompleted: Js.handleReady()

    Menu {
        id: menu
        content: MenuLayout {
            MenuItem {
                id: clearAllNotBut
                text: "clear all notifications"
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
}