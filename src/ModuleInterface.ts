interface ModuleInterface {
    name: string;
    init(): void;
    handleData(data: any): void;
    renderUI(): void;
}

export default ModuleInterface;