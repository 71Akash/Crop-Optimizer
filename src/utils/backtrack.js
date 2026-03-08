export function getSelectedCrops(dp, crops, capacity) {
    const selected = [];
    let w = capacity;
    let i = crops.length;

    while (i > 0 && w > 0) {
        if (dp[i][w] !== dp[i-1][w]) {
            selected.push(crops[i-1]);
            w -= crops[i-1].land;
        }
        i--;
    }
    return selected.reverse();
}