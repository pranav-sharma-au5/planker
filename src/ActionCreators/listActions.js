import axios from "axios";


export function changeListName(value, index, listId) {
  const req = axios.put(`https://b964a9902209.ngrok.io/lists/${listId}`, { value, index }, { withCredentials: true })
  return {
    type: "changeListName",
    payload: { value, index }
  }
}

export function deleteList(index) {
  return {
    type: "deleteList",
    payload: index
  }
}
export function deleteListAPI(listId, boardId, index) {
  const req = axios.delete(`https://b964a9902209.ngrok.io/lists`, { params: { listId, boardId, index }, withCredentials: true })

  return req
}
export function getLists(boardId) {
  const req = axios.get(`https://b964a9902209.ngrok.io/lists/${boardId}`, { withCredentials: true })
  return (dispatch) => {
    req.then(lists => {
      console.log(lists, "getLists")
      dispatch({ type: "lists", payload: { lists: lists.data } })
    })
  }
}
export function addList(title, boardId, index) {
  return {
    type: "addList",
    payload: { title }
  }

}
export function addListAPI(title, boardId, index) {
  const req = axios.post("https://b964a9902209.ngrok.io/lists", { title, boardId, index }, { withCredentials: true })

  return req

}

export function getInviteLink(boardId) {
  if (boardId === 'clear') {
    return {
      type: "clearInvite"
    }
  }
  const req = axios.get(`https://b964a9902209.ngrok.io/invite/${boardId}`, { withCredentials: true })
  return (dispatch) => {
    req.then(invite => {
      dispatch({
        type: "invite",
        payload: invite.data
      })
    })
  }
}