import Sockette from "sockette";



export default class WS {

    private static _me: WS;
    public static get Me(): WS {
        if (!this._me) {
            this._me = new WS();
        }
        return this._me;
    }


    constructor() {
    }


    connect() {
        const ws = new Sockette('ws://localhost:3000/wsHtml', {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: e => {
                console.log('Connected!', e)
                ws.send("Hi im html")
            },
            onmessage: e => console.log('Received:', e),
            onreconnect: e => console.log('Reconnecting...', e),
            onmaximum: e => console.log('Stop Attempting!', e),
            onclose: e => console.log('Closed!', e),
            onerror: e => console.log('Error:', e)
        });
    }
}
