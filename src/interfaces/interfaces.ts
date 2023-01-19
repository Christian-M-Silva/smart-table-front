export interface RowsTableHome {
    name: string,
    createdAt: string,
    updateAt: string,
}
export interface ColumnsTableCreate {
    name: string,
    label: string,
    field: string,
    align: 'left',
}
export interface vModelSelect {
    label: string,
    value: string
}