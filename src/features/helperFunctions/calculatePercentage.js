const calculatePercentage = (percent, valuesArray) => {
  let total = valuesArray.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  return (percent / total) * 100;
};

export default calculatePercentage;
