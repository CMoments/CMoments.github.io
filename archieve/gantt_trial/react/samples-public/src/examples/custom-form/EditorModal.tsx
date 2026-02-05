import React, { useState } from 'react';

import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';



export interface CustomLightboxProps {
  data?: any;
  onSave?: (task: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const CustomLightbox: React.FC<CustomLightboxProps> = ({
  data,
  onSave,
  onCancel,
  onDelete
}) => {

  let updatedTaskText = data.text || "";

  const handleSaveClick = () => {
    if(onSave)
      onSave({ ...data, text: updatedTaskText });
  };

  function PaperComponent(props: any) {
    const nodeRef = React.useRef(null);
    return (
      <Draggable
        nodeRef={nodeRef}
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"], input,textarea'}
      >
        <Paper {...props} ref={nodeRef}/>
      </Draggable>
    );
  }


  function TextComponent() {
    const [description, setDescription] = useState<string>(data.text || '');

    return (
      <TextField
        id="task_text"
        hiddenLabel
        multiline
        value={description}
        autoFocus
        onChange={(e) => {
          updatedTaskText = e.target.value;
          setDescription(e.target.value)
        }}
        sx={{ width: '100%', padding: '8px', marginTop: '10px' }}
      />
    )
  }


  return (
    <Dialog
      open={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className="lightbox"
      onClose={onCancel}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Edit Task
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Description
        </DialogContentText>

        <TextComponent />

        <DialogActions className='buttons'>
          <Button variant="contained" onClick={handleSaveClick}>Save</Button>
          <Button variant="contained" onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={onDelete}>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>

  );
};

export default CustomLightbox;
