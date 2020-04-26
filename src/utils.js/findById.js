export default function findById(arr, id) {
  for (let i in arr) {
    if (arr[i].id === id) {
      return i
    }
  }
}