// components/Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectMenuItems } from '../store/menuSlice'; // Adjust the path as necessary
import { useRouter } from 'next/navigation';
import '../styles/globals.scss';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const menuItems = useSelector(selectMenuItems);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <Drawer
      className='sidebar-deawer'
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#3f51b5', // Example color for sidebar
          color: '#fff', // Text color
        },
      }}
    >
      <div role="presentation">
        <IconButton onClick={onClose} sx={{ color: '#fff' }}>
          <CloseIcon />
        </IconButton>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} onClick={() => handleNavigation(item.path)}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default Sidebar;
