/**
 * Begin challenge 1 functions
 */
const periodTypeToDays = (periodType) => {
  switch (periodType) {
    case 'weeks':
      return 7;
    case 'months':
      return 30;
    default:
      return 1;
  }
};

const factorial = (periodType, timeToElapse) => 2 ** Math.trunc(
  (periodTypeToDays(periodType) * timeToElapse) / 3
);
// End of challenge 1 functions

/**
 * Beginning of challenge 2 functions
 */

const fifteenPercentile = (infectionsByRequestedTime) => Math.trunc(
  0.15 * infectionsByRequestedTime
);

const availableBeds = (
  totalHospitalBeds,
  severeCasesByRequestedTime
) => {
  const availableBedSpace = 0.35 * totalHospitalBeds;
  return Math.trunc(
    availableBedSpace - severeCasesByRequestedTime
  );
};
// End of challenge 2 functions

/**
 * Beginning of challenge 3 functions
 */

const ICUCare = (infectionsByRequestedTime) => {
  Math.trunc(0.05 * infectionsByRequestedTime);
};


const ventilators = (infectionsByRequestedTime) => {
  Math.trunc(0.02 * infectionsByRequestedTime);
};

const calculateDollarsInFlight = (
  avgDailyIncomeInUSD, avgDailyIncomePopulation,
  infectionsByRequestedTime, periodType, timeToElapse
) => {
  const period = periodTypeToDays(periodType) * timeToElapse;
  const dollarsInFlight = Math.trunc((infectionsByRequestedTime * avgDailyIncomePopulation
    * avgDailyIncomeInUSD) / period);
  return { dollarsInFlight };
};

// End of challenge 3 functions

const covid19ImpactEstimator = (data) => {
  const output = {
    data, // the input data you got
    impact: {}, // your best case estimation
    severeImpact: {} // your severe case estimation
  };

  const {
    timeToElapse,
    reportedCases,
    periodType,
    totalHospitalBeds
  } = data;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;

  const { impact, severeImpact } = output;

  // Challenge 1
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  impact.infectionsByRequestedTime = impact.currentlyInfected
  * factorial(periodType, timeToElapse);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected
  * factorial(periodType, timeToElapse);

  // Challenge 2
  impact.severeCasesByRequestedTime = fifteenPercentile(
    impact.infectionsByRequestedTime
  );
  severeImpact.severeCasesByRequestedTime = fifteenPercentile(
    impact.infectionsByRequestedTime
  );

  impact.hospitalBedsByRequestedTime = availableBeds(
    totalHospitalBeds,
    impact.severeCasesByRequestedTime
  );

  severeImpact.hospitalBedsByRequestedTime = availableBeds(
    totalHospitalBeds,
    severeImpact.severeCasesByRequestedTime
  );

  // Challenge 3
  impact.casesForICUByRequestedTime = ICUCare(impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = ICUCare(
    severeImpact.infectionsByRequestedTime
  );

  impact.casesForVentilatorsByRequestedTime = ventilators(
    impact.infectionsByRequestedTime
  );

  severeImpact.casesForVentilatorsByRequestedTime = ventilators(
    severeImpact.infectionsByRequestedTime
  );

  impact.dollarsInFlight = calculateDollarsInFlight(
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    impact.infectionsByRequestedTime,
    periodType,
    timeToElapse
  );

  severeImpact.dollarsInFlight = calculateDollarsInFlight(
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    severeImpact.infectionsByRequestedTime,
    periodType,
    timeToElapse
  );

  return output;
};

export default covid19ImpactEstimator;
