"use client";
import CustomBreadcrumbs from "../../../components/Breadcrumbs";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCartProduct, getAllProducts, getAllProductsByCategoriesIds } from "@/store/productSlice";
import { useParams } from "next/navigation";
import { getAllSubCategoryByCategoryId } from "@/store/subCategoriesSlice";
import { Products, SubCategory, WishList } from "@/interface";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoonLoader from "react-spinners/MoonLoader";
import useFlyingAnimation from "@/hooks/useFlyingAnimation";
import { ToastError } from "@/components/ToastMessage";
import { ToastContainer } from "react-toastify";

const Categories: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<any>();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<number>(0);
  const { animateFlyToCart } = useFlyingAnimation();

  // Create a ref for the button
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>(new Array(products.length).fill(null));

  const categorySelector = useSelector((state: any) => state.categories.categories);

  const handleLinkClick = () => {
    setIsLoading(true);
  };
  const CategoryIds = parseInt(params.subcategories);

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setWishList(JSON.parse(storedWishList));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      var res = activeSubCategoryId ?
        await dispatch(getAllProducts(activeSubCategoryId)) :
        await dispatch(getAllProductsByCategoriesIds(CategoryIds));
      setProducts(res.payload.result);
    }

    fetchProducts();
  }, [activeSubCategoryId])

  useEffect(() => {
    const fetchSubCategories = async () => {
      var res = await dispatch(getAllSubCategoryByCategoryId(CategoryIds));
      setSubCategories(res.payload.result);
      var res = await dispatch(getAllProductsByCategoriesIds(CategoryIds));
      setProducts(res.payload.result);
    }

    fetchSubCategories();
  }, [dispatch, CategoryIds])

  const [wishList, setWishList] = useState<WishList[]>([]);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "SubCategories", href: "/categories/subCategories" },
    { label: "All Sub Categories" },
  ];

  const handleAddToCart = async (products: Products,button: HTMLButtonElement) => {
    const userId = 1;
    try {
      const res = await dispatch(addToCartProduct({ productId: products.id, userId, quantity: 1 }))
      animateFlyToCart(button);
      if (res?.payload?.result == -1) {
        ToastError(res?.payload?.message || "Already added in cart");
      }
    } catch (errors) {
      console.log(errors)
    }
  }

  function handelWishList(id: number) {
    setWishList((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, wishListed: !item.wishListed } : item
        );
      } else {
        return [...prev, { id, wishListed: true }];
      }
    });
  }

  const isWishListed = (id: number) => {
    const item = wishList.find((item) => item.id === id);
    return item ? item.wishListed : false;
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ padding: 4 }} id="subcategory-list">
        {/* Breadcrumbs section */}
        <CustomBreadcrumbs items={breadcrumbItems}></CustomBreadcrumbs>
        <Typography variant="h4" className="Top-heading">
          View All Sub Categories
        </Typography>
        <Box sx={{ backgroundColor: "#e9e9e9" }}>
          <Grid
            container
            spacing={4}
            sx={{
              margin: "25px 0px",
              rowGap: "50px",
              justifyContent: "center",
            }}
          >
            {
              subCategories && subCategories.map((item) => {
                return (
                  <>
                    {
                      item.isActive &&
                      <Grid key={`subCategory${item.id}`}>
                        <Link
                          className="categories-link"
                          href="#"
                          onClick={() => setActiveSubCategoryId(item.id)}
                        >
                          {item.name}
                        </Link>
                      </Grid>
                    }
                  </>
                )
              })
            }
          </Grid>
        </Box>

        {/* SubCategories section */}
        <Grid
          container
          spacing={4}
          sx={{
            margin: "50px 50px",
            rowGap: "50px",
            display: "grid",
            gridTemplateColumns: "repeat( auto-fill, minmax(300px, 1fr) )",
          }}
        >
          {products.length > 0 ? products.map((product, index) => {
            return (
              <>
                <Grid className={"card-item"} key={`category-${index}`}>
                  <Card sx={{ maxWidth: 345 }}>
                    {/* wishlist Icon */}
                    <IconButton
                      color="inherit"
                      className="Card-wish-icon"
                      onClick={() => handelWishList(product.id)}
                    >
                      <FavoriteIcon
                        sx={{
                          color: isWishListed(product.id)
                            ? "#ff3d3d"
                            : "#ffffff",
                        }}
                      />
                    </IconButton>
                    {/* product Info section */}
                    <Box
                      sx={{
                        height: 300,
                        position: "relative",
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <Link href={`/pages/${product.id}`}>
                        <CardMedia
                          sx={{
                            height: "100%",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                          image={`${process.env.NEXT_PUBLIC_APP_API_IMAGE_URL}${product.image && product.image.replace(/^~\//, '')}`}
                          title={product.name}
                        />
                      </Link>
                    </Box>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography gutterBottom variant="h5" component="div"
                        sx={{
                          display: '-webkit-box',
                          '-webkit-line-clamp': '1',
                          '-webkit-box-orient': 'vertical',
                          overflow: 'hidden'
                        }}>
                        {product.name}
                      </Typography>
                      <Typography component="div" sx={{
                        color: "gray",
                        display: '-webkit-box',
                        '-webkit-line-clamp': '1',
                        '-webkit-box-orient': 'vertical',
                        overflow: 'hidden'
                      }}>
                        {product.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        ${product.price}
                      </Typography>
                    </CardContent>
                    {/* Add to Cart Button */}
                    <Typography variant="h4">
                      <Button
                       ref={(el) => {
                        buttonRefs.current[product.id - 1] = el;
                      }}
                      onClick={(e1) => handleAddToCart({ product },
                        e1.currentTarget
                      )
                      }
                        sx={{
                          background: "black",
                          color: "white",
                          padding: "5px 10px",
                          fontWeight: "bold",
                          "&:hover": {
                            background: "#a8a5a5",
                          },
                         
                        }}
                      >
                        <ShoppingCartIcon
                          sx={{ color: "#fff", marginRight: "10px" }}
                        />
                        Add
                      </Button>
                      <Link href={`/pages/${product.id}`}>
                        <Button
                          sx={{
                            marginLeft: "10px",
                            background: "black",
                            color: "white",
                            padding: "5px 10px",
                            fontWeight: "bold",
                          }}
                        >
                          View Details
                        </Button>
                      </Link>
                    </Typography>
                  </Card>
                </Grid>
              </>
            );
          })
            :
            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center" }}>
              Product Not Found
            </Typography>}
          {isLoading && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MoonLoader color="#000" loading={isLoading} size={50} />
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Categories;
