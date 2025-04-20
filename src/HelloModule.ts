import ModuleInterface from './ModuleInterface';
import WebData from './WebData';
import * as ImGui from './imgui';

class HelloModule implements ModuleInterface {
    name = 'HelloModule';

    private helloMsg: string = '';

    init() {
        // 模块初始化逻辑
    }

    handleData(data: WebData): void {
        this.helloMsg = data.Get("")
    }

    renderUI() {
        ImGui.Text(`Rcv Hello: ${this.helloMsg}`);
    }
}

export default HelloModule;
