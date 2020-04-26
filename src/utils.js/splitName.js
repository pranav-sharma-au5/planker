export default function (name) {
  let shortName = name[0]
  for (let i = 0; i < name.length; i++) {
    if (name[i - 1] === " ") {
      shortName += name[i]
    }
  }
  return shortName
}