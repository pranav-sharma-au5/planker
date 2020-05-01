import findById from "../utils.js/findById";

const initialState = {
  board: null,
  lists: [],
  images: [],
  boardMembers: [],
  boardLabels: [],
  update: true,
  loading: false
}

export default function appReducer(state = initialState, action) {
  const stateCopy = JSON.parse(JSON.stringify(state))
  switch (action.type) {

    case "board": {
      const board = action.payload
      stateCopy.board = board
      stateCopy.boardLabels = board.labels
      stateCopy.boardMembers = board.boardMembers
      return stateCopy
    }
    case "boards": {
      return initialState
    }
    case "invite": {
      const inviteToken = action.payload.token
      stateCopy.board.invite = `https://planker.netlify.app/invite/${inviteToken}`
      return stateCopy
    }
    case "clearInvite": {
      stateCopy.board.invite = null
      return stateCopy
    }
    case "lists":
      const { lists } = action.payload
      const update = stateCopy.update
      stateCopy.update = false
      stateCopy.lists = lists
      return update ? stateCopy : state;
    case "getCards":
      console.log(action.payload, "getCards")
      const { cards, listId } = action.payload
      const listIndex = findById(stateCopy.lists, listId)
      stateCopy.lists[listIndex].cards = cards
      return stateCopy;
    case "changeListName":
      {
        const { index, value } = action.payload
        if (value)
          stateCopy.lists[index].title = value
        return stateCopy
      }
    case "changeCardDetails":
      {
        const { card, card: { index }, listIndex } = action.payload
        if (card) {
          stateCopy.lists[listIndex].cards[index] = card
        }
        return stateCopy
      }
    case "addList":
      {
        console.log(action.type, "addList reducer")
        const { title } = action.payload
        stateCopy.lists.push({ title, cards: [] })
        stateCopy.update = true
        return stateCopy
      }
    case "addCard":
      {
        const { title, listId } = action.payload
        const listIndex = findById(stateCopy.lists, listId)
        stateCopy.lists[listIndex].cards.push(
          {
            title,
            description: "",
            members: [],
            labels: [],
            dueDate: "",
            checklist: []
          })
        return stateCopy
      }

    case "getImages":
      {
        stateCopy.images = action.payload.hits
        return stateCopy
      }
    case "deleteList": {
      const deleteIndex = action.payload
      stateCopy.lists.splice(deleteIndex, 1)
      stateCopy.update = true
      return stateCopy
    }
    case "sort": {
      stateCopy.update = true
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId
      } = action.payload
      const listIndex = parseInt(droppableIdStart.split("-")[1])
      if (draggableId[0] === "c") {//for cards
        if (droppableIdStart === droppableIdEnd) {//same list
          const card = stateCopy.lists[listIndex].cards[droppableIndexStart]
          const cardsLeft = stateCopy.lists[listIndex].cards.filter((el, i) => i !== droppableIndexStart)
          stateCopy.lists[listIndex].cards = cardsLeft
          stateCopy.lists[listIndex].cards.splice(droppableIndexEnd, 0, card)
        }
        else {//different list
          const card = stateCopy.lists[listIndex].cards[droppableIndexStart]
          const droppedList = parseInt(droppableIdEnd.split("-")[1])
          const cardsLeft = stateCopy.lists[listIndex].cards.filter((el, i) => i !== droppableIndexStart)
          stateCopy.lists[listIndex].cards = cardsLeft
          stateCopy.lists[droppedList].cards.splice(droppableIndexEnd, 0, card)
        }
      }
      else {//for lists
        if (droppableIndexEnd !== droppableIndexStart) {
          const moveList = stateCopy.lists[droppableIndexStart]
          stateCopy.lists.splice(droppableIndexStart, 1)
          stateCopy.lists.splice(droppableIndexEnd, 0, moveList)
          // console.log(stateCopy.lists)
        }
      }

      return stateCopy
    }
    case "deleteCard":
      {
        const { index, listIndex } = action.payload
        stateCopy.lists[listIndex].cards.splice(index, 1)
        return stateCopy
      }

    default:
      return stateCopy
  }

} 