import { Servers } from "structures/Servers";
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
    /*
    data.servers.forEach(server => {
        client.Servers[server.icon] = new Servers(client, server);

    });
*/

    client.emit("ready");
}