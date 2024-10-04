import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import '../styles/globals.scss';
import Image from 'next/image';
import { getAllCategory } from '@/store/categoriesSlice';
import { getAllSubCategoryByCategoryId } from '@/store/subCategoriesSlice';
import { getAllProducts } from '@/store/productSlice';
import { useScreenSize } from '@/hooks/useScreenSize';
import { Categories, Products } from '@/interface';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const selector = useSelector((state) => state);
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<number | null>(null);
  const [category, setCategory] = useState<Categories[]>([])
  const [subCategories, setSubCategories] = useState<Categories[]>([])
  const [products, setProducts] = useState<Products[]>([])
  const dispatch = useDispatch<any>()
  const {isMobile}=useScreenSize();

  const handleNavigation = (path: string, itemId: number) => {
    router.push(path);
    setActiveItem(itemId);
    setActiveSubItem(itemId);
    onClose();
  };

  const handleMouseEnter = async (itemId: number) => {
    setActiveItem(itemId);
    const subCatresponse = await dispatch(getAllSubCategoryByCategoryId(itemId))
    setSubCategories(subCatresponse.payload.result)
  }

  const handleMouseLeave = () => {
    setActiveItem(null);
    setActiveSubItem(null);
  };

  const handleSubMouseEnter = async (subItemId: number) => {
    setActiveSubItem(subItemId);
    const productsResponse = await dispatch(getAllProducts(subItemId))
    setProducts(productsResponse.payload.result);
  };

  const fetchCategories = async () => {
    try {
      const response = await dispatch(getAllCategory());
      const categories = response.payload.result;
      setCategory(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [])

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
          {category.map(item => (
            (
              item.isActive &&
              <>
                <ListItem
                  key={`category-${item.id}`}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onClick={() => handleNavigation(item.name, item.id)}
                  className={activeItem === item.id ? 'active' : ''}
                >
                  <>
                    <ListItemText primary={item.name} />
                    {activeItem === item.id && (
                      <ul className={`subsider-bar ${activeItem === item.id ? 'active' : ''}`}>
                        {subCategories.map(subItem => (
                          <li key={subItem.id} onMouseEnter={() => handleSubMouseEnter(subItem.id)}>
                            <ListItemText primary={subItem.name} key={item.id}/>
                            {activeSubItem === subItem.id && (
                              <ul className="sub-submenu">
                                <li className={`product-img ${activeItem === item.id ? 'active' : ''}`}>
                                  {products.map(prodItem => (
                                    <div key={`product-${prodItem.id}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                      <Image
                                        src={`${process.env.NEXT_PUBLIC_APP_API_IMAGE_URL}${prodItem.image.replace(/^~\//, '')}`}
                                        alt={prodItem.name}
                                        width={100}
                                        height={100}
                                        unoptimized
                                      />
                                      <span style={{ marginLeft: '10px' }}>{prodItem.name}</span>
                                    </div>
                                  ))}
                                </li>
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                </ListItem>
              </>
            )
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default Sidebar;
