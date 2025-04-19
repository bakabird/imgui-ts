import ModuleInterface from './ModuleInterface';
import imgui, * as ImGui from './imgui';

class ExampleModule implements ModuleInterface {
    name = 'ExampleModule';
    private exampleData: string = '';

    init() {
        // 模块初始化逻辑
    }

    handleData(data: any) {
        if (data.exampleField) {
            this.exampleData = data.exampleField;
        }
    }

    renderUI() {
        ImGui.Begin(this.name);
        ImGui.Text(`Example Data: ${this.exampleData}`);
        ImGui.End();
    }
}

export default ExampleModule;
