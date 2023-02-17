/**
 * Low cost EMI Calculation
 * The percentacge of applicable interest is discounted
 * eg Interest = 14% and a discount on interest of 20%.
 * The total interest buyer needs to pay will be 80% of the total calculated
 * celing value will be checked for the max discount.
 * 
 * EMI = P x R x (1+R)^N / [(1+R)^N-1] where-
    P = Principal loan amount
    N = Loan tenure in months
    I = Yearly Interest in percentage
    R = Monthly interest rate
    The rate of interest (R) on your loan is calculated per month.
    R = Annual Rate of interest/12/100
    If rate of interest is 7.2% p.a. then r = 7.2/12/100 = 0.006
 */

var principal = 80000;
var months = 6;
var annualInterest = 14;

var RateOfInterest = (annualInterest / 12) / 100;
var r = (1 + RateOfInterest) ** months;

var emiNoCost = principal / months;
var lowCostPercentage = 100; // 0 is standard EMI 100 is No cost EMI
var celingValue = 1000; // max discount on the total Interest

var emi = 0;
var amount = 0;
var interestTotal = 0;

function emiFormula(principal, RateOfInterest, r) {
    return principal * RateOfInterest * r / (r - 1);
}

function emiToPricipal(emiNoCost) {
    return Math.round(emiNoCost * (r-1)/(RateOfInterest*r));
}

function lowCostInterest () {
    return (amount - celingValue) * (r - 1) / ( r * principal * months) ;
}

function initializeCalculation() {
    console.log('Input Data');
    console.table(
        {
            'Principal Amount': principal,
            'Months Tenure': months,
            'Interest Rate': annualInterest + ' %',
            'Ceiling Value': celingValue,
            'Low cost %': lowCostPercentage,
        }
    );
}

function emiStandard() {
    emi = Math.round(emiFormula(principal, RateOfInterest, r) * 100) / 100;
    amount = Math.round(emiFormula(principal, RateOfInterest, r) * months);
    interestTotal = Math.round(emiFormula(principal, RateOfInterest, r) * months - principal);

    console.log('Standard EMI Values');
    console.table(
        {
            'EMI Calculated': emi,
            'Total Amount Calculated': amount,
            'Total Interest Payable': interestTotal,
        }
    );
}

function emiTypeCheck () {

    if (lowCostPercentage === 100) {
        noCost();


    } else if (lowCostPercentage === 0){


    } else {
        lowCost();


    }
}


function lowCost () {
    let payableinterest = Math.round(emiFormula(principal, RateOfInterest, r) * months - principal) - celingValue;
    let lowCostEMi = Math.round( (amount - celingValue)/months * 100)/ 100;
    let lowCostRateOfInterest = Math.round(lowCostInterest() * 100 * 12 *100)/ 100 /12 /100;
    let lowr = (1 + lowCostRateOfInterest) ** months

    if (interestTotal * lowCostPercentage / 100  <= celingValue) {
        console.log('Low Cost applicable');
        console.table(
            {
                'Total Standard Interest Amount': interestTotal,
                'Low cost Discount %': lowCostPercentage,
                'Low cost Discount Amount': interestTotal * lowCostPercentage / 100,
                'Interest amount to be borne': interestTotal * (100 - lowCostPercentage) / 100,
                'Total Amount to be borne': principal + interestTotal * (100 - lowCostPercentage) / 100,
                'New EMI After discount': Math.round((principal + interestTotal * (100 - lowCostPercentage) / 100) / months),
                'New Principal for PG': emiToPricipal(Math.round((principal + interestTotal * (100 - lowCostPercentage) / 100) / months))

            }
        )
    } else {
        console.log('Low cost max out due to interest amount hits celing value');
        console.table(
            {
                'max discount Celing Value': celingValue,
                'Payble Interest Amount': interestTotal - celingValue,
                'Total Payable Amount': principal + interestTotal - celingValue,
                'New Lowcost EMI':  Math.round((principal + interestTotal - celingValue ) / months),
                // 'New Lowcost EMI Round Off': Math.round(lowCostEMi),
                'New Principal for PG': emiToPricipal(Math.round((principal + interestTotal - celingValue ) / months)),
            }
        )
    }
}

function noCost() {
    let noCoastEmi = Math.round(principal/months *100) / 100;
    let noCoastEmiRoundOff =  Math.round(principal/months)
    let pricipalAmountNew = emiToPricipal(emiNoCost)

    if (interestTotal <= celingValue) {

        console.log('No cost applicable');
        console.table (
            {
             'No Cost EMI': noCoastEmi,
             'No cost EMI Round off': noCoastEmiRoundOff,
             'New Principal': pricipalAmountNew,
             'New Interest Amount': Math.round(emiFormula(pricipalAmountNew, RateOfInterest, r) * months - pricipalAmountNew),

            }
        )
    } else {
        console.log('No cost converted to low cost')
        lowCost();
    }
}



initializeCalculation();

emiStandard();

emiTypeCheck();