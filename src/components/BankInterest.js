import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import { NumberFormatCustom, currentDaysInMonth, calculateInterest } from './Helpers';
import NumberFormat from 'react-number-format';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function BankInterest({ classes }) {

    const [adb, setAdb] = useState("");
    const [interestIncome, setInterestIncome] = useState(0);
    const [daysInMonth, setDaysInMonth] = useState(currentDaysInMonth());
    const [interestRate, setInterestRate] = useState(3);

    const [interestTradIncome, setTradInterestIncome] = useState(0);
    const [interestTradtRate, setTradInterestRate] = useState(0.25);

    useEffect(() => {
        let total = calculateInterest(adb, interestRate, daysInMonth);
        setInterestIncome(total);

        let tradTotal = calculateInterest(adb, interestTradtRate, daysInMonth);
        setTradInterestIncome(tradTotal);

    }, [adb, daysInMonth, interestRate, interestTradtRate]);

    const items = []
    let amount = adb;
    for (let i = 1; i <= 12; i++) {
        amount = Number(amount) + (amount * ((interestRate / 100) / 12) * 0.8);
        items.push(<ListItem key={i} primary={i} ><span style={{ paddingRight: '10px', }}>Month #{i}: </span> <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={' ₱ '} /></ListItem>);
    }

    const tradCompoundingItems = []
    let tradAmount = adb;
    for (let i = 1; i <= 12; i++) {
        tradAmount = Number(tradAmount) + (tradAmount * ((interestTradtRate / 100) / 12) * 0.8);
        tradCompoundingItems.push(<ListItem key={i} primary={i} ><span style={{ paddingRight: '10px', }}>Month #{i}: </span> <NumberFormat value={tradAmount} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={' ₱ '} /></ListItem>);
    }

    return (
        <Container maxWidth="lg">
            <div className={classes.root}>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6} >
                        <h1>
                            Digital Bank Interest
                        </h1>
                        <Paper className={classes.info} >
                        A digital bank (also known as an online bank, internet-only bank, or neobank) is a type of direct bank that operates exclusively online without traditional physical branch networks. E.g CIMB, ING, TONIK, Komo
                        </Paper>
                        
                        <form className={classes.calculator} noValidate autoComplete="off" >
                            <FormControl margin="normal">
                                <TextField id="adb" size="small" label="Avg Daily Balance" variant="outlined" value={adb} className={classes.textField}
                                    InputProps={{
                                        autoFocus: true,
                                        inputComponent: NumberFormatCustom,
                                    }}
                                    onChange={(e) => {
                                        setAdb(e.target.value);
                                    }} />
                            </FormControl>
                            <FormControl margin="normal">
                                <TextField id="days-in-month" size="small" label="Days In Month" type="number" value={daysInMonth} variant="outlined" className={classes.textField}
                                    inputProps={{
                                        min: "0", max: "31", step: "1"
                                    }}
                                    onChange={(e) => {
                                        setDaysInMonth(e.target.value);
                                    }} />
                            </FormControl>
                            <FormControl margin="normal">
                                <TextField id="interest-rate" size="small" label="Interest Rate" type="number" value={interestRate} variant="outlined" className={classes.textField}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                    onChange={(e) => {
                                        setInterestRate(e.target.value);
                                    }} />
                            </FormControl>
                            <FormControl margin="normal">
                                <TextField id="tax" size="small" label="Witholding Tax" type="number" value="20" variant="outlined" className={classes.textField}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }} />
                            </FormControl>
                        </form>
                        <FormControl margin="normal">
                            <TextField id="interest-income" size="small" label="Monthly Interest" value={interestIncome} variant="filled" className={classes.textField}
                                InputProps={{
                                    readOnly: true,
                                    inputComponent: NumberFormatCustom,
                                }} />
                        </FormControl>

                        <div style={{ padding: '20px 6px 6px 6px', color: 'white', }}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Cumulative Monthly Interest (assume there are 30 days in each month)</Typography>

                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className={classes.column}>
                                        <List dense={true}>
                                            {items}
                                        </List>
                                    </div>
                                    <div className={classes.column}>
                                        <p>
                                            <strong>Sample Computation:</strong><br></br>
                Average Daily Balance: PHP100,000<br></br>
                No. of days in the month: 30 days<br></br>
                Interest rate: 3.00%<br></br>
                Withholding tax: 20%<br></br>
                                        </p>
                                        <p>
                                            <strong>Nominal Interest Amount:</strong><br></br>
                ((PHP 100,000*30)/360) * 3.00% = PHP 250
                </p>
                                        <p>
                                            <strong>Withholding Tax Amount:</strong><br></br>
                ((PHP 100,000*30)/360) * 3.00% * 20% = PHP 50
                </p>
                                        <p>
                                            <strong>Net Interest Amount:</strong><br></br>
                PHP 250 – PHP 50 = PHP 200
                </p>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <h1>
                            Commercial Bank Interest
                        </h1>
                        <Paper className={classes.info}>
                        A commercial bank is a type of bank that provides services such as accepting deposits, making business loans, and offering basic investment products that is operated as a business for profit. E.g BPI, BDO, UnionBank, Securit Bank
                        </Paper>
                        
                        <form className={classes.calculator} noValidate autoComplete="off" >
                            <FormControl margin="normal">
                                <TextField id="trad-adb" size="small" label="Avg Daily Balance" variant="outlined" value={adb} className={classes.textField}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                    onChange={(e) => {
                                        setAdb(e.target.value);
                                    }} />
                            </FormControl>
                            <FormControl margin="normal">
                                <TextField id="trad-days-in-month" size="small" label="Days In Month" type="number" value={daysInMonth} variant="outlined" className={classes.textField}
                                    inputProps={{
                                        min: "0", max: "31", step: "1"
                                    }}
                                    onChange={(e) => {
                                        setDaysInMonth(e.target.value);
                                    }} />
                            </FormControl>
                            <FormControl margin="normal">
                                <TextField id="trad-interest-rate" size="small" label="Interest Rate" type="number" value={interestTradtRate} variant="outlined" className={classes.textField}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                    onChange={(e) => {
                                        setTradInterestRate(e.target.value);
                                    }} />
                            </FormControl>
                            <FormControl margin="normal">
                                <TextField id="trad-tax" size="small" label="Witholding Tax" type="number" value="20" variant="outlined" className={classes.textField}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }} />
                            </FormControl>
                        </form>
                        <FormControl margin="normal">
                            <TextField id="trad-interest-income" size="small" label="Monthly Interest" value={interestTradIncome} variant="filled" className={classes.textField}
                                InputProps={{
                                    readOnly: true,
                                    inputComponent: NumberFormatCustom,
                                }} />
                        </FormControl>

                        <div style={{ padding: '20px 6px 6px 6px', color: 'white', }}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Cumulative Monthly Interest (assume there are 30 days in each month)</Typography>

                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className={classes.column}>
                                        <List dense={true}>
                                            {tradCompoundingItems}
                                        </List>
                                    </div>
                                    <div className={classes.column}>
                                        <p>
                                            <strong>Sample Computation:</strong><br></br>
                Average Daily Balance: PHP100,000<br></br>
                No. of days in the month: 30 days<br></br>
                Interest rate: 0.25%<br></br>
                Withholding tax: 20%<br></br>
                                        </p>
                                        <p>
                                            <strong>Nominal Interest Amount:</strong><br></br>
                ((PHP 100,000*30)/360) * 0.25% = PHP 20.83
                </p>
                                        <p>
                                            <strong>Withholding Tax Amount:</strong><br></br>
                ((PHP 100,000*30)/360) * 0.25% * 20% = PHP 4.16
                </p>
                                        <p>
                                            <strong>Net Interest Amount:</strong><br></br>
                PHP 20.83 – PHP 4.16 = PHP 16.67
                </p>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Container>

    );
}

export default BankInterest;