import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";

export function GATEWAY_HELLO(client: Client, { d: data }: Payload) {
    if(window.client.reconnect && window.client.readyZZ){
        client.ws.send({
            op: -1,
            t: "GATEWAY_CONNECT",
            d: {
                supported_events: ["MESSAGE_CREATE", "READY"],
                url: `${client.resume_gateway_url}/?v=9&encoding=json`,
            },
        });
    }else{
        client.ws.send({
            op: -1,
            t: "GATEWAY_CONNECT",
            d: {
                supported_events: ["MESSAGE_CREATE", "READY"],
                url: "wss://gateway.discord.gg/?v=9&encoding=json",
            },
        });
    }
}