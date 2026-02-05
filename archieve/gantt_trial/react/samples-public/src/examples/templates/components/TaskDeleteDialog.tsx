import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

interface MyConfirmDialogProps {
  open: boolean;
  text: string;
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const MyConfirmDialog: React.FC<MyConfirmDialogProps> = ({
  open,
  text,
  //title = "Confirm Deletion",
  onConfirm,
  onCancel
}) => {
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="confirm-dialog-title">
      {/* <DialogTitle id="confirm-dialog-title">{title}</DialogTitle> */}

      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>No</Button>
        <Button color="error" onClick={onConfirm} autoFocus>
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyConfirmDialog;
