import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        cryptoInputBox: {
            marginBottom: 20,
            marginTop: 20,
        },
        currencyInput: {
            width: 'calc(70% - 10px)',
            marginLeft: 10,
        },
        currencyType: {
            minWidth: '30%',
        },
    }),
);

export default useStyles;
