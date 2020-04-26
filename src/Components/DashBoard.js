import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Dashboard, Assessment, Home as HomeIcon, Add, Person, Close, DoneOutline, Cancel } from '@material-ui/icons';
import { Modal, TextField, Button, Typography } from '@material-ui/core'
import { addBoard, getBoards, deleteBoard } from "../ActionCreators/boardActions"
import useInputState from '../Hooks/useInputState';
import { Link, Redirect } from "react-router-dom";
import uuid from "uuid/v4";


export const DashBoard = ({ boards, addBoard, backgrounds, getBoards, goToBoard }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle, resetTitle] = useInputState("")
  const [backgroundUrlIndex, setBackgroundUrlIndex] = useState(0)

  const handleClose = () => {
    setOpen(false)
  }
  const handleCreateBoard = () => {
    const backgroundUrl = backgrounds[backgroundUrlIndex]
    addBoard(title, backgroundUrl)
    resetTitle()
    setOpen(false)
  }

  useEffect(() => {
    console.log("get boards")
    getBoards()
  }, [getBoards])

  const handleBoardDelete = (id) => {
    deleteBoard(id).then(() => getBoards())
  }

  return (
    <Fragment>
      <div className="banner" />
      <div className="container">
        <nav className="sidebar">
          <ul className="home-list" >
            <li>
              <div className="list-icon" ><Dashboard className="dashboard" /></div>
              <div className="listItem-title" >Boards</div>
            </li>
            <li>
              <div className="list-icon" ><Assessment /></div>
              <div className="listItem-title" >Templates</div>
            </li>
            <li>
              <div className="list-icon" ><HomeIcon /></div>
              <div className="listItem-title" >Home</div>
            </li>
            <li className="teams"  >TEAMS</li>
            <li>
              <div className="list-icon" ><Add /></div>
              <div className="listItem-title" >Create a team</div>
            </li>
          </ul>
        </nav>
        <main className="main-area" >
          <div className="personal-boards">
            <h3 className="personal-boards-heading" ><Person className="person-icon" /> Personal Boards </h3>
            <div className="user-boards"  >
              {boards.map(board => (
                <div key={uuid()} style={{ backgroundImage: `url(${board.backgroundUrl})` }} className="one-user-board" >
                  {board.id == goToBoard && <Redirect to={{
                    pathname: `/boards/${board.id}/${board.title.replace(/ /g, "-")}`,
                    state: { board }
                  }} />}
                  <span onClick={() => handleBoardDelete(board.id)} className="delete-board">
                    <Cancel />
                  </span>
                  <Link to={{
                    pathname: `/boards/${board.id}/${board.title.replace(/ /g, "-")}`,
                    state: { board }
                  }}>
                    <div className="darken-background" >
                      <Typography variant="h5" >
                        {board.title}
                      </Typography>
                    </div>
                  </Link>
                </div>
              ))

              }
              <div onClick={() => setOpen(true)} className="create-user-board" >
                <p>Create New Board</p>

              </div>
              <Modal open={open}
                onClose={() => handleClose()} >

                <div className="create-board-modal" >
                  <div className="board-and-background">

                    <div style={{ backgroundImage: `url(${backgrounds[backgroundUrlIndex]})` }} className="new-board">

                      <TextField id="boardName-textfield"
                        value={title}
                        onChange={setTitle}
                        fullWidth
                        size="small" placeholder="Add Board Title" variant="outlined" />

                      <span onClick={() => handleClose()} ><Close className=" white pointer" /></span>

                    </div>

                    <div className="board-background">

                      {backgrounds.map((img, index) =>
                        <div key={uuid()} className="board-select-background-container" >
                          <img onClick={() => setBackgroundUrlIndex(index)}
                            src={img} className="board-select-background" alt="" />

                          {index === backgroundUrlIndex &&
                            <div>
                              <DoneOutline htmlColor="white" className="tick-background" />
                            </div>}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="add-board-button-container" >
                    <Button onClick={handleCreateBoard} variant="contained" color="primary">
                      Create Board
                        </Button>
                  </div>

                </div>
              </Modal>
            </div>
          </div>
        </main>
      </div>

    </Fragment>
  )
}


const mapStateToProps = ({ homeReducer: { boards, backgrounds, goToBoard } }) => ({ boards, backgrounds, goToBoard })


export default connect(mapStateToProps, { addBoard, getBoards })(DashBoard)
