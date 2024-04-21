import QtQuick 1.1
import com.nokia.symbian 1.1
import "GuildPage.js" as Js

Page {
    id: settingsPage
    property string pageName: "Guildss";

    Component.onCompleted: Js.handleReady()

    tools: ToolBarLayout {
        ToolButton { iconSource: "toolbar-back"; onClicked: pageStack.pop() }
    }
    SystemPalette { id: palette; colorGroup: SystemPalette.Active }

    ListModel {
        id: guildListModel
    }

    Component {
        id: guildHighlightView

        Rectangle {
            width: guildListView.width
            height: 40
            color: palette.highlight
            y: guildListView.currentItem.y
        }
    }

    ListView {
        id: guildListView
        height: parent.height
        anchors.top: parent.top
        anchors.right: parent.right
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        model: guildListModel
        highlight: guildHighlightView
        highlightFollowsCurrentItem: true
        highlightMoveDuration: 0
        highlightResizeDuration: 0
        highlightMoveSpeed: 0
        highlightResizeSpeed: 0
        focus: true

        delegate: MouseArea {
            id: guildListItem
            width: guildListView.width
            height: 40
            onPressed: {
                guildListView.currentIndex = index;
            }
            onClicked: Js.openGuild(guildf)
            Row {
                spacing: 10
                Image {
                    width: 40
                    height: 40
                    sourceSize.width: 40
                    sourceSize.height: 40
                    source: icon
                }
                Text {
                    y: 8
                    text: "<b>" + name + "</b>" 
                    font.pixelSize: 18
                    color: palette.text
                }
            }
        }
    }
}