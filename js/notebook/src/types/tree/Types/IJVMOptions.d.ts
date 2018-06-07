export default interface IJVMOptions extends IDefaultJVMOptions {
    other: IOtherJVMOptions;
    properties: IPropertiesJVMOptions;
}
export interface IDefaultJVMOptions {
    heap_GB: number;
}
export interface IOtherJVMOptions extends Array<any> {
}
export interface IPropertiesJVMOptions extends Array<{
    name: string;
    value: string;
}> {
}
