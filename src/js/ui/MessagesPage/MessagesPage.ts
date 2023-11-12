import { Http } from "client/http/Http";
import { Settings } from "store/Settings";
import { MessageDto } from "structures/dto/Message";
import { markdown } from "utils/drawdown";
declare const msgPage: Qml.Page & { channelId?: string };
declare const msgListModel: Qml.ListModel;
declare const msgListView: Qml.ListView;
declare const sendButton: Qml.ToolButton;
declare const inputField: Qml.TextArea;
declare const msgListItem: Qml.Component;
const dscproxyaddr = Settings.get("proxydsc");
function endsWith(str: string, suffixes: string[]) {
    for (var i = 0; i < suffixes.length; i++) {
        var suffix = suffixes[i];
        if (str.indexOf(suffix, str.length - suffix.length) !== -1) {
            return true;
        }
    }
    return false;
}
const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/g;
function sendMessage(content: string) {
    inputField.text = "";
    Http.request<MessageDto[]>({   
        method: "POST",
        path: `http://${dscproxyaddr}/api/v9/channels/${msgPage.channelId}/messages`,
        body: `{\"content\":\"${content}\"}`
    }, (err, messages) => null);
}

function appendMessage(msg: MessageDto) {
    const cdnProxyUrl = Settings.get("cdnProxyUrl");
    const splitTimestamp = msg.timestamp.split("T");
    const [year, month, day] = splitTimestamp[0].split("-");
    const [hour, minute, second] = splitTimestamp[1].split(".")[0].split(":");
    const date = new Date(+year, (+month) - 1, +day, +hour, +minute, +second);
    var imgurl = "";
    var Fileurl = "";
    var FileName = "";
    

    const attachments = msg.attachments
        .map(attachment => {
            const width = Math.min(attachment.width, window.width - 50);
            const height = Math.floor(attachment.height / (attachment.width / width));
            
            if (endsWith(attachment.filename, [".svg", ".jpg", ".jpeg", ".png", ".bmp"])) {
                imgurl = attachment.url.toString().replace("https://cdn.discordapp.com", `http://${cdnProxyUrl}`);
                return attachment.url.toString() + `?width=${width}&height=${height}`;
            } else {
                FileName = attachment.filename.toString();
                return attachment.url.toString() ;
            }
        })
        .map(url => url.replace("https://cdn.discordapp.com", `http://${cdnProxyUrl}`));
    function filecheck(){
        if (FileName !== ""){
            return attachments;
        }else{
            return "";
        }
    }
    console.log(imgurl)
    msgListModel.append({
        username: msg.author.username,
        userId: msg.author.id,
        userAvatar: msg.author.avatar
            ? `http://${cdnProxyUrl}/avatars/${msg.author.id}/${msg.author.avatar}.jpg?size=40`
            : `http://${cdnProxyUrl}/embed/avatars${+msg.author.discriminator % 5}.png`,
        content: markdown(msg.content + filecheck()).replace(URL_REGEXP, url => `<a href='${url}'>${url}</a>`),
        voicemessurl: "commingsoon!",
        time: Qt.formatDateTime(date, "h:mm:ss AP, dd.MM.yyyy"),
        imgurl,
        
    });
    

}

function loadMessages() {
    msgListModel.clear();
    Http.request<MessageDto[]>({
        method: "GET",
        path: `http://${dscproxyaddr}/api/v9/channels/${msgPage.channelId}/messages?limit=50`,
    }, (err, messages) => {
        if (err || !messages) return;
        messages.reverse().forEach(msg => appendMessage(msg));
        msgListView.positionViewAtIndex(messages.length - 1, ListView.End);
        
    });
}

function handleMessage(msg: MessageDto) {
    if (msg.channel_id === msgPage.channelId) {
        appendMessage(msg);
        msgListView.positionViewAtIndex(msgListView.count - 1, ListView.End);
    }
}

function handleReady() {
    setTimeout(() => {
        loadMessages();
        window.client.on("message", handleMessage);
    });

    inputField.implicitHeightChanged.connect(() => {
        if (inputField.text.indexOf("\n") !== -1) {
            sendMessage(inputField.text.replace("\n", ""));
        }
    });

    sendButton.clicked.connect(() => {
        sendMessage(inputField.text);
    });
}


