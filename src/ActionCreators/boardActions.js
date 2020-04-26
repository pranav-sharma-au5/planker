// const API = "15890718-55876e143edace3cc46a1ed86"
import titleCase from "../utils.js/titleCase";
import axios from "axios";
const pixabay = `https://pixabay.com/api/?key=15890718-55876e143edace3cc46a1ed86&`

export function getImages(query) {
  const req = axios.get(`${pixabay}q=${query}&image_type=photo `)

  return (dispatch) => {
    req.then(pics => {
      dispatch({
        type: "getImages",
        payload: pics.data
      })
    })
      .catch(err => { throw err })
  }


}

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => {
  const payload = {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
  }

  return ({
    type: "sort",
    payload
  })
}

export function sortAPI(
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId) {
  const payload = {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
  }

  if (draggableId[0] === "c") {//for cards
    return axios.put("https://planker-be.herokuapp.com/drag/cards", payload, { withCredentials: true })
  }
  else {
    return axios.put("https://planker-be.herokuapp.com/drag/lists", payload, { withCredentials: true })
  }
}

export function addBoard(title, backgroundUrl) {

  const req = axios.post("https://planker-be.herokuapp.com/boards", { title, backgroundUrl }, { withCredentials: true })

  return (dispatch) => {
    req.then(boards => {
      dispatch({ type: "boards", payload: boards.data })
    })
  }

}
export function signup(email, password, name, boardToken) {

  const req = axios.post("https://planker-be.herokuapp.com/users/signup", { email, password, name: titleCase(name), boardToken }, { withCredentials: true })

  return (dispatch) => {
    req.then(done => {
      console.log(done)
      dispatch({ type: "signup", payload: done.data.valid })
    })
  }
}

export function login(email, password, boardToken) {

  const req = axios.post("https://planker-be.herokuapp.com/users", { email, password, boardToken }, { withCredentials: true })
  console.log("logging in")
  return (dispatch) => {
    req.then(done => {
      dispatch({ type: "login", payload: done.data.valid })
    })
  }
}
export function checkToken(boardToken) {
  console.log("check token request")
  const req = axios.post("https://planker-be.herokuapp.com/login", { boardToken }, { withCredentials: true })
  return (dispatch) => {
    req.then(res => {
      console.log(res)
      dispatch({
        type: "checkToken",
        payload: res.data
      })
    })
      .catch(err => {
        dispatch({
          type: "checkToken",
          payload: { valid: false }
        })
      })
  }
}

export function getBoards() {

  const req = axios.get("https://planker-be.herokuapp.com/boards", { withCredentials: true })
  return (dispatch) => {
    req.then(boards => {
      console.log(boards.data)
      dispatch({ type: "boards", payload: boards.data })
    })
  }
}
export function deleteBoard(boardId) {

  const req = axios.delete(`https://planker-be.herokuapp.com/boards/${boardId}`, { withCredentials: true })
  return req
}


export function getBoard(boardId) {
  const req = axios.get(`https://planker-be.herokuapp.com/boards/${boardId}`, { withCredentials: true })
  return (dispatch) => {
    req.then(board => {
      dispatch({
        type: "board",
        payload: board.data
      })
    })
  }
}

export function setBgAPI(boardId, backgroundUrl) {
  const req = axios.post(`https://planker-be.herokuapp.com/boards/${boardId}`, { backgroundUrl }, { withCredentials: true })
  return req
}


