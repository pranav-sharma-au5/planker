import axios from "axios";

export function changeCardDetails(card, listIndex, cardId) {
  const req = axios.put(`https://b964a9902209.ngrok.io/cards/${cardId}`, { card }, { withCredentials: true })

  return {
    type: "changeCardDetails",
    payload: { card, listIndex }
  }
}

export function deleteCard(index, listIndex) {
  return {
    type: "deleteCard",
    payload: { index, listIndex }
  }
}

export function deleteCardAPI(index, listId, cardId) {
  const req = axios.delete(`https://b964a9902209.ngrok.io/cards`, { params: { index, listId, cardId }, withCredentials: true })

  return req
}

export function addCard(title, listId) {
  console.log({ title, listId }, "card actions")
  return { type: "addCard", payload: { title, listId } }

}
export function addCardAPI(title, listId, index) {
  const req = axios.post("https://b964a9902209.ngrok.io/cards", { title, listId, index }, { withCredentials: true })

  return req

}

export function getCards(listId) {
  const req = axios.get(`https://b964a9902209.ngrok.io/cards/${listId}`, { withCredentials: true })

  return (dispatch) => {
    req.then(cards => {
      dispatch({ type: "getCards", payload: { cards: cards.data, listId } })
    })

  }
}