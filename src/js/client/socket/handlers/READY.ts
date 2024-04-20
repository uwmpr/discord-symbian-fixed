import { Guilds } from "../../../structures/Guilds";
import { ReadyEventDto } from "../../../structures/dto/events/Ready";
import { Payload } from "../../../structures/dto/Payload";
import { PrivateChannel } from "../../../structures/PrivateChannel";
import { User } from "../../../structures/User";
import { Client } from "../../Client";
import { GuildsChannels } from "structures/GuildsChannels";

export function READY(client: Client, { d: data }: Payload<ReadyEventDto>) {
    if (!data) return;
    client.user = new User(client, data.user);
    data.private_channels.forEach(channel => {
        const [recipient] = channel.recipients;

        client.users[recipient.id] = new User(client, recipient);
        client.privateChannels[channel.id] = new PrivateChannel(client, channel);

    });
    data.guilds.forEach(element => {
        data.channels.forEach(channels =>{ 
            client.guildChannels[channels.id, channels.last_message_id, channels.name] = new GuildsChannels(client, channels);
        });
        client.guild[element.id, element.icon, element.name] = new Guilds(client, element);
        
    });
   

    client.emit("ready");
}