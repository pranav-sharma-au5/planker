import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Create } from '@material-ui/icons';
import { Grid, Paper, makeStyles, Avatar } from '@material-ui/core'
import { Subject } from '@material-ui/icons'
import { changeCardDetails } from "../ActionCreators/cardActions";
import useInputState from "../Hooks/useInputState"
import { CardModal } from "./index"
import { Draggable } from "react-beautiful-dnd";
import splitName from "../utils.js/splitName";
import { v4 as uuid } from "uuid";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import "./ListCard.css"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: "#fff"

  },
}));

const Card = ({ el, index, listIndex, changeCardDetails }) => {
  const classes = useStyles();
  el = JSON.parse(JSON.stringify(el))
  const [open, setOpen] = useState(false)
  const [cardName, setCardName] = useState(el.title)
  const [description, setDescription] = useInputState(el.description)
  const handleClose = (element = el) => {
    element.title = cardName
    element.description = description
    console.log(element)
    changeCardDetails(element, listIndex, element.id)
    setOpen(false)

  }

  const modalProps = { open, setCardName, cardName, el, handleClose, description, setDescription, index, listIndex }
  return (
    <Draggable shouldRespectForcePress={false} draggableId={`cardId-${el.id}-listId-${el.listId}`} index={index} >
      {(provided) => {
        // console.log("rerender", cardName)
        return (
          <div ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps} >

            <Grid className="pointer" item xs  >

              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "5px"
              }} className="card">
                <Paper style={{}} onClick={() => setOpen(true)}
                  className={classes.paper}>
                  <div style={{ display: "flex" }} >

                    <div key={uuid()} style={{
                      width: "0",
                      flexWrap: "wrap",
                      flexGrow: "1",
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "row"
                    }}>
                      {el.labels.map(label =>
                        <Paper key={uuid()}
                          style={{
                            backgroundColor: label.color,
                            width: "3rem",
                            margin: "0.2rem",
                            height: "1rem"
                          }} ></Paper>
                      )}
                    </div>
                  </div>
                  {el.title}
                  <div className="card-status" >

                    {el.description &&
                      <div className="checklist-status" ><Subject fontSize="small" /> </div>
                    }
                    {el.checklist.length > 0 &&
                      <div className="checklist-status">
                        <CheckBoxIcon fontSize="small" /> {el.checklist.reduce((a, b) => a + b.isCompleted ? 1 : 0, 0)}/{el.checklist.length}

                      </div>
                    }
                  </div>
                  {/* <div onClick={(e) => e.preventDefault()} className="edit" style={{ float: "right", transform: "scale(0.5)" }} >
                    <Create />

                  </div> */}
                  <div key={uuid()}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      alignContent: "flex-end",
                      flexDirection: "row"
                    }}>
                    {el.members.map(person =>
                      <Avatar key={uuid()} style={{ transform: "scale(0.6)" }} >{splitName(person.name)}</Avatar>
                    )}
                  </div>
                </Paper>
              </div>
              <CardModal  {...modalProps} />
            </Grid>

          </div>

        )
      }}
    </Draggable >
  )
}

const mapStateToProps = ({ appReducer: { lists } }) => ({ lists })

const mapDispatchToProps = (dispatch) => bindActionCreators({ changeCardDetails }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Card)
