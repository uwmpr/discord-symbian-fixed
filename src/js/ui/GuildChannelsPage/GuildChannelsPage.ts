import { Guilds } from "structures/Guilds";

type GuildChannelsListItem = {
    name: string
    id: string
}
declare const guildChannelsListModel: Qml.ListModel<GuildChannelsListItem>;

function handleReady(guildId: string){
  
    const guildinf: Guilds = window.client.guild[guildId];
    
    guildinf.chname.forEach((ch, index) => {
        const item = {
            name: ch,
            id: guildinf.chid[index]

        } 
        guildChannelsListModel.append(item);
    });
}

function openMessages(channelId: string, name: string){
    window.pageStack.push(
        Qt.resolvedUrl("../MessagesPage/MessagesPage.qml"),
        {
            channelId,
            channelName: name,
        }
    );
}