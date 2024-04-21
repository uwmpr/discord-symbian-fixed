import { Guilds } from "structures/Guilds";

type GuildChannelsListItem = {
    name: string
    //id: string
}


declare const guildChannelsListModel: Qml.ListModel<GuildChannelsListItem>;


function handleReady(guildId: string){
  
    const guildinf: Guilds = window.client.guild[guildId];
    
    guildinf.chname.forEach(el => {
        const item = {
            name: el
        } 
        guildChannelsListModel.append(item);
    });
        
       
        
        

    

}