import { Client } from "../client/Client";
import { ServersDto } from "./dto/Servers";


export class Servers {
    id!: string;
    icon!: string;
    name!: string;
    private ServerChannels: string[] = [];

    constructor(private client: Client, dto: ServersDto) {
        this._patch(dto);
    }

    private _patch(data: ServersDto) {
        this.id = data.id;
        this.icon = data.icon;
        this.name = data.name;
        this.ServerChannels = data.ServerChannels.map(r => r.id);
    }

    get recipients() {
        const recipients = this.ServerChannels.map(id => this.client.users[id]);

        return recipients;
    }
}
