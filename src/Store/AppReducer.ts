import {ObjectForStore, ObjectForStoreWithTable} from "../services/api/api.types";

export enum RequestStatusType {
    LOADING = 'loading',
    SUCCESS = 'succeeded',
    FAIL = 'failed'
}

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
    detailsInformation: null | ObjectForStore
    table: ObjectForStoreWithTable[]
    initinalCurrency: string[]
}

const initialState: InitialStateType = {
    status: RequestStatusType.SUCCESS,
    error: null,
    isInitialized: false,
    detailsInformation: null,
    table: [],
    initinalCurrency: [],
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIAL-APP':
            return {...state, isInitialized: action.value}
        case "APP/RESULT":
            return {...state, detailsInformation: action.value}
        case "APP/FETCH_DATA_TABLE" :
            return {...state, table: action.value}
        case "APP/FETCH_INITINAL_DATA_TYPE_CURRENCY":
            return {...state, initinalCurrency: [...action.value]}
        default:
            return state
    }
}

export const setStatusApp = (status: RequestStatusType) => {
    return ({type: 'APP/SET-STATUS', status} as const)
}
export const setErrorApp = (error: null | string) => {
    return ({type: 'APP/SET-ERROR', error} as const)
}
export const setIsInitializedAC = (value: boolean) => {
    return ({type: 'APP/SET-INITIAL-APP', value} as const)
}
export const setFetchData = (value: ObjectForStore) => {
    return ({type: 'APP/RESULT', value} as const)
}
export const setFetchTableData = (value: ObjectForStoreWithTable[]) => {
    return ({type: 'APP/FETCH_DATA_TABLE', value} as const)
}
export const setInitialCurrency = (value: string[]) => {
    return ({type: 'APP/FETCH_INITINAL_DATA_TYPE_CURRENCY', value} as const)
}

export type SetAppStatusActionType = ReturnType<typeof setStatusApp>
export type SetAppErrorActionType = ReturnType<typeof setErrorApp>
export type SetAppInitialActionType = ReturnType<typeof setIsInitializedAC>
export type SetAppResultActionType = ReturnType<typeof setFetchData>
export type SetAppFetchDataTableActionType = ReturnType<typeof setFetchTableData>
export type SetAppFetchInitinalCurrencyActionType = ReturnType<typeof setInitialCurrency>

type ActionsType = SetAppStatusActionType
    | SetAppErrorActionType
    | SetAppInitialActionType
    | SetAppResultActionType
    | SetAppFetchDataTableActionType
    | SetAppFetchInitinalCurrencyActionType
