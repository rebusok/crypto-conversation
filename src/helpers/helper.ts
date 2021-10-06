import pipe from "lodash/fp/pipe";
import {DataEntity, DataTypes, ObjectForStore, ObjectForStoreWithTable} from "../services/api/api.types";
import {CurrencyType} from "../services/api/api";

export const floatNumber = (value: string) => {
    if (!value.length) {
        return ''
    }

    return value
        .replace(',', '.')
        .replace(/[^\d.-]/g, '')
        .replace(/^\.(.?)/, '0.$1')
        .replace(/(\d+(\.\d*)?).*/, '$1')
}

export const separateRegister = (value: string) => value ? value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1 ') : value

export const formatPrice = pipe(
    (value:string) => `${value}`,
    floatNumber,
    separateRegister
)

const baseUrlImg = 'https://www.cryptocompare.com/'
export const createCurrentObject = (data: DataEntity<any>): ObjectForStore | null => {

    const fromCurrentValue = Object.keys(data.DISPLAY)[0] as CurrencyType
    const toCurrentValue = Object.keys(data.DISPLAY[fromCurrentValue])[0] as CurrencyType
    const displayObject = data.DISPLAY[fromCurrentValue][toCurrentValue]
    const Raw = data.RAW?.[fromCurrentValue][toCurrentValue]
    if(displayObject && Raw) {
        const imgUrl = displayObject.IMAGEURL ? `${baseUrlImg}${displayObject.IMAGEURL}`: undefined
        const {PRICE, CHANGE24HOUR, FROMSYMBOL, TOSYMBOL} = displayObject
        return {
            price: Raw.PRICE,
            imgUrl,
            fromSymbol: FROMSYMBOL,
            toSymbol: TOSYMBOL,
            fromCurrentValue,
            toCurrentValue,
            change24: CHANGE24HOUR,
            displayPrice: PRICE,
        }
    }
   return null
}
export const createCurrentObjectWithTable = (data: DataTypes<'USD'>, price?: ObjectForStoreWithTable[]): ObjectForStoreWithTable[] | undefined  => {
    return data.Data?.map((el, ind) => {
        return {
            price: el.RAW?.USD.PRICE,
            imgUrl: `${baseUrlImg}${el.RAW?.USD.IMAGEURL}`,
            displayPrice: el.DISPLAY.USD.PRICE,
            fromSymbol: el.DISPLAY.USD.FROMSYMBOL,
            changeIndicator: price && price[ind].price ? price[ind].price - el.RAW.USD.PRICE > 0 : undefined,
            changeValue: price && price[ind].price ? price[ind].price - el.RAW.USD.PRICE : undefined,
            name: el.CoinInfo.FullName,
            change24h: el.DISPLAY.USD.CHANGE24HOUR,
        }
    })

}
