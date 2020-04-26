export default function ifExistsInJson(json, element) {
  for (let i of json) {
    console.log(i, element)
    if (i.id === element.id) {

      return true
    }
  }
  return false
}