import {Api, CurrencyType} from "../services/api/api";
import {
    RequestStatusType,
    setErrorApp,
    setFetchData,
    setFetchTableData,
    setInitialCurrency,
    setStatusApp
} from "./AppReducer";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {DataEntity, DataTypes, ObjectForStoreWithTable} from "../services/api/api.types";
import {AxiosResponse} from "axios";
import {createCurrentObject, createCurrentObjectWithTable} from "../helpers/helper";
import {AppRootStateType} from "./store";


export function* fetchDataSaga(action: ReturnType<typeof fetchData>) {

    const {data}: AxiosResponse<DataEntity<CurrencyType>> = yield call(Api.getData, action.firstValue, action.secondValue)
    yield put(setStatusApp(RequestStatusType.LOADING))
    const curentsDataObject = createCurrentObject(data)

    try {
        if (curentsDataObject) {
            yield put(setFetchData(curentsDataObject));
        } else {

        }
    } catch (e:any) {
        yield put(setErrorApp(e.message))
    } finally {
        yield  put(setStatusApp(RequestStatusType.SUCCESS))

    }
}

export function* fetchDataWithTableSaga () {
    const {data}: AxiosResponse<DataTypes<'USD'>> = yield call(Api.getDataWithCurrency)
    const selectTable = (state: AppRootStateType) => state.convert.table
    const oldData:ObjectForStoreWithTable[] = yield select(selectTable)
    yield put(setStatusApp(RequestStatusType.LOADING))
    console.log('oldData', oldData)
    const currentArrayForStore = createCurrentObjectWithTable(data, oldData)
    console.log('currentArrayForStore', currentArrayForStore)
    try {
        if (currentArrayForStore) {
            yield put(setFetchTableData(currentArrayForStore));
        } else {

        }
    } catch (e:any) {
        yield put(setErrorApp(e.message))
    } finally {
        yield  put(setStatusApp(RequestStatusType.SUCCESS))

    }
}

export function* initinalSaga() {
    const {data}: AxiosResponse<DataTypes<'USD'>> = yield call(Api.getDataWithCurrency)
    yield put(setStatusApp(RequestStatusType.LOADING))
    const INIT_CUR = ['USD', 'EUR', 'CHF', 'GBP', 'RUB']
    const initinalTypeCurrency = data.Data?.map(el => {
        return el.RAW.USD.FROMSYMBOL
    })
    console.log(initinalTypeCurrency)
    console.log(data)
    const currentArrayForStore = createCurrentObjectWithTable(data)
    try {
        if (currentArrayForStore && initinalTypeCurrency && initinalTypeCurrency.length) {
            yield put(setInitialCurrency([...INIT_CUR, ...initinalTypeCurrency]))
            yield put(setFetchTableData(currentArrayForStore));
        } else {

        }
    } catch (e:any) {
        yield put(setErrorApp(e.message))
    } finally {
        yield  put(setStatusApp(RequestStatusType.SUCCESS))

    }
}

export const fetchDataWithTable = () => {
    return {type: 'APP/FETCH_DATA_WITH_TABLE'}
}

export const fetchData = (firstValue: string,secondValue: string) => {
    return {type: 'APP/FETCH_DATA', firstValue, secondValue}
}
export const initinalFetchData = () => {
    return {type: 'APP/INITINAL_FETCH_DATA'}
}

export function* appWatcherSaga() {
    yield takeEvery('APP/FETCH_DATA', fetchDataSaga)
    yield takeEvery('APP/FETCH_DATA_WITH_TABLE', fetchDataWithTableSaga)
    yield takeEvery('APP/INITINAL_FETCH_DATA', initinalSaga)

}
