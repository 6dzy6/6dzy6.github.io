export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function createRandomPicker(arr) {
  arr = [...arr]
  function randomPick() {
    const len = arr.length - 1
    const index = randomInt(0, len)
    const picked = arr[index];
    [arr[len], arr[index]] = [arr[index], arr[len]]// 确保不会连续取到两个重复值
    return picked
  }
  return randomPick
}