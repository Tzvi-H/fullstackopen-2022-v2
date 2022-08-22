function calculateBmi(height: number, weight: number): string {
  height /= 100;
  const bmi = weight / height ** 2;
  if (bmi < 18) {
    return "Underweight";
  } else if (bmi > 25) {
    return "Overweight";
  } else {
    return "Normal (healthy weight)";
  }
}

console.log(calculateBmi(180, 74));
