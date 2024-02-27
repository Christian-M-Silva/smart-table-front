export interface ColumnsTableCreate {
    name: string,
    label: string,
    field: string,
    align: 'left',
}
export type inputsWithoutIsPwdAndRequired = Omit<BaseInputs, "isRequired" | "isPwd">;
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
    type: 'date' | 'text' | 'number' | 'textarea' | 'password'
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
    eventId?: string,
}
export interface rowsTableCreateOrRead {
    date: string;
    [key: string]: string;
}
export interface vModelSelect {
    label: string,
    value: string,
    rest?: any
}
export interface PropsRequest {
    getCellValue: Function,
    pagination: {
        sortBy: string;
        descending: boolean;
        page: number;
        rowsPerPage: number;
        rowsNumber: number;
    },
    filter?: string
}
export interface infoToken {
        credentials: {
            refresh_token: string,
            type: string,
        },
        email: string
}
export interface PropsFullScreen {
    firstPage: Function,
    inFullscreen: Boolean,
    isFirstPage: Boolean,
    isLastPage: Boolean,
    lastPage: Function,
    nextPage: Function,
    pagesNumber: number
    pagination: {
        sortBy?: string;
        descending: boolean;
        page: number;
        rowsPerPage: number;
    },
    prevPage: Function,
    toggleFullscreen: Function,
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
export interface TypeGetTable {
    cols: ColumnsTableCreate[],
    createdAt: string,
    eventId: string,
    daysWeek: vModelSelect[],
    id: number,
    idTable: string,
    nameTable: string,
    nextUpdate: string,
    rows: rowsTableCreateOrRead[],
    updatedAt: string,
}
export interface lastRows {
    cols: ColumnsTableCreate[],
    rows: rowsTableCreateOrRead[]
}