const establishments = [
  { id: "T", value: "Theatre", time: 5, earning: 1500 },
  { id: "P", value: "Pub", time: 4, earning: 1000 },
  { id: "C", value: "Commercial Park", time: 10, earning: 3000 },
];

function findCombinations(n, nums = [4, 5, 10]) {
  const result = [];

  function backtrack(current, sum) {
    if (sum > n) return;
    result.push([...current]);
    for (let num of nums) {
      current.push(num);
      backtrack(current, sum + num);
      current.pop();
    }
  }

  backtrack([], 0);
  return result.filter((numArr) => numArr.length);
}

function getTotalTheatreOperatingTime(n, tCount, key) {
  let totalTime = 0;
  for (let i = 1; i <= tCount; i++) {
    totalTime += n - i * key;
  }
  return totalTime;
}

function maxProfit(n) {
  const combinations = findCombinations(n);
  const resultArr = combinations.reduce((acc, curr) => {
    const tCount = curr.filter((num) => num === 5).length;
    const pCount = curr.filter((num) => num === 4).length;
    const cCount = curr.filter((num) => num === 10).length;

    const tEarnings = getTotalTheatreOperatingTime(n - pCount * 4 - cCount * 10, tCount, 5) * 1500;
    const pEarnings = getTotalTheatreOperatingTime(n - tCount * 5 - cCount * 10, pCount, 4) * 1000;
    const cEarnings = getTotalTheatreOperatingTime(n - pCount * 4 - tCount * 5, cCount, 10) * 3000;
    const earnings = tEarnings + pEarnings + cEarnings;

    const obj = { earnings: earnings, options: { T: tCount, P: pCount, C: cCount } };

    return [...acc, obj];
  }, []);

  return [...resultArr]
    .sort((a, b) => a.earnings - b.earnings)
    .reduce((acc, curr) => {
      let arr = [...acc, curr];
      arr = arr.filter((item) => item.earnings >= curr.earnings);
      return arr;
    }, [])
    .filter(
      (obj, index, self) =>
        index === self.findIndex((o) => JSON.stringify(o) === JSON.stringify(obj))
    );
}

// Test cases
console.log(maxProfit(7));
console.log(maxProfit(8));
console.log(maxProfit(13));
