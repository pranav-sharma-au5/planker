import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { List } from "./index"
import { Droppable, Draggable } from "react-beautiful-dnd"
import uuid from 'uuid/v4'
import { getLists } from '../ActionCreators/listActions'

const ListParent = ({ lists, getLists, boardId }) => {
  // const [stateLists, setstateLists] = useState(lists)


  return (

    lists.map((el, index) =>
      <Draggable key={uuid()} draggableId={`list-${index}-id-${el.id}`} index={index} >
        {(provided) => (
          <div className="list"  {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps} >


            <Droppable droppableId={`list-${index}-id-${el.id}`}  >
              {(provided) => {
                return (
                  <div  {...provided.droppableProps} ref={provided.innerRef} >
                    <List placeholder={provided.placeholder} el={el} index={index} />

                  </div>
                )
              }}
            </Droppable>
          </div>
        )}
      </Draggable>
    )
  )
}

const mapStateToProps = ({ appReducer: { lists } }) => {
  return { lists }
}


export default connect(mapStateToProps, { getLists })(ListParent)
