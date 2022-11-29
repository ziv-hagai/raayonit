import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  getMerchants,
  getProductCategories,
} from "../../redux/actions-exporter";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { OutlinedInput } from "@mui/material";
import AllCoupons from "./coupon/coupon";

// import ChatBot from "../chat/ChatBot";
import Header from "../header/Header";
import OnlyCategoryList from "../category/OnlyCategoryList";
import CouponsList from "../couponsList";
import VendorList from "./VendorList";
import ClubRegistr from "./clubRegistr/ClubRegistr";
import Art from "../../assets/images/lg_logo.jpg";
import "./club.css";
import Pagination from "./pagination";
import OtherCategories from "./otherCategories/OtherCategories";
import Search from "./Search";
//icons
import { MdLocalLaundryService } from "react-icons/md";
import { GiConverseShoe } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";
import { GiLargeDress } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";
import { GiKitchenKnives } from "react-icons/gi";
import { RiShirtFill } from "react-icons/ri";
import { GiFlipFlops } from "react-icons/gi";
import { MdLocalPharmacy } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { GiSoccerBall } from "react-icons/gi";
import { GiHighHeel } from "react-icons/gi";
import { MdCleanHands } from "react-icons/md";
import { GiLipstick } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import { GiSteeltoeBoots } from "react-icons/gi";
import { MdToys } from "react-icons/md";
import { BsWatch } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";

const screenWidth = window.innerWidth;
let makeProductsPerPage = 0;
if (screenWidth > 991) {
  makeProductsPerPage = 12;
} else if (screenWidth > 767) {
  makeProductsPerPage = 8;
} else if (screenWidth > 500) {
  makeProductsPerPage = 6;
} else {
  makeProductsPerPage = 12;
}

export default function Club() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [BalanceTitleFont, setBalanceTitleFont] = useState("10vw");
  const [num, setNum] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(makeProductsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentFilterProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (e) => {
    setCurrentPage(e.target.textContent);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const merchants = useSelector((state) => state.merchant.merchants);
  const categories = useSelector(
    (state) => state.productCategories.productCategories
  );

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getMerchants());
    dispatch(getProductCategories());
  }, [dispatch]); // eslint-disable-line

  const handleFavChange = () => {
    // let temp = [{ name: "test" }];
    // dispatch({
    //   type: ADD_TO_CART,
    //   payload: temp,
    // });
  };

  useEffect(() => {
    if (categories.length) {
      const prepareProduct = categories.reduce(
        (previous, current) => [
          ...previous,
          ...current.products.map((product) => ({
            ...product,
            categoryId: current.id,
            categoryName: current.title,
          })),
        ],
        []
      );
      setProducts(prepareProduct);
      setFilterProducts(prepareProduct);
    }
  }, [categories]);

  const handleChange = (event, newValue) => {
    setCurrentPage(1);
    if (newValue === "all") {
      setFilterProducts(products);
    } else {
      let productByCategoryById = [];
      categories.map((category) => {
        if (category.parent === newValue) {
          category.products.map((product) => {
            productByCategoryById.push(product);
            return product;
          });
        }
        return category;
      });
      setFilterProducts(productByCategoryById);
    }
  };

  const otherCategoriesArr = [
    {
      title: t("Appliances"),
      icon: <MdLocalLaundryService />,
      id: 17,
    },
    {
      title: t("Kids shoes"),
      icon: <GiConverseShoe />,
      id: 11,
    },
    {
      title: t("Mens shoes"),
      icon: <GiRunningShoe />,
      id: 12,
    },
    {
      title: t("Girls dresses"),
      icon: <GiLargeDress />,
      id: 10,
    },
    {
      title: t("kids clothes"),
      icon: <GiClothes />,
      id: 18,
    },
    {
      title: t("Cookware"),
      icon: <GiKitchenKnives />,
      id: 2,
    },
    {
      title: t("Mens clothes"),
      icon: <RiShirtFill />,
      id: 15,
    },
    {
      title: t("Flip flops"),
      icon: <GiFlipFlops />,
      id: 13,
    },
    {
      title: t("pharm"),
      icon: <MdLocalPharmacy />,
      id: 5,
    },
    {
      title: t("books"),
      icon: <ImBooks />,
      id: 8,
    },
    {
      title: t("sport"),
      icon: <GiSoccerBall />,
      id: 6,
    },
    {
      title: t("women shoes"),
      icon: <GiHighHeel />,
      id: 16,
    },
    {
      title: t("hygiene"),
      icon: <MdCleanHands />,
      id: 4,
    },
    {
      title: t("care"),
      icon: <GiLipstick />,
      id: 1,
    },
    {
      title: t("food"),
      icon: <MdFastfood />,
      id: 3,
    },
    {
      title: t("boots"),
      icon: <GiSteeltoeBoots />,
      id: 14,
    },
    {
      title: t("toys"),
      icon: <MdToys />,
      id: 9,
    },
    {
      title: t("watches"),
      icon: <BsWatch />,
      id: 7,
    },
  ];

  const ref = useRef(null);
  useEffect(() => {
    console.log("width", ref.current ? ref.current.offsetWidth : 0);
    ref.current.offsetWidth < 500
      ? setBalanceTitleFont("67px")
      : console.log(1);
    // ref.current.offsetWidth < 500 ? setCategoriesSlidesPerView(1) : console.log(1);
  }, [ref.current]);
  // console.log(filterProducts);
  // console.log(filterProducts.filter((i) => i.discount));
  const handleSelect = (event) => {
    setNum(event.target.value);
  };
  return (
    <>
      <div className="dashboard-tamplate">
        <Header />

        <div className="container" ref={ref}>
          <div
            className="balanceBox"
            style={{
              backgroundImage: "url(" + Art + ")",
            }}
          >
            <div className="balanceBoxInner">
              <h1 className="headTitle" style={{ fontSize: BalanceTitleFont }}>
                {/* MallClub */}
              </h1>
              {/* <p className="balanceBoxTitle">{t("yourBalance")}</p> */}
              <h6 className="balanceBoxprice">
                שוברים דיגיטליים בקליק
                {/* {user?.money?.toFixed(1) || 0} ₪ / */}
                {/* {user?.credit?.toFixed(1) || 0} {t("e-credit")} */}
              </h6>
            </div>
          </div>
          <Search />
          {/* <div className="block-slider">
            <div className="module-heading">
              <OtherCategories slider={true} categories={otherCategoriesArr} />

              <div
                className="balanceBox"
                style={{
                  backgroundImage: "url(" + Art + ")",
                }}
              >
                <div className="balanceBoxInner">
                  <h1
                    className="headTitle"
                    style={{ fontSize: BalanceTitleFont }}
                  >MallClub</h1>
                  <p className="balanceBoxTitle">{t("yourBalance")}</p>
                  <h6 className="balanceBoxprice">
                    {user?.money?.toFixed(1) || 0} ₪ /
                    {user?.credit?.toFixed(1) || 0} {t("e-credit")}
                  </h6>
                </div>
              </div>

              <div className="featured-product">
                <div className="module-heading">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h6 className="module-heading__title">
                        {t("featuredCategories")}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="allCategory">
                  <OnlyCategoryList
                    slider={true}
                    categories={categories}
                    divClassName="featuredProduct-box"
                    h5ClassName="featuredProduct-box__title"
                  />
                </div>
              </div>



              <CouponsList />

       
            </div>

            <VendorList isAllVendors={false} storesText={"stores"} />

           
          </div> */}
          <Tabs
            defaultSelectedIndex={0}
            className="categoriesSliderTabs"
            onChange={handleChange}
          >
            <Tab
              value="all"
              label={t("all vouchers")}
              icon={<BiWorld />}
              fontSize="10px"
            >

            </Tab>
            {categories.length > 0 &&
              otherCategoriesArr
                .filter((category) => !category.parent)
                .map((category) => (
                  <Tab
                    value={category.id}
                    label={category.title}
                    icon={category.icon}

                  >
                  </Tab>
                ))}
          </Tabs>
          {/*</ScrollingCarousel>*/}

          <div className="product-block">
            <AllCoupons filterProducts={filterProducts} />

            {/* <ChatBot /> */}
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filterProducts.length}
              paginate={paginate}
            />
          </div>
        </div>
        <ClubRegistr />
      </div>
    </>
  );
}
