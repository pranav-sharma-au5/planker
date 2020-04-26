import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import "./Modal.css";
import { Note, Subject, Person, Label, DoneAll, Schedule, Attachment, Delete, AccountCircle, Cancel } from '@material-ui/icons';
import { Grid, Paper, Modal, Container, TextField, InputAdornment, Typography, MenuItem, Menu, Avatar } from '@material-ui/core'
import { List } from '@material-ui/core'
import useMenu from '../Hooks/useMenu';
import { v4 as uuid } from "uuid";
import splitName from "../utils.js/splitName";
import { deleteCard, deleteCardAPI, } from "../ActionCreators/cardActions"
import Add from './Add'
import useSwitch from "../Hooks/useSwitch"
import CheckListItem from "./CheckListItem";
import ifExistsInJson from "../utils.js/ifExistsInJson";

export const CardModal =
  ({
    open,
    setCardName,
    el, handleClose,
    description,
    setDescription,
    deleteCard,
    index,
    listIndex,
    boardMembers,
    boardLabels,
    cardName
  }) => {
    el = JSON.parse(JSON.stringify(el))

    const [anchorEl, handleMenuClick, handleMenuClose] = useMenu(null);//Add Members
    const [anchorLabel, handleLabelMenuClick, handleLabelMenuClose] = useMenu(null);//Add Labels
    const [checkListSwitch, setCheckListSwitch] = useSwitch(false);
    const [addSwitch, setAddSwitch] = useSwitch(false);
    const [elLocal, setElLocal] = useState(el)
    const addMemberToCard = (num) => {
      const elLocalCopy = JSON.parse(JSON.stringify(elLocal))
      const existingMembers = elLocalCopy.members
      const newMember = boardMembers[num]
      //check if already exists
      const flag = ifExistsInJson(existingMembers, newMember)
      if (!flag) {
        existingMembers.push(newMember)
        console.log(elLocalCopy)
        setElLocal(elLocalCopy)
      }
      handleMenuClose()
    }
    const addLabelToCard = (num) => {
      const elLocalCopy = JSON.parse(JSON.stringify(elLocal))
      const existingLabels = elLocalCopy.labels
      const newLabel = boardLabels[num]
      const flag = ifExistsInJson(existingLabels, newLabel)

      if (!flag) {
        existingLabels.push(newLabel)
        setElLocal(elLocalCopy)
      }
      handleLabelMenuClose()
    }
    const deleteLabel = (id) => {
      const elLocalCopy = JSON.parse(JSON.stringify(elLocal))
      const existingLabels = elLocalCopy.labels
      const newLabels = existingLabels.filter(el => el.id !== id)
      elLocalCopy.labels = newLabels
      setElLocal(elLocalCopy)

    }
    const deleteMember = (id) => {
      const elLocalCopy = JSON.parse(JSON.stringify(elLocal))
      const existingMembers = elLocalCopy.members
      const newMembers = existingMembers.filter(el => el.id !== id)
      elLocalCopy.members = newMembers
      setElLocal(elLocalCopy)

    }
    const deleteTask = (index) => {
      const elLocalCopy = JSON.parse(JSON.stringify(elLocal))
      const existingTasks = elLocalCopy.checklist
      const newTasks = existingTasks.filter((el, i) => i !== index)
      elLocalCopy.checklist = newTasks
      setElLocal(elLocalCopy)

    }

    const addTask = (task) => {
      const elLocalCopy = JSON.parse(JSON.stringify(elLocal))

      elLocalCopy.checklist.push(task)
      setElLocal(elLocalCopy)

    }
    const changeList = (item, index) => {
      const elLocalCopy = JSON.parse(JSON.stringify(elLocal))
      console.log(item, index)
      elLocalCopy.checklist[index] = item
      setElLocal(elLocalCopy)
    }

    const handleNameChange = (inputValue) => {
      if (inputValue) {

        setCardName(inputValue)
      }
      else {
        setCardName(elLocal.title)
      }
    }

    const handleDelete = () => {
      deleteCard(index, listIndex)
      deleteCardAPI(index, el.listId, el.id)
    }

    return (
      <Modal style={{ overflow: "auto" }} open={open}
        onClose={() => handleClose(elLocal)} >
        <div className="modal-div " >
          <Container>
            <Grid container justify="space-between" >

              <Grid item lg={10} >
                <TextField fullWidth
                  className="list-name"
                  onBlur={(e) => handleNameChange(e.target.value)}
                  defaultValue={cardName}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Note />
                      </InputAdornment>
                    ),
                  }} />
              </Grid>
              <Grid  >
                <span
                  className="modal-close"
                  onClick={() => handleClose(elLocal)}  >
                  X
                </span>
              </Grid>
            </Grid>
            <br />


            <Grid container  >


              <Grid item lg={8}>
                {elLocal.members.length > 0 && <div>

                  <Typography variant="overline" display="block" gutterBottom>
                    Members
                   </Typography>
                  <Grid container className="card-members" style={{ marginBottom: "0.2rem" }}  >
                    {elLocal.members.map(person =>
                      <div key={uuid()} className="card-member">
                        <Avatar  >{splitName(person.name)}</Avatar>
                        <div className="member-fullname" >
                          <Cancel onClick={() => deleteMember(person.id)} className="delete-member" />
                        </div>

                      </div>)}
                  </Grid>
                </div>}
                {elLocal.labels.length > 0 && <div>

                  <Typography variant="overline" display="block" >
                    Labels
                  </Typography>
                  <Grid container className="card-labels" style={{ marginBottom: "0.2rem" }}  >
                    {elLocal.labels.map(label =>
                      <div key={uuid()} className="card-label">
                        <Paper style={{ backgroundColor: label.color, width: "3rem", height: "2rem" }} ></Paper>
                        <div className="label-fullname" >
                          <Cancel onClick={() => deleteLabel(label.id)} className="delete-label" />
                          {/* {person.name} */}
                        </div>
                      </div>)}
                  </Grid>
                </div>}
                <Grid direction="row"
                  justify="flex-start"
                  alignItems="center"
                  container >

                  <Subject />
                  <Typography>
                    Description
                </Typography>
                </Grid>
                <TextField
                  defaultValue={description}
                  onBlur={(e) => setDescription(e)}
                  fullWidth
                  // label="Add details"
                  multiline
                  rows="4"
                  variant="outlined"
                />
                {
                  (checkListSwitch || !!elLocal.checklist.length) &&
                  <Grid container >
                    <List className='card-checklist'  >
                      <Typography variant="overline"  >
                        CHECKLIST
                </Typography>

                      {elLocal.checklist.map((el, index) => (
                        <CheckListItem deleteTask={deleteTask} el={el} index={index} changeList={changeList} key={index} />

                      ))}
                      <Add
                        el={el}
                        size="small"
                        setAddSwitch={setAddSwitch}
                        addSwitch={addSwitch}
                        addTask={addTask}
                        type="Task" />
                    </List>
                  </Grid>
                }
              </Grid>
              <Grid item lg={3} >
                <Grid className="card-options" justify="center" alignContent="flex-start" container >
                  <Typography gutterBottom={false} variant="overline">
                    ADD TO CARD
                  </Typography>
                  <Grid className="modal-add-option pointer " item xs={12}>
                    <Paper onClick={handleMenuClick}
                      className="modal-add-option-paper">
                      <Grid direction="row" justify="space-between" alignItems="center" container >
                        <Person />
                        <Typography variant="button" gutterBottom >
                          Add Members
                        </Typography>
                      </Grid>
                    </Paper>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {boardMembers.map((el, num) =>
                        <MenuItem key={uuid()} onClick={() => addMemberToCard(num)}> <AccountCircle /> {el.name}</MenuItem>
                      )}
                    </Menu>
                  </Grid>
                  <Grid className="modal-add-option pointer " item xs={12}>
                    <Paper onClick={handleLabelMenuClick} className="modal-add-option-paper">
                      <Grid direction="row" justify="space-between" alignItems="center" container >
                        <Label />
                        <Typography variant="button" gutterBottom >
                          Labels
                        </Typography>
                      </Grid>
                    </Paper>
                    <Menu
                      style={{ padding: "1rem" }}
                      anchorEl={anchorLabel}
                      open={Boolean(anchorLabel)}
                      onClose={handleLabelMenuClose}
                    >
                      {boardLabels.map((el, num) =>
                        <MenuItem style={{ backgroundColor: el.color, width: "10rem", padding: "1rem", margin: "0.4rem" }}
                          key={uuid()} onClick={() => addLabelToCard(num)}> <Paper /></MenuItem>
                      )}
                    </Menu>
                  </Grid>
                  <Grid className="modal-add-option pointer " item xs={12}>
                    <Paper onClick={() => setCheckListSwitch()} className="modal-add-option-paper">
                      <Grid direction="row" justify="space-between" alignItems="center" container >
                        <DoneAll />
                        <Typography variant="button" gutterBottom >
                          Checklist
                        </Typography>
                      </Grid>
                    </Paper>


                  </Grid>
                  <Grid className="modal-add-option pointer " item xs={12}>
                    <Paper className="modal-add-option-paper">
                      <Grid direction="row" justify="space-between" alignItems="center" container >
                        <Schedule />
                        <Typography variant="button" gutterBottom >
                          Due Date
                        </Typography>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid className="modal-add-option pointer " item xs={12}>
                    <Paper className="modal-add-option-paper">
                      <Grid direction="row" justify="space-between" alignItems="center" container >
                        <Attachment />
                        <Typography variant="button" gutterBottom >
                          Attachment
                        </Typography>
                      </Grid>
                    </Paper>
                  </Grid>
                  <div onClick={() => handleDelete()}
                    className="pointer"
                    style={{
                      display: "flex",
                      direction: "column",
                      width: "100%",
                      marginTop: "2rem",
                      justifyContent: "flex-end",
                      alignItems: "flex-end"
                    }} >


                    <Typography  >
                      Delete card
                   </Typography>
                    <Delete htmlColor="grey" />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Modal >

    )
  }

const mapStateToProps = ({ appReducer: { boardMembers, boardLabels } }) => ({ boardMembers, boardLabels })


export default connect(mapStateToProps, { deleteCard })(CardModal)
