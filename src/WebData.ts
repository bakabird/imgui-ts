class WebData {
    private dataType: string;
    private rawData: any;

    public get Type(): string { return this.dataType; }

    /**
     * 构造函数，初始化数据类型和原始数据
     * @param type 数据类型，字符串类型
     * @param data 原始数据，可以是任意类型，会被序列化为 JSON
     */
    constructor(type: string, data: any,
        public toUnity: boolean = false) {
        this.dataType = type;
        this.rawData = data;
    }

    /**
     * 将数据打包为包含 "type" 和 "data" 字段的对象
     * @returns 包含 "type" 和 "data" 字段的对象
     */
    Pack(): { type: string; data: any, toUnity: boolean } {
        return {
            type: this.dataType,
            data: this.rawData,
            toUnity: this.toUnity,
        };
    }

    Get(key: string = "", defaultValue: any = null): any {
        if (key == "") {
            return this.rawData;
        }
        if (this.rawData.hasOwnProperty(key)) {
            return this.rawData[key];
        } else {
            return defaultValue;
        }
    }


    /**
     * 将打包后的数据转换为 JSON 字符串，方便发送
     * @returns 转换后的 JSON 字符串
     */
    toJsonString(): string {
        const packedData = this.Pack();
        return JSON.stringify(packedData);
    }

    /**
     * 静态方法，将 JSON 字符串解析为 WebData 实例
     * @param jsonString 包含 "type" 和 "data" 字段的 JSON 字符串
     * @returns 解析后的 WebData 实例，如果解析失败则返回 null
     */
    static Unpack(jsonString: string): WebData | null {
        try {
            const parsedData = JSON.parse(jsonString);
            if (parsedData.type && typeof parsedData.type === 'string') {
                return new WebData(parsedData.type, parsedData.data);
            }
            console.error('Unpack failed: Invalid JSON structure. Missing or invalid "type" field.');
            return null;
        } catch (error) {
            console.error('Unpack failed: Error parsing JSON string.', error);
            return null;
        }
    }
}

export default WebData;
