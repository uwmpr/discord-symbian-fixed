import QtQuick 1.1
import com.nokia.symbian 1.1
import "./GuildChannelsPage.js" as Js

Page {
    id: guildChannelsPage
    property string guildId;
    property string pageName: "Guild Channels";
    Component.onCompleted: Js.handleReady(guildId);

    SystemPalette { id: palette; colorGroup: SystemPalette.Active }

    tools: ToolBarLayout {
        ToolButton { iconSource: "toolbar-back"; onClicked: pageStack.pop() }
    }
    ListModel {
        id: guildChannelsListModel
    }

    Component {
        id: guildChannelsHighlightView

        Rectangle {
            width: guildChannelsListView.width
            height: 40
            color: palette.highlight
            y: guildChannelsListView.currentItem.y
        }
    }

    ListView {
        id: guildChannelsListView
        height: parent.height
        anchors.top: parent.top
        anchors.right: parent.right
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        model: guildChannelsListModel
        highlight: guildChannelsHighlightView
        highlightFollowsCurrentItem: true
        highlightMoveDuration: 0
        highlightResizeDuration: 0
        highlightMoveSpeed: 0
        highlightResizeSpeed: 0
        focus: true

        delegate: MouseArea {
            id: guildChannelsListItem
            width: guildChannelsListView.width
            height: 40
            onPressed: {
                guildChannelsListView.currentIndex = index;
            }
            onClicked: Js.openMessages(id, name)
            Row {
                spacing: 10
                
                Text {
                    y: 8
                    text: "<b>" + name + "</b>#"
                    font.pixelSize: 18
                    color: palette.text
                }
            }
        }
    }

    
}