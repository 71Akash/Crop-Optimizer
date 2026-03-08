export function getBacktrackPath(dp, crops, capacity) {

  const path = [];

  let i = crops.length;
  let w = capacity;

  while (i > 0) {

    const cell = { i, j: w };

    if (dp[i][w] !== dp[i-1][w]) {

      cell.action = "select";
      cell.crop = crops[i-1];

      w -= crops[i-1].land;

    } else {

      cell.action = "skip";
      cell.crop = crops[i-1];

    }

    path.push(cell);

    i--;

  }

  path.push({ i:0, j:w });

  return path;

}