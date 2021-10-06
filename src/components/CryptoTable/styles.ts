import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        currencyIcon: {
            width: 18,
            height: 18,
            borderRadius: 30,
        },
        redColumn: {
            backgroundColor: '#d8ffc4',
        },
        greenColumn: {
            backgroundColor: '#ffdada',
        },
        rowCurrency: {
            cursor: 'pointer',
        },
    }),
);

