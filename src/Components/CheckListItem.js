import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FormControlLabel, Checkbox, TextField, ListItem } from '@material-ui/core'
import useSwitch from '../Hooks/useSwitch';
import { useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

export const CheckListItem = ({ el, changeList, index, deleteTask }) => {

  const [check, setCheck] = useSwitch(el.isCompleted)
  const [itemTitle, setItemTitle] = useState(el.title)

  const handleCheck = (val) => {
    setCheck(val)
  }

  const handleBlur = () => {
    if ((el.isCompleted !== check) || el.title !== itemTitle) {
      const elCopy = { title: itemTitle || el.title, isCompleted: check }
      changeList(elCopy, index)
    }

  }

  return (
    <ListItem onBlur={handleBlur}  >
      <FormControlLabel
        style={{ marginRight: '0' }}
        control={
          <Checkbox
            checked={check}
            color="primary"
            onClick={e => handleCheck(e.target.checked)}
          />
        }
      />
      <TextField multiline className="list-item" size="small" variant="outlined" value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} />
      <DeleteIcon onClick={() => deleteTask(index)} className="delete-task" />
    </ListItem>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CheckListItem)
