/**
 *  EMI = P x R x (1+R)^N / [(1+R)^N-1] where-
    P = Principal loan amount
    N = Loan tenure in months
    I = Yearly Interest in percentage
    R = Monthly interest rate
    The rate of interest (R) on your loan is calculated per month.
    R = Annual Rate of interest/12/100
    If rate of interest is 7.2% p.a. then r = 7.2/12/100 = 0.006
 */

    var P = 50000;
    var N = 6;
    var I = 14;
    var R = (I/12)/100;
    var r = (1 + R)**N;
    var emiN = P/N;
    var lowCost = 100; // 0 is standard EMI 100 is No cost EMI
    var celingValue = 1000; // max discount on the total emi

    /** EMI Calculation */
    function emiCalculator(R, r, P) {
        return P*R*r/(r - 1);
    }

    /** NEW Principle for No Cost EMI */
    function newPrinciple(R,r) {
        return Math.round(emiN * (r-1)/(R*r));
    }

    /** Total intrest */
    function totalInterest (P) {
        return emiCalculator(R, r, P)*N - P;
    }

    function incrementalInterestCalculator () {

    }

    /**
     * Input data for EMI Calculation
     */
    console.log('Input Data')
    console.table({
        'Principle Amount': P,
        'Annual Interest rate': I,
        'Tenure in months': N
    });

    /**
     * EMI Calculations
     */
    console.log('Calculated EMI Components')
    console.table({
        'EMI for given Principal Amount': Math.round(emiCalculator(R,r, P) * 100)/100,
        'EMI Round off': Math.round(emiCalculator(R,r, P)),
        'Total Interest Amount': Math.round(totalInterest(P)),
        'Total Amout': P + Math.round(totalInterest(P))
    });

    console.log('No Cost EMI data points')
    console.table({
        'No cost EMI': Math.round(emiN * 100)/100,
        'No cost EMI Round Off': Math.round(emiN),
        'Principal amount for No cost': newPrinciple(R,r),
        'Total Interest for No cost EMI': Math.round(totalInterest(newPrinciple(R,r))),
        'No Cost Principal Amoumt': (newPrinciple(R,r) + Math.round(totalInterest(newPrinciple(R,r)))),
        'Percentage interest discount': Math.round(Math.round( totalInterest(newPrinciple(R,r))) / (newPrinciple(R,r) + Math.round(totalInterest(newPrinciple(R,r))))*100 * 1000)/1000
    });