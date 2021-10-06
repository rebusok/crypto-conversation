import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../Store/app-saga";
import {AppRootStateType} from "../../Store/store";
import Result from "../Result/Result";
import useStyles from "./styles";
import {RequestStatusType} from "../../Store/AppReducer";


const ConverterBlock = memo((): JSX.Element => {
    const [fromSelected, setFromSelected] = useState<string >('')
    const [toSelected, setToSelected] = useState<string>('')
    const dispatch = useDispatch()
    const [fromValue, setFromValue] = useState<string | number>('')
    const [toValue, setToValue] = useState<string | number>('')
    const classes = useStyles();
    const currencyList = useSelector((state: AppRootStateType) => state.convert.initinalCurrency)
    const loading = useSelector((state: AppRootStateType) => state.convert.status)

    const handleChangeFrom = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setFromSelected(e.target.value as string)
    }
    const handleChangeTo = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setToSelected(e.target.value as string)
    }
    const detailsInformation = useSelector((state:AppRootStateType) => state.convert.detailsInformation)

    useEffect(() => {
        if(fromSelected && toSelected) {
            dispatch(fetchData(fromSelected, toSelected))
        }
    },[fromSelected, toSelected, dispatch])

    useEffect(() => {
        if(detailsInformation) {
            if(fromValue){
                setToValue(detailsInformation.price * +fromValue)
                return
            }
            if(toValue) {
                setFromValue(+toValue / detailsInformation.price)
                return;
            }
            setFromValue(1)
            setToValue(detailsInformation.price)


        }
    }, [detailsInformation])

    const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if(e.target.id === 'from' && detailsInformation) {
            const value = e.currentTarget.value
            if(!value) {
                setFromValue('')
                setToValue('')
                return
            }
            setFromValue(value)
            setToValue(+value * detailsInformation.price )
        }
        if(e.target.id === 'to' && detailsInformation) {
            const value = e.currentTarget.value
            if(!value) {
                setToValue('')
                setFromValue('')
                return
            }
            setToValue(value)
            setFromValue( +value / detailsInformation.price )
        }
    }

    if (loading === RequestStatusType.LOADING && !currencyList.length) {
        return <div>load</div>
    }

    return (
        <Paper className={classes.paper}>
            <div className={classes.cryptoInputBox}>
                <FormControl className={classes.currencyType} variant='outlined'>
                    <InputLabel id="grouped-select">Type</InputLabel>
                    <Select
                        labelId="grouped-select"
                        label={'Type'}
                        value={fromSelected}
                        onChange={handleChangeFrom}
                    >
                        <MenuItem value="">
                            <em/>
                        </MenuItem>
                        {currencyList.map(el =>
                            (
                                <MenuItem value={el} key={el}>{el}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.currencyInput}>
                    <TextField
                        onChange={handleChangeInput}
                        id={'from'}
                        variant={'outlined'}
                        value={fromValue}
                        type="number"
                        label="Сумма"
                    />
                </FormControl>

            </div>
            <div className={classes.cryptoInputBox}>
                <FormControl className={classes.currencyType} variant='outlined'>
                    <InputLabel id="grouped-select2">Type</InputLabel>
                    <Select
                        labelId="grouped-select2"
                        value={toSelected}
                        label={'Type'}
                        onChange={handleChangeTo}
                    >
                        <MenuItem value="">
                            <em/>
                        </MenuItem>
                        {currencyList.map(el =>
                            (
                                <MenuItem value={el} key={el}>{el}</MenuItem>
                            ))}
                    </Select>

                </FormControl>
                <FormControl className={classes.currencyInput}>
                    <TextField
                        onChange={handleChangeInput}
                        value={toValue}
                        id={'to'}
                        variant={'outlined'}
                        type="number"
                        label="Сумма"
                    />
                </FormControl>

            </div>
            <Result/>

        </Paper>
    );
});

export default ConverterBlock;
