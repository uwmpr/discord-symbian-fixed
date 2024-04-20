import QtQuick 1.1
import com.nokia.symbian 1.1
import "./GuildChannelsPage.js" as Js

Page {
    id: GuildChannelsPage
    property string pageName: "Guild Channels"
    Component.onCompleted: Js.handleReady()

    SystemPalette { id: palette; colorGroup: SystemPalette.Active }

    tools: ToolBarLayout {
        ToolButton { iconSource: "toolbar-back"; onClicked: pageStack.pop() }
    }

    
}