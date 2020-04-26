import React, { useState } from 'react';
import { Grid, Drawer, Typography, Divider, makeStyles, fade } from '@material-ui/core';
import { Panorama } from '@material-ui/icons';
import { connect } from 'react-redux'
import { Add, ListParent } from "./index"
import { getImages, sort, setBgAPI, getBoard, sortAPI } from "../ActionCreators/boardActions"
import { changeListName, getLists } from "../ActionCreators/listActions";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useSwitch from "../Hooks/useSwitch"
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect } from 'react';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },

  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function Board({ images, getImages, sort, lists, getLists, board, getBoard }) {


  const boardId = parseInt(window.location.pathname.split("/")[2])
  const [backgroundUrl, setBackgroundUrl] = useState('')
  const [toggleDrawer, settoggleDrawer] = useSwitch(false)
  const [addSwitch, setAddSwitch] = useSwitch(false)
  useEffect(() => {
    if (!board) {
      getBoard(boardId)
    }
    else if (backgroundUrl !== board.backgroundUrl) {
      setBackgroundUrl(board.backgroundUrl.replace("640", "1280"))
    }
  }, [board, backgroundUrl, boardId, getBoard,])


  useEffect(() => {
    getLists(boardId)
  }, [getLists, boardId])


  const handleBgChange = (link) => {
    const bgUrl = link.previewURL.replace("150", "1280")
    setBackgroundUrl(bgUrl)
    setBgAPI(boardId, bgUrl).then(() => getBoard(boardId))

  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    console.log(result)
    if (!destination) {
      return
    }
    sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    )
    sortAPI(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    ).then(() => getLists(boardId))
    // console.log(destination.index)
  }

  const styles = {
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: "cover",
    flex: 1,
    backgroundPosition: "50%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "1rem"
  }

  const [search, setSearch] = useState("Scenic")
  useEffect(() => {
    if (!images.length) {
      getImages(search)
    }
  }, [getImages, images.length, search])


  const handleSearch = (e) => {
    console.log(e.target.value, search)
    if (e.target.value.length > search.length && search.length > 1) {
      getImages(e.target.value)
      setSearch(e.target.value)
    }
    else setSearch(e.target.value)
  }


  const classes = useStyles();
  return (
    <div style={{ ...styles }}>
      <div className="whitish" >
        <Panorama className="pointer" onClick={settoggleDrawer}
          style={{
            position: "absolute",
            right: 0, marginRight: "1rem",
            backgroundColor: "rgb(220, 220, 220)",
            padding: "0.3rem",
            borderRadius: "5px"
          }} />


      </div>

      <Drawer

        className={toggleDrawer ? `` : "d-none"}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Typography style={{ margin: "0.5rem" }} variant="overline" >Change background
                        <span style={{ float: "right" }} className="pointer" onClick={() => settoggleDrawer()}  >Close </span>
        </Typography>
        <Divider />

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={search}
            onChange={handleSearch}
            inputProps={{ 'aria-label': 'search' }}

          />
        </div>
        <Divider />
        <Grid container>

          {images.map((link, index) => (
            <Grid key={index}
              className="pointer" onClick={() => handleBgChange(link)}
              style={{ justifyContent: "center", display: "flex" }} item lg={6}>
              <img style={{ height: "15vh", borderRadius: "10px", marginTop: "1rem", width: "80%" }}
                src={link.webformatURL} alt="" />
            </Grid>
          ))}
        </Grid >

        <Divider />
      </Drawer>
      <Grid container className="one-line" direction="row"  >

        <DragDropContext onDragEnd={onDragEnd}  >
          <Droppable droppableId={`all-list#${boardId}`} direction="horizontal" type="list"  >
            {(provided) => (

              <div className="list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Grid container direction="row" style={{ flexWrap: "nowrap" }} justify="flex-start" spacing={1}   >
                  <ListParent />
                  {provided.placeholder}
                </Grid>

              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="list-column" >
          <Add boardId={boardId} type="List" el={lists} addSwitch={addSwitch} setAddSwitch={setAddSwitch} />
        </div>
      </Grid>
    </div>
  )
}

const mapState = ({ appReducer: { images, lists, board } }) => {
  return { images, lists, board }
}

export default connect(mapState, { getImages, sort, changeListName, getLists, getBoard })(Board);

