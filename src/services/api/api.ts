import {BASE_URL} from "./constants";
import axios from "axios";
import {DataEntity} from "./api.types";

const configOMB = {
    baseURL: BASE_URL,
    withCredentials:true,

};

const axiosInstance = axios.create(configOMB);

export enum CurrencyType  {
    USD = 'USD',
    EUR = 'EUR',
    CHF = 'CHF',
    GBP = 'GBP',
    RUB = 'RUB',
    BTC = 'BTC',
    ETH = 'ETH',
    SOL = 'SOL',
    AXS = 'AXS',
    XRP = 'XRP',
    OMG = 'OMG',
}

export type PartialRecord<K extends string | number | symbol, T> = { [P in K]?: T; };

export const Api = {
    getDataWithCurrency: (initCurrency: string = 'USD', limit:number = 10) => {
        return axiosInstance.get<DataEntity<any>>('top/totalvolfull' ,{params: {tsym: initCurrency, limit}})
    },
    getData: <K extends string | number | symbol>(firstValue: string, secondValue: string )=> {
        return axiosInstance.get<DataEntity<K>>('pricemultifull', {params: {fsyms: firstValue, tsyms:secondValue}})
    }

}
