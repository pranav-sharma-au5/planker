function titleCase(sentence) {
  sentence = sentence.toLowerCase()
  let wordArr = sentence.split(" ")
  for (let i in wordArr) {
    wordArr[i] = wordArr[i][0].toUpperCase() + wordArr[i].slice(1)
  }
  return wordArr.join(" ")
}

module.exports = titleCase