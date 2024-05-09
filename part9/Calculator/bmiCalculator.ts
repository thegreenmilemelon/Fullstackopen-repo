const calculateBmi = (height: number, weight: number): string => {
  const bmiIndex = weight / (height / 100) ** 2;
  let bmiCategory: string;

  switch (true) {
    case bmiIndex < 18.5:
      bmiCategory = "Underweight";
      break;
    case bmiIndex >= 18.5 && bmiIndex < 25:
      bmiCategory = "Normal weight";
      break;
    case bmiIndex >= 25 && bmiIndex < 30:
      bmiCategory = "Overweight";
      break;
    case bmiIndex >= 30:
      bmiCategory = "Obese";
      break;
    default:
      bmiCategory = "Invalid BMI";
  }

  return `BMI: ${bmiIndex.toFixed(2)} (${bmiCategory})`;
};

console.log(calculateBmi(180, 74));
