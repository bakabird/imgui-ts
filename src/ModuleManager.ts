import ModuleInterface from './ModuleInterface';
import WebData from './WebData';
import WebSocketManager from './WebSocketManager';

class ModuleManager {
    private modules: ModuleInterface[] = [];
    private wsMgr: WebSocketManager;

    constructor(wsMgr: WebSocketManager) {
        this.wsMgr = wsMgr;
    }

    registerModule(module: ModuleInterface) {
        this.modules.push(module);
        module.init();
    }

    handleData(data: WebData) {
        this.modules.forEach(module => module.handleData(data));
    }

    renderAllUI() {
        this.modules.forEach(module => module.renderUI(this.wsMgr));
    }
}

export default ModuleManager;
