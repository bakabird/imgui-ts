import ModuleInterface from './ModuleInterface';

class ModuleManager {
    private modules: ModuleInterface[] = [];

    registerModule(module: ModuleInterface) {
        this.modules.push(module);
        module.init();
    }

    handleData(data: any) {
        this.modules.forEach(module => module.handleData(data));
    }

    renderAllUI() {
        this.modules.forEach(module => module.renderUI());
    }
}

export default ModuleManager;
