import Sockette from "sockette";



export default class WS {
    private static _me: WS;
    public static get Me(): WS {
        if (!this._me) {
            this._me = new WS();
        }
        return this._me;
    }

    private _ws: Sockette = null;
    private _isOpen: boolean = false;

    constructor() {
    }

    get isConnected() {
        return this._isOpen;
    }

    disconnect() {
        this._ws.close()
    }

    connect() {
        const ws = new Sockette('ws://localhost:3000/wsHtml', {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: e => {
                console.log('Connected!', e)
                ws.send("Hi im html")
                this._OnOpen()
            },
            onmessage: e => console.log('Received:', e),
            onreconnect: e => console.log('Reconnecting...', e),
            onmaximum: e => console.log('Stop Attempting!', e),
            onclose: e => this._OnClose(),
            onerror: e => console.log('Error:', e)
        });
        this._ws = ws;
    }

    private _OnOpen() {
        this._isOpen = true
    }

    private _OnClose() {
        this._isOpen = false;
        this._ws = null;
    }
}
