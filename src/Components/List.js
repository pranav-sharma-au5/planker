import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardContent, Grid, TextField, InputAdornment, IconButton, Menu, MenuItem, Box } from '@material-ui/core';
import { ViewStream as ViewStreamIcon, MoreHoriz, Visibility } from '@material-ui/icons';
import { changeListName, deleteList, deleteListAPI, getLists } from "../ActionCreators/listActions";
import { Add, ListCard } from "./index";
import useSwitch from "../Hooks/useSwitch"
import useMenu from "../Hooks/useMenu"

const List = ({ changeListName, index, el, deleteList, placeholder, getLists, board }) => {

  const [listName, setListName] = useState(el.title)
  const [anchorEl, handleClick, handleClose] = useMenu(null);
  const [addSwitch, setAddSwitch] = useSwitch(false)
  const [watchSwitch, setWatchSwitch] = useSwitch(false)

  const handleNameChange = (() => {
    if (listName) {
      console.log("chnaged")
      changeListName(listName, index, el.id)
    }
    else {
      setListName(el.title)
    }
  })
  const handleDelete = () => {
    deleteList(index)
    deleteListAPI(el.id, board.id, el.index).then(() => getLists(board.id))

  }
  return (


    <Grid container direction="column" item xs={10}  >

      <Card style={{ position: "relative", padding: "0.5rem", backgroundColor: "#ffffffd4" }} >
        <CardContent className="shadow"  >
          <TextField className="list-name" onKeyPress={(e) => e.keyCode === 13 ? handleNameChange() : "nothing"}
            onChange={e => setListName(e.target.value)}
            onBlur={() => handleNameChange()}
            value={listName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ViewStreamIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClick} >
                    <MoreHoriz fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { setAddSwitch(true); handleClose() }}>Add Card</MenuItem>
            <MenuItem onClick={() => { setWatchSwitch(); handleClose() }}> Watch{watchSwitch ? <span>&nbsp;  &#10003; </span> : ""} </MenuItem>
            <MenuItem onClick={handleDelete}>Delete this list</MenuItem>
          </Menu>

          <Visibility className={watchSwitch ? "" : "d-none"}
            fontSize="small"
            style={{ position: "absolute", right: "0.2rem ", top: "0.2rem", transform: "scale(0.8)" }} />
        </CardContent>

        {el.cards.map((card, cardIndex) =>
          <ListCard key={`list${index}card${cardIndex}`} el={card} listIndex={index} index={cardIndex} />
        )}
        <div style={{ marginBottom: "5px" }} >
          {placeholder}
        </div>
        <CardActions>
          <Grid className="khiskao" item  >

            <Add type="Card" el={el} size="small" addSwitch={addSwitch} setAddSwitch={setAddSwitch} index={index} />
          </Grid>
        </CardActions>
      </Card>
    </Grid>

  )
}

const mapStateToProps = ({ appReducer: { board } }) => {
  return { board }
}


export default connect(mapStateToProps, { changeListName, deleteList, getLists })(List)
