import { GuildsDto } from "./dto/Guilds";
import { Client } from "../client/Client";

export class Guilds {
    name!: string
    icon!: string
    id!: string
    chid!: string[]
    chname!: string[]
    constructor(private client: Client, dto: GuildsDto) {
        this._patch(dto);
    }
    private _patch(data: GuildsDto) {
        this.id = data.id;
        this.name = data.name
        this.icon = data.icon
        this.chid = data.channels.map(ch => ch.id)
        this.chname = data.channels.map(ch => ch.name);
     }
}