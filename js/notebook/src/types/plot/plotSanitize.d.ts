declare global  {
    interface Window {
        cssSchemaFixed: boolean;
        cssSchema: any;
        require: Function;
    }
}
declare let sanitize: any;
export default sanitize;
export declare const sanitizeHTML: (html: string, allowCss?: boolean) => any;
