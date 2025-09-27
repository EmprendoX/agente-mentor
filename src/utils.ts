export function clamp(value: number, min = 0, max = 1) {
  if (Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function movingAverage(prev: number, next: number, weight: number) {
  const w = clamp(weight, 0, 1);
  return prev * (1 - w) + next * w;
}
