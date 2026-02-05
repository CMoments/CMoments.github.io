import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface ColumnMenuProps {
  onFilterSelected: (filterType: string) => void;
  currentFilterLabel?: string;
}

export default function PositionedMenu(props: ColumnMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (filterType: string) => {
    props.onFilterSelected(filterType);
    handleClose();
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Show: {props.currentFilterLabel || 'All'}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("done")}>Show Done</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("notDone")}>Show Not Done</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("all")}>Show All</MenuItem>
      </Menu>
    </div>
  );
}