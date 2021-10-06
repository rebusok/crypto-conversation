import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useStyles} from "./styles";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Store/store";
import {RequestStatusType} from "../../Store/AppReducer";
import clsx from "clsx";


const CryptoTable = (): JSX.Element => {
    const loading = useSelector((state: AppRootStateType) => state.convert.status)
    const items = useSelector((state: AppRootStateType) => state.convert.table)
    const classes = useStyles()

    if (loading === RequestStatusType.LOADING) {
        return <div>load</div>
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">FullName</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left">volume24hour</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!items.length
                        ? <TableRow><TableCell align="left">Load</TableCell></TableRow>
                        : items.map((coin) => (
                            <TableRow
                                className={classes.rowCurrency}
                                hover
                                key={coin.name}>
                                <TableCell><img className={classes.currencyIcon} src={coin.imgUrl} alt="Coin icon"/></TableCell>
                                <TableCell align="left">{coin.fromSymbol}</TableCell>
                                <TableCell align="left">{coin.name}</TableCell>
                                <TableCell
                                    className={clsx({
                                        [classes.greenColumn]: coin.changeValue && coin.changeValue > 0,
                                        [classes.redColumn]: coin.changeValue && coin.changeValue < 0,
                                    })}
                                    align="left">{coin.displayPrice}</TableCell>
                                <TableCell align="left">{coin.change24h}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CryptoTable;
