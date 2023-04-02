export interface ColumnsTableCreate {
    name: string,
    label: string,
    field: string,
    align: 'left',
}
export interface DataEnd {
    nameTable: string,
    columns: any[],
    rows: any[],
}
export interface DataUser {
    entity: string,
    password: string,
    email?: string,
}
export interface Inputs extends vModelSelect {
    index: number
}
export interface InputsModal {
    title?: string,
    type: 'select' | 'date' | 'text' | 'number' | 'textarea' | 'password'
    options?: vModelSelect[],
    isRequired: boolean,
    vModel: string | object,
    isPwd?: boolean 
}
export interface RowsTableHome {
    name: string,
    createdAt: string,
    updateAt: string,
}
export interface vModelSelect {
    label: string,
    value: string,
    rest?: any
}