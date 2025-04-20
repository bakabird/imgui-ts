import ModuleInterface from './ModuleInterface';
import WebData from './WebData';
import * as ImGui from './imgui';

class ExampleModule implements ModuleInterface {
    name = 'ExampleModule';
    private exampleData: string = '';

    init() {
        // 模块初始化逻辑
    }

    handleData(data: WebData): void {
        this.exampleData = data.Get("example", "defualt example"); // 处理数据逻辑..
    }

    renderUI() {
        ImGui.Begin(this.name);
        ImGui.Text(`Example Data: ${this.exampleData}`);
        ImGui.End();
    }
}

export default ExampleModule;
