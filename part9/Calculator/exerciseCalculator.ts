interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArguments {
  target: number;
  hours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");

  let target = Number(args[2]);
  if (!isNaN(target)) {
    return {
      target,
      hours: args.slice(3).map(Number),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
console.log(process.argv.slice(3).map(Number));

const calculateExercises = (
  hours: number[],
  target: number
): ExerciseValues => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hours) => hours > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average > target;
  const rating = success ? 3 : 1;
  const ratingDescription = success ? "good" : "bad";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2.5));
// console.log(calculateExercises(5, 2.5));

try {
  const { target, hours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
