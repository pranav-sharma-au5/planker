import React, { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import useInputState from "../Hooks/useInputState";
import { connect } from 'react-redux'
import { addCard, getCards, addCardAPI } from "../ActionCreators/cardActions";
import { addList, getLists, addListAPI } from "../ActionCreators/listActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: "flex",
  },
  mt_1: {
    marginTop: "1rem",
    marginRight: "1rem"
  },
  pl_1: {
    paddingLeft: "1rem"
  },
  add: {
    cursor: 'pointer'
  },
  textFieldBackground: {
    backgroundColor: "#ffffffba",
    borderRadius: "5px"

  }
}));

const Add = ({ type, size, index, addList, getLists, addSwitch, setAddSwitch, addTask, addCard, el, getCards }) => {
  const boardId = window.location.pathname.split("/")[2]
  const [listName, setListName, resetListName] = useInputState('')



  const classes = useStyles()
  const handleAdd = async () => {
    if (!listName) {
      setAddSwitch()
      return
    }

    if (type === 'Task') {
      addTask({ title: listName, isCompleted: false })
      resetListName()
      return
    }
    if (listName && type === "List") {
      addList(listName)
      resetListName()
      addListAPI(listName, boardId, el.length).then(() => getLists(boardId))


      return
    }
    if (listName && type === "Card") {
      console.log(el)
      addCard(listName, el.id)
      addCardAPI(listName, el.id, el.cards.length).then(() => getCards(el.id))
      resetListName()
      return
    }


  }

  return (
    <div style={{ transform: size === "small" ? "scale(0.9)" : "scale(1)", width: "100%" }}  >

      <Grid item xs>
        <div className={addSwitch ? "d-none" : ""} >
          <Paper onClick={() => setAddSwitch(true)} className={`${classes.paper} ${classes.add}`}>

            <AddIcon /> Add a {type}
          </Paper>
        </div>

        <Grid className={"add-input  " + (addSwitch ? "" : "d-none")} container direction="column" justify='space-around'  >

          <TextField onChange={setListName}
            onKeyPress={e => e.key === "Enter" ? handleAdd() : "nothing"}
            value={listName}
            label={type + " name"}
            variant="outlined"
            size={size}

            className={classes.textFieldBackground}
          />
          <Grid   >


            <Button onClick={handleAdd}
              size="small"
              className={classes.mt_1}
              variant="contained"
              color="primary">
              Add
               </Button>
            <Button onClick={() => setAddSwitch(false)}
              size="small" className={classes.mt_1} variant="contained"  >
              X
               </Button>
          </Grid>
        </Grid>

      </Grid>
    </div >
  );
}
const mapState = ({ appReducer: { lists } }) => {
  return { lists }
}


export default connect(mapState, { addList, getLists, addCard, getCards })(Add);