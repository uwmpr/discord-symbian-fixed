import { Client } from "../client/Client";
import { ServerChannelsDto } from "./dto/ServerChannels";


export class ServerChannel {
    id!: string;
    type!: number;
    lastMessageId!: string;
    name!: string;

    constructor(private client: Client, dto: ServerChannelsDto) {
        this._patch(dto);
    }

    private _patch(data: ServerChannelsDto) {
        this.id = data.id;
        this.type = data.type;
        this.lastMessageId = data.last_message_id;
        this.name = data.name;
    }


}
