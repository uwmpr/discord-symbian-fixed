import { Settings } from "store/Settings";
import { Guilds } from "structures/Guilds";
import { GuildsChannels } from "structures/GuildsChannels";

type GuildListItem = {
    name: string
    icon: string
    id: string
}
declare const guildListModel: Qml.ListModel<GuildListItem>;

function loadGuilds(){
    guildListModel.clear();
    const cdnProxyUrl = Settings.get("cdnProxyUrl");
    const Guilds = Object.keys(window.client.guild);
    
    Guilds.forEach(guild => {
        const guildinf: Guilds = window.client.guild[guild];
        const item = {
            id: guildinf.id,
            icon: `http://${cdnProxyUrl}/icons/${guildinf.id}/${guildinf.icon}.jpg?size=40`,
            name: guildinf.name

        };
        
        guildListModel.append(item);
});

}

function handleReady() {

    loadGuilds();
}
function openGuild(){
    const Guildschannels = Object.keys(window.client.guild);
    
}
