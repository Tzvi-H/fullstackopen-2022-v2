interface exerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
  exercises: number[],
  target: number
): exerciseSummary {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((hours) => hours > 0).length;
  const sum = exercises.reduce((sum, curr) => sum + curr);
  const average = sum / periodLength;
  const success = average >= target;
  return {
    periodLength,
    trainingDays,
    success,
    rating: 2,
    ratingDescription: "not too bad but could be better",
    target,
    average,
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

// { periodLength: 7,
//   trainingDays: 5,
//   success: false,
//   rating: 2,
//   ratingDescription: 'not too bad but could be better',
//   target: 2,
//   average: 1.9285714285714286 }
