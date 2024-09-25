import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectMenuItems } from '../store/menuSlice';
import { useRouter } from 'next/navigation';
import '../styles/globals.scss';
import Image from 'next/image';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const menuItems = useSelector(selectMenuItems);
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleNavigation = (path: string, itemId: number) => {
    router.push(path);
    setActiveItem(itemId);
    onClose();
  };

  const handleMouseEnter = (itemId: number) => {
    setActiveItem(itemId);
  };

  const handleMouseLeave = () => {
    // Optionally, keep the item active on hover until another item is hovered
  };

  return (
    <Drawer
      className='sidebar-deawer'
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          color: '#fff', // Text color
          backgroundColor: 'transparent',
        },
      }}
    >
      <div
        className={`sidebar-wrap ${activeItem !== null ? 'sidebar-open' : ''}`}
        role="presentation"
        onMouseLeave={handleMouseLeave}
      >
        <IconButton onClick={onClose} sx={{ color: '#fff' }}>
          <CloseIcon />
        </IconButton>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onClick={() => handleNavigation(item.path, item.id)}
              className={activeItem === item.id ? 'active' : ''}
            >
              <ListItemText primary={item.title} />
              {activeItem === item.id && (
                <ul className='subslider-bar'>
                  <li>
                    <div>test</div>
                    <ul >
                      {item.subItems?.map((subItem) => (
                        <li className={`product-img ${activeItem === item.id ? 'active' : ''}`} key={subItem.id}>
                          <Image
                            src={subItem.image}
                            alt={subItem.title}
                            fill
                            style={{ objectFit: 'cover', borderRadius: '16px' }}
                          />
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default Sidebar;
