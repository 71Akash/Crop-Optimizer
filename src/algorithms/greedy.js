export function greedySelection(crops, capacity) {
  
    const sorted = [...crops].sort(
    (a, b) => b.profit - a.profit
  );

  let remaining = capacity;
  let totalProfit = 0;
  const selected = [];
  for (let crop of sorted) {
    if (crop.land <= remaining) {
      selected.push(crop);
      totalProfit += crop.profit;
      remaining -= crop.land;
    }
  }
  return {
    totalProfit,
    selected
  };
}