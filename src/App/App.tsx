import React, {useEffect} from 'react';
import {Container, Grid} from "@material-ui/core";
import {useStyles} from "./styles";
import ConverterBlock from "../components/ConverterBlock/ConverterBlock";
import CryptoTable from "../components/CryptoTable/CryptoTable";
import {useDispatch} from "react-redux";
import {fetchDataWithTable, initinalFetchData} from "../Store/app-saga";

function App() {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(initinalFetchData())

        const intervalId = setInterval(() => {
            dispatch(fetchDataWithTable())
        }, 20000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <Container className={classes.root} maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <CryptoTable/>
                </Grid>
                <Grid item xs={4}>
                    <ConverterBlock />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
