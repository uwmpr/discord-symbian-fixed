import QtQuick 1.1
import com.nokia.symbian 1.1
import "MessagesPage.js" as Js

Page {
    property string channelId;
    property string channelName;
    property string pageName: channelName;

    id: msgPage

    Component.onCompleted: Js.handleReady()
    Component.onDestruction: Js.handleDestroyed()

    SystemPalette { id: palette; colorGroup: SystemPalette.Active }

    tools: ToolBarLayout {
        ToolButton { iconSource: "toolbar-back"; onClicked: pageStack.pop() }
        ToolButton { iconSource: "toolbar-search" }
        ToolButton { iconSource: "toolbar-add" }
        ToolButton { iconSource: "toolbar-menu" }
    }
    
    ListModel {
        id: msgListModel
    }

    ListView {
        id: msgListView
        anchors.top: parent.top
        anchors.right: parent.right
        anchors.left: parent.left
        anchors.leftMargin: 0
        anchors.bottom: inputPanel.top


        spacing: 12
        model: msgListModel
        delegate: Column {
            id: msgListItem
            width: msgListView.width
            spacing: 5


            Row {   
                height: 20
                spacing: 5
                Image {
                    id: avatarImage
                    width: 20
                    height: 20
                    sourceSize.width: 20
                    sourceSize.height: 20
                    z: 1
                    smooth: true
                    source: userAvatar
                }

                Text {
                    id: usernameText
                    text: username
                    font.bold: true
                    font.pixelSize: 18
                    color: palette.text
                }

                Text {
                    text: time
                    font.pixelSize: 14
                    color: palette.text
                }
            }
            
            Text {
                
                text: content
                font.pixelSize: 16
                width: msgListView.width
                color: palette.text
                textFormat: Text.RichText
                wrapMode: Text.WrapAnywhere
                onLinkActivated: Qt.openUrlExternally(link)
                }
                      

        Loader {
            sourceComponent: Image {
                fillMode: Image.PreserveAspectFit
                sourceSize.width: 200
                sourceSize.height: 200
                
                smooth: true
                source: imgurl
                visible: imgurl !== ""
                MouseArea {
                    anchors.fill: parent
                    
                    onClicked: {
                        Qt.openUrlExternally(imgurl)
                        
                       
                }}
            }   


        
        }
               
        
            
              
    }
}
    


    Item {
        id: inputPanel
        height: 48
        anchors.bottom: parent.bottom
        anchors.right: parent.right
        anchors.left: parent.left
        Rectangle {
            color: palette.base
            anchors.top: parent.top
            anchors.bottom: parent.bottom
            anchors.left: parent.left
            anchors.right: parent.right
            z: 1
        }
        TextArea {
            id: inputField
            anchors.top: parent.top
            anchors.bottom: parent.bottom
            anchors.left: parent.left
            anchors.right: sendButton.left
            anchors.rightMargin: 5
            z: 2
            placeholderText: "Message " + channelName
        }
        ToolButton {
            id: sendButton
            width: 48
            height: 48
            iconSource: "toolbar-next"
            anchors.right: parent.right
            z: 2
        }
    }
}