interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

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

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
