import io, { Socket } from "socket.io-client";

export default class WS {

    private static _me: WS;
    public static get Me(): WS {
        if (!this._me) {
            this._me = new WS();
        }
        return this._me;
    }

    private socket: Socket;

    constructor() {
    }

    connect() {
        var socket = io("ws://127.0.0.1:3000/wsHtml")
        socket.on("connect", () => {
            socket.send("im html")
        })
        socket.connect()
    }
}
