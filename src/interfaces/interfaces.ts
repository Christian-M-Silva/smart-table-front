export interface ColumnsTableCreate {
    name: string,
    label: string,
    field: string,
    align: 'left',
}
export interface DataUser {
    entity: string,
    password: string,
    email?: string,
}
export interface InputsEditTable extends vModelSelect {
    index: number
}
export interface BaseInputs {
    title?: string,
    type: 'select' | 'date' | 'text' | 'number' | 'textarea' | 'password'
    options?: vModelSelect[],
    isRequired?: boolean,
    vModel: string | object,
    isPwd?: boolean,
    name?: string 
}
export interface RowsTableHome {
    id: string,
    name: string,
    createdAt: string,
    updateAt: string,
}
export interface vModelSelect {
    label: string,
    value: string,
    rest?: any
}
export interface ButtonInput {
    color: string,
    iconSize: string,
    iconName: string,
    label: string,
}
export interface Network {
    network: string,
    color: string,
    icon: string,
    className: string,
    name: string,
}