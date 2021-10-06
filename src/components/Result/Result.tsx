import React, {memo, useMemo} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Store/store";
import {RequestStatusType} from "../../Store/AppReducer";
import {Typography} from "@material-ui/core";
import styles from './Result.module.css'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const Result = memo((): JSX.Element => {
    const detailsInformation = useSelector((state: AppRootStateType) => state.convert.detailsInformation)
    const loading = useSelector((state: AppRootStateType) => state.convert.status)

    const arrowIndicator = useMemo(() => {
        if(detailsInformation && detailsInformation.change24) {
            const numberChange = detailsInformation.change24.split(' ')[1]
            console.log(numberChange)
            if(+numberChange > 0) {
                return true
            }
            if(+numberChange < 0) {
                return false
            }

        }
    }, [detailsInformation])

    if (loading === RequestStatusType.LOADING) {
        return <div>load</div>
    }

    return (
        <div className={styles.card}>
            {detailsInformation && (
                <>
                    <div className={styles.logo}>
                        <Typography
                            display={'inline'}>1 {detailsInformation.fromCurrentValue} ({detailsInformation.fromSymbol}) </Typography>
                        <img alt={'img'} src={detailsInformation.imgUrl}/>
                    </div>
                    <Typography variant={'h4'}>{detailsInformation.displayPrice}</Typography>
                    <Typography variant={'body2'}>
                        Изменения за 24 часа: {detailsInformation.change24}
                        {arrowIndicator ? <ArrowUpwardIcon color={'primary'}/> : <ArrowDownwardIcon color={'error'}/>}
                    </Typography>
                </>
            )}

        </div>
    );
});

export default Result;
