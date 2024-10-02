import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectMenuItems } from '../store/menuSlice';
import { useRouter } from 'next/navigation';
import '../styles/globals.scss';
import Image from 'next/image';
import { useScreenSize } from '@/hooks/useScreenSize';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const menuItems = useSelector(selectMenuItems);
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<number | null>(null);
  const {isMobile}=useScreenSize();

  const handleNavigation = (path: string, itemId: number) => {
    router.push(path);
    setActiveItem(itemId);
    setActiveSubItem(null);
    onClose();
  };

  const handleMouseEnter = (itemId: number) => setActiveItem(itemId);
  const handleMouseLeave = () => {
    setActiveItem(null);
    setActiveSubItem(null);
  };

  const handleSubMouseEnter = (subItemId: number) => setActiveSubItem(subItemId);

  return (
    <Drawer
      className='sidebar-deawer'
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          color: '#fff',
          backgroundColor: 'transparent',
          width: isMobile ? '500px' : '100%'
        },
      }}
    >
      <div
        className={`sidebar-wrap ${activeItem !== null ? 'sidebar-open' : ''}`}
        role="presentation"
        onMouseLeave={handleMouseLeave}
      >
        <List>
          {menuItems.map(item => (
            <ListItem
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onClick={() => handleNavigation(item.path, item.id)}
              className={activeItem === item.id ? 'active' : ''}
            >
              <ListItemText primary={item.title} />
              {activeItem === item.id && item.subItems && (
                <ul className={`subsider-bar ${activeItem === item.id ? 'active' : ''}`}>
                  {item.subItems.map(subItem => (
                    <li key={subItem.id} onMouseEnter={() => handleSubMouseEnter(subItem.id)}>
                      <ListItemText primary={subItem.title} />
                      {activeSubItem === subItem.id && subItem.subItems && (
                        <ul className="sub-submenu">
                          <li className={`product-img ${activeItem === item.id ? 'active' : ''}`}>
                            {subItem.subItems.map(subSubItem => (
                              <div key={subSubItem.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <Image
                                  src={subSubItem.image}
                                  alt={subSubItem.imageName}
                                  width={100}
                                  height={100}
                                />
                                <span style={{ marginLeft: '10px' }}>{subSubItem.imageName}</span>
                              </div>
                            ))}
                          </li>
                        </ul>
                      )}
                    </li>
                  ))}
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
