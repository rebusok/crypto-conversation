import {PartialRecord} from "./api";

export interface DataTypes<D extends string | number | symbol> {
    Message: string;
    Type: number;
    MetaData: MetaData;
    SponsoredData?: (SponsoredDataEntity)[] | null;
    Data?: (DataEntityInit<D>)[] | null;
    RateLimit: RateLimit;
    HasWarning: boolean;
}
export interface MetaData {
    Count: number;
}
export interface SponsoredDataEntity {
    CoinInfo: CoinInfo;
}
export interface CoinInfo {
    Id: string;
    Name: string;
    FullName: string;
    Internal: string;
    ImageUrl: string;
    Url: string;
    Algorithm: string;
    ProofType: string;
    Rating: Rating;
    NetHashesPerSecond: number;
    BlockNumber: number;
    BlockTime: number;
    BlockReward: number;
    AssetLaunchDate: string;
    MaxSupply: number;
    Type: number;
    DocumentType: string;
}
export interface Rating {
    Weiss: Weiss;
}
export interface Weiss {
    Rating: string;
    TechnologyAdoptionRating: string;
    MarketPerformanceRating: string;
}
export interface DataEntity<D extends string | number | symbol> {
    CoinInfo?: CoinInfo;
    RAW?: RAW<D>;
    DISPLAY: DISPLAY<D>;
}
export interface DataEntityInit<D extends string | number | symbol> {
    CoinInfo: CoinInfo;
    RAW: {
        [key in D]: RawDescription
    };
    DISPLAY: {
        [key in D]: DisplayDescription
    };
}
export type RAW<D extends string | number | symbol> = {
    [key in D]: PartialRecord<D, RawDescription>
}


export interface RawDescription {
    TYPE?: string;
    MARKET?: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    FLAGS: string;
    PRICE: number;
    LASTUPDATE: number;
    MEDIAN: number;
    LASTVOLUME: number;
    LASTVOLUMETO: number;
    LASTTRADEID: string;
    VOLUMEDAY: number;
    VOLUMEDAYTO: number;
    VOLUME24HOUR: number;
    VOLUME24HOURTO: number;
    OPENDAY: number;
    HIGHDAY: number;
    LOWDAY: number;
    OPEN24HOUR: number;
    HIGH24HOUR: number;
    LOW24HOUR: number;
    LASTMARKET: string;
    VOLUMEHOUR: number;
    VOLUMEHOURTO: number;
    OPENHOUR: number;
    HIGHHOUR: number;
    LOWHOUR: number;
    TOPTIERVOLUME24HOUR: number;
    TOPTIERVOLUME24HOURTO: number;
    CHANGE24HOUR: number;
    CHANGEPCT24HOUR: number;
    CHANGEDAY: number;
    CHANGEPCTDAY: number;
    CHANGEHOUR: number;
    CHANGEPCTHOUR: number;
    CONVERSIONTYPE: string;
    CONVERSIONSYMBOL: string;
    SUPPLY: number;
    MKTCAP: number;
    MKTCAPPENALTY: number;
    CIRCULATINGSUPPLY: number;
    CIRCULATINGSUPPLYMKTCAP: number;
    TOTALVOLUME24H: number;
    TOTALVOLUME24HTO: number;
    TOTALTOPTIERVOLUME24H: number;
    TOTALTOPTIERVOLUME24HTO: number;
    IMAGEURL: string;
}

export type DISPLAY<D extends string | number | symbol> = {
    [key in D]: PartialRecord<D, DisplayDescription>
}
export interface DisplayDescription {
    FROMSYMBOL: string;
    TOSYMBOL: string;
    MARKET: string;
    PRICE: string;
    LASTUPDATE: string;
    LASTVOLUME: string;
    LASTVOLUMETO: string;
    LASTTRADEID: string;
    VOLUMEDAY: string;
    VOLUMEDAYTO: string;
    VOLUME24HOUR: string;
    VOLUME24HOURTO: string;
    OPENDAY: string;
    HIGHDAY: string;
    LOWDAY: string;
    OPEN24HOUR: string;
    HIGH24HOUR: string;
    LOW24HOUR: string;
    LASTMARKET: string;
    VOLUMEHOUR: string;
    VOLUMEHOURTO: string;
    OPENHOUR: string;
    HIGHHOUR: string;
    LOWHOUR: string;
    TOPTIERVOLUME24HOUR: string;
    TOPTIERVOLUME24HOURTO: string;
    CHANGE24HOUR: string;
    CHANGEPCT24HOUR: string;
    CHANGEDAY: string;
    CHANGEPCTDAY: string;
    CHANGEHOUR: string;
    CHANGEPCTHOUR: string;
    CONVERSIONTYPE: string;
    CONVERSIONSYMBOL: string;
    SUPPLY: string;
    MKTCAP: string;
    MKTCAPPENALTY: string;
    CIRCULATINGSUPPLY: string;
    CIRCULATINGSUPPLYMKTCAP: string;
    TOTALVOLUME24H: string;
    TOTALVOLUME24HTO: string;
    TOTALTOPTIERVOLUME24H: string;
    TOTALTOPTIERVOLUME24HTO: string;
    IMAGEURL?: string;
}
export interface RateLimit {
}


export interface ObjectForStore {
    price: number
    imgUrl?: string
    fromSymbol: string
    toSymbol: string
    fromCurrentValue: string
    toCurrentValue: string
    change24: string
    displayPrice: string
}
export interface ObjectForStoreWithTable {
    price: number
    imgUrl: string
    fromSymbol: string
    displayPrice: string
    changeIndicator?: boolean
    changeValue?: number
    name: string
    change24h: string
}
