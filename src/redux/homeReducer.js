const defaultUrl = 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1281x1920/e228341961347e1142cb72b1c07520c1/photo-1585582554624-641ed48e7d93.jpg'
const defaultUrl2 = "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/f794123ca08d4fda79e3dae3d247a25f/photo-1506617564039-2f3b650b7010.jpg"
const initialState = {
  boards: [
    // {
    //   title: "my board 1",
    //   backgroundUrl: defaultUrl,
    //   id: 1
    // },
  ],
  backgrounds:
    ["https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_640.jpg",
      "https://cdn.pixabay.com/photo/2014/09/07/22/17/forest-438432_640.jpg",
      "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg",
      "https://cdn.pixabay.com/photo/2016/10/22/17/46/scotland-1761292_640.jpg",
      "https://cdn.pixabay.com/photo/2014/08/01/00/08/pier-407252_640.jpg",
      "https://cdn.pixabay.com/photo/2016/11/06/05/36/landscape-1802337_640.jpg",
      "https://cdn.pixabay.com/photo/2013/11/15/13/57/california-210913_640.jpg",
      "https://cdn.pixabay.com/photo/2016/08/11/23/55/redwood-national-park-1587301_640.jpg",
      // "https://cdn.pixabay.com/photo/2015/08/15/00/58/hills-889131_640.jpg",
      // "https://cdn.pixabay.com/photo/2014/09/10/00/59/utah-440520_640.jpg",
      // "https://cdn.pixabay.com/photo/2013/04/04/12/34/sunset-100367_640.jpg",
      // "https://cdn.pixabay.com/photo/2017/01/16/19/40/mountains-1985027_640.jpg",
      // "https://cdn.pixabay.com/photo/2016/07/30/00/03/winding-road-1556177_640.jpg",
      // "https://cdn.pixabay.com/photo/2016/10/21/09/25/sunset-1757593_640.jpg",
      // "https://cdn.pixabay.com/photo/2016/09/19/07/01/lake-irene-1679708_640.jpg",
      // "https://cdn.pixabay.com/photo/2016/08/26/17/33/landscape-1622739_640.jpg",
      // "https://cdn.pixabay.com/photo/2015/07/05/13/44/beach-832346_640.jpg",
      // "https://cdn.pixabay.com/photo/2015/09/05/04/27/milky-way-923738_640.jpg",
      // "https://cdn.pixabay.com/photo/2017/02/19/15/28/winter-2080070_640.jpg",
      "https://cdn.pixabay.com/photo/2013/06/12/22/20/zion-park-139012_640.jpg"],
  tokenVerified: false


}

function homeReducer(state = initialState, action) {
  const stateCopy = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'boards':
      stateCopy.boards = action.payload
      return stateCopy;
    case 'login': {
      const flag = action.payload
      console.log(flag)
      if (flag) {
        localStorage.setItem('isLoggedIn', flag)
      }
      else {
        localStorage.clear()
      }
      return stateCopy
    }
    case 'signup': {
      const flag = action.payload
      if (flag)
        localStorage.setItem('isLoggedIn', flag)
      return stateCopy
    }
    case 'checkToken':
      const { valid, boardId } = action.payload
      if (valid) {
        console.log("time", action.payload)
        stateCopy.tokenVerified = true
        localStorage.setItem('isLoggedIn', valid)
        stateCopy.goToBoard = boardId
        return stateCopy
      }
      localStorage.removeItem("isLoggedIn");
      return stateCopy

    default:
      return stateCopy;
  }
}

export default homeReducer