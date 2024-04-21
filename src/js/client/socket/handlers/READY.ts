import { Guilds } from "../../../structures/Guilds";
import { ReadyEventDto } from "../../../structures/dto/events/Ready";
import { Payload } from "../../../structures/dto/Payload";
import { PrivateChannel } from "../../../structures/PrivateChannel";
import { User } from "../../../structures/User";
import { Client } from "../../Client";

export function READY(client: Client, { d: data }: Payload<ReadyEventDto>) {
    if (!data) return;
    client.user = new User(client, data.user);
    data.private_channels.forEach(channel => {
        const [recipient] = channel.recipients;

        client.users[recipient.id] = new User(client, recipient);
        client.privateChannels[channel.id] = new PrivateChannel(client, channel);

    });
    data.guilds.forEach(element => {
        const [chId] = element.channels.map(ch => ch.id);
        const [chName] = element.channels.map(ch => ch.name);

        
        client.guild[element.id, element.icon, element.name, chId, chName] = new Guilds(client, element);
        
    });
   

    client.emit("ready");
}