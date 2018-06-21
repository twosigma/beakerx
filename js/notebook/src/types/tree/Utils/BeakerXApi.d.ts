import IApiSettingsResponse from "../Types/IApiSettingsResponse";
export default class BeakerXApi {
    readonly DEFAULT_SETTINGS: IApiSettingsResponse;
    private apiUrl;
    constructor(baseUrl?: string);
    getApiUrl(endpoint: string): string;
    getVersion(): Promise<string>;
    loadSettings(): Promise<IApiSettingsResponse>;
    mergeWithDefaults(settings: IApiSettingsResponse): IApiSettingsResponse;
    saveSettings(data: any): Promise<any>;
}
