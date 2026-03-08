export function knapsackDP(crops, capacity) {
  
    const n = crops.length;

    const land = crops.map(c => c.land);
    const profit = crops.map(c => c.profit);
    
    const dp = Array(n+1)
        .fill(0)
        .map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (land[i-1] <= w) {
                dp[i][w] = Math.max(dp[i-1][w], profit[i-1] + dp[i-1][w - land[i-1]]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }

    return dp;
}