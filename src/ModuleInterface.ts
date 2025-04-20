import WebData from "./WebData";

interface ModuleInterface {
    name: string;
    init(): void;
    handleData(data: WebData): void;
    renderUI(): void;
}

export default ModuleInterface;
