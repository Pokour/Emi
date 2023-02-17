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

var principal = 50000;
var months = 3;
var annualInterest = 14;

var RateOfInterest = (annualInterest / 12) / 100;
var r = (1 + RateOfInterest) ** months;

var emiNoCost = principal / months;
var lowCostPercentage = 90; // 0 is standard EMI 100 is No cost EMI
var celingValue = 1000; // max discount on the total Interest

var emiType = undefined;
var emiTypeChange = undefined;

function emiFormula(principal, RateOfInterest, r) {
    return principal * RateOfInterest * r / (r - 1);
}

function emiTypeSelected(lowCostPercentage) {
    if (lowCostPercentage === 100) {
        emiType = 0;
        return 'No Cost Selected';
    } else if (lowCostPercentage === 0) {
        emiType = 1;
        return 'Standard EMI';
    } else {
        emiType = 2;
        return 'Low Cost selected';
    }
}

function initializeCalculation() {
    console.log('Input Data');
    console.table(
        {
            'Principal Amount': principal,
            'Interest Rate': annualInterest + ' %',
            'Months Tenure': months,
            'Ceiling Value': celingValue,
            'EMI Type Selected': emiTypeSelected(lowCostPercentage),
        }
    );
}

function emiStandard() {
    let emi = Math.round(emiFormula(principal, RateOfInterest, r) * 100) / 100;
    let amount = Math.round(emiFormula(principal, RateOfInterest, r) * months);
    let interestTotal = Math.round(emiFormula(principal, RateOfInterest, r) * months - principal);
    emiTypeCheck(interestTotal);

    console.log('Calculated Values');
    console.table(
        {
            'EMI Calculated': emi,
            'Total Amount Calculated': amount,
            'Total Interest Payable': interestTotal
        }
    );
}

/**]
 * 0 = No Cost
 * 1 = Standard
 * 2 = Low Cost
 */
function emiTypeCheck(_totalInterest) {
    if (emiType === 0) { // No cost
        if (_totalInterest <= celingValue) {
            // emi type does not change
        } else {
            emiTypeChange = 2;
            lowCostPercentage = 100;
            // emi type changed to low cost with % of 100%
        }
    } else if (emiType === 2) { // low cost
        if (_totalInterest * lowCostPercentage / 100 <= celingValue) {
            // emi type doesnt change
        } else {
            //emi type remains same with max discount calculated
        }
    } else {
        // standard emi selected
    }
}

function emiTypeChangeDetection() {

    console.log('EMI Type Change Update')
    console.table(
        {
            'EMI Type Change': (emiTypeChange) ? ('YES') : ('NO'),
            'New EMI type': (emiTypeChange === 2) ? ('Changed to Low Cost') : ('No Change')
        }
    )
}

function emiCalculations() {
    let emiTypeFinal = '';
    let interestDiscounted = 0;
    let PrincipalNoCost = 0;
    let NoCostEmi = 0;
    let AmountAfterDiscount = 0;


    if (emiTypeChange === 2) {
        emiTypeFinal = 'Low Cost EMI';

        console.log(`${emiTypeFinal}`);
        console.table(
            {
                'Low Cost defined %': (emiTypeChange === 2) ? (`${lowCostPercentage}`) : ('NA'),
            }
        )

    } else if (emiType === 0) {
        emiTypeFinal = 'No Cost EMI'

        console.log(`${emiTypeFinal}`);
        console.table(
            {
                'No Cost EMI': (emiTypeChange === 2) ? (`${lowCostPercentage}`) : ('NA'),
            }
        )
    } else if (emiType === 1) {
        emiTypeFinal = 'Standard EMI'

        console.log(`${emiTypeFinal}`);
        console.table(
            {
                'Standard EMI': (emiTypeChange === 2) ? (`${lowCostPercentage}`) : ('NA'),
            }
        )
    }





}

initializeCalculation();
emiStandard();
emiTypeChangeDetection();
emiCalculations();


console.log('Celing Value check');

console.log('EMI Type Applicable');