import ModuleInterface from './ModuleInterface';
import WebData from './WebData';

class ModuleManager {
    private modules: ModuleInterface[] = [];

    registerModule(module: ModuleInterface) {
        this.modules.push(module);
        module.init();
    }

    handleData(data: WebData) {
        this.modules.forEach(module => module.handleData(data));
    }

    renderAllUI() {
        this.modules.forEach(module => module.renderUI());
    }
}

export default ModuleManager;
