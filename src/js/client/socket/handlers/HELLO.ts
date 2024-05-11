import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";
declare const banner: Qml.InfoBanner;

export type HelloData = {
    heartbeat_interval: number
};

export function HELLO(client: Client, { d: data }: Payload<HelloData>) {
    if (!data) {
        throw new Error("No data provided to the handler.");
    }
    if(window.client.reconnect && window.client.readyZZ){ 
        client.ws.send({
            op: 6,
            d: {
                token: client.token,
                session_id: client.session_id,
                seq: client.seq,
            }

        });
        
    banner.text = `<b>TCP socket</b><br /> reconnected`;
    banner.open();

        }else{
        client.ws.send({
            op: 2,
            d: {
                token: client.token,
                capabilities: 1,
                properties: {
                    "$os": "Symbian^3",
                    "$browser": "discord-symbian",
                    "$device": "Nokia E7-00",
                },
            },
        });
    
    
    }

    socket.errors.disconnect( msg => {});
    client.reconnect = false;

    setInterval(() => {
        client.ws.send({
            op: 1,
            d: client.seq,
        });
    }, data.heartbeat_interval);
}