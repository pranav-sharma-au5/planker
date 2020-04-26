import { useState } from "react";

export default initialVal => {
  const [bool, setBool] = useState(!!initialVal)
  const handleClick = (value = !bool) => {
    console.log("called switch")
    setBool(value)
  }
  return [bool, handleClick]
}
