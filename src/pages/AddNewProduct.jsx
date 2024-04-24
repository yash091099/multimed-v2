import React, { useContext, useEffect, useRef, useState } from "react";

import ProfileInput from "../components/ProfileInput";

import WhiteDropdownArrow from "../assets/whiteDropdownArrow.svg";
import Checkbox from "../components/Checkbox";
import ToggleButton from "../components/ToggleButton";
import SearchIcon from "../assets/searchIcon.svg";
import MenuAddPlus from "../assets/menu-add-plus.svg";
import MenuAddPlusWhite from "../assets/menu-add-plus-white.svg";
import Warning from "../components/Warning";
import ImageIcon from "../assets/image-icon.svg";

import Star from "../assets/star.svg";
import ContentManagement from "../components/ContentManagement";
import PublishProductDropDown from "../components/PublishProductDropDown";
import Context from "../context/AppContext";
import AddNewStock from "../components/AddNewStock";
import { gql, useMutation, useQuery,useLazyQuery } from "@apollo/client";
import ProductCard from "../components/ProductCard";
import { ADD_PRODUCT_TO_CATEGORY,UPDATE_PRODUCT,GET_ACTIVE_COUPONS } from "../context/mutation";
import { DeleteForever, DeleteForeverOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import LoaderOverlay from "../components/loadinOverlay";

const GET_CATEGORIES = gql`
query{getCategories{
  status
  message
  categories{
    id
    categoryName
    segmentId
    categoryDescription
    segment{
      id
      segmentName
    }
    products{
      id
      productName
      productImages
      composition
      sp
      discount
      manufacturer
      maxRetailPrice

    }
    createdAt
    updatedAt
  }
}}
`;
const GET_PRODUCT_DETAILS = gql`
query getProductDetails($input: ID!) {
  getProductDetails(input: $input) {
    status
    message
    product {
      id
      productName
      productImages
      manufacturer
      composition
      price
      prescriptionRequired
      type
      tags
      concerns
      sku
      manufacturerAddress
      marketer
      marketerAddress
      description
      directionToUse
      safetyInformation
      ingredients
      productForm
      consumeType
      unitsInPack
      boxContent
      size
      scentOrFlavour
      stockQuantity
      packForm
      productWeightInGrams
      lengthInCentimeters
      widthInCentimeters
      heightInCentimeters
      hsn
      gstPercentage
      maxRetailPrice
      sp
      discount
      archived
      published
      storage
      origin
      healthConcern
      subCategory
      createdAt
      updatedAt
      stocks {
        id
        productId
        manufacturer
        groupNumber
        stockType
        boxes
        sheets
        noOfTabletsPerSheet
        noOfUnits
        weightPerUnit
        noOfGrams
        noOfKgs
        mrpPerSheet
        boxMrp
        batchNumber
        manufacturingDate
        expiryDate
        createdAt
        updatedAt
      }
      bulletPoints {
        id
        point
        description
        author
      }
      category {
        id
        categoryName
        segmentId
        categoryDescription
        createdAt
        updatedAt
      }
      coupon {
        id
        code
        type
        percentage
        fixedAmount
        description
        status
        expiryDate
        createdAt
        updatedAt
      }
    }
  }
}
`;

const AddNewProduct = () => {
  const [productsFromProductDetails, setProductsFromProductDetails] = useState({});

  const fileRef = useRef(null);
  const location=useLocation();
  const category=location?.state?.category;
  const productData=location?.state?.productData;
console.log(productData,'productData')
  const navigate = useNavigate();
  const[editBool,setEditBool]=useState(false)
  const [option, setOption] = useState(productData?.published ? 1 : 0);
  const [newStockModal, setNewStockModal] = useState(undefined);
  const [newStock, setNewStock] = useState(productData?.stocks||[]);
  const [sortBy, setSortBy] = useState("All");
  const { productAddType } = useContext(Context);
  const [stockData, setStockData] = useState(productData?.stocks||[]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataToUpdate, setdataToUpdate] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [permission, setPermission] = useState(productData?.coupon||false);
  const [addProductToCategory] = useMutation(ADD_PRODUCT_TO_CATEGORY);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [productImages, setProductImages] = useState( productData?.productImages||[]);
  const [points, setPoints] = useState(productData?.bulletPoints||[]);
  const { data, refetch: refetchCoupons } = useQuery(GET_ACTIVE_COUPONS);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [origin, setOrigin] = useState(productData?.origin||"");
  const [storage, setStorage] = useState(productData?.storage||"");
  const [composition, setComposition] = useState(productData?.composition||"");
  const [categoryId, setCategoryId] = useState(productData?.category?.categoryName||"");
  const[categories,setCategories]=useState([]);
  const [couponId, setCouponId] = useState(productData?.coupon?.code||"");
  const {  data:categoriesData, refetch:refetchCategories } = useQuery(GET_CATEGORIES);
  const [loading,setLoading]=useState(false);
  const [healthConcern, setHealthConcern] = useState(productData?.healthConcern||"");
const [subCategory, setSubCategory] = useState(productData?.subCategory||"");
const [healthConcernData]=useState(['respiratoryProblem','stomachProblem','bonesProblem','heartProblem','kidneyProblem']);
const [subCategoryData]=useState(['medicine','device','essentials','overTheCounter']);
const [getProductDetails, { data:product }] = useLazyQuery(GET_PRODUCT_DETAILS, {
  fetchPolicy: 'no-cache'  // Ensures fresh data on each execution
});

useEffect(() => {
  if (location.state?.productData) {
    getProductDetails({
      variables: { input: location.state.productData.id }
    });
  }
}, [location.state?.productData, getProductDetails]);

useEffect(() => {
  if (product) {
    const fetchedProduct = product.getProductDetails.product;
    setProductsFromProductDetails(fetchedProduct);
    setNewStock(fetchedProduct.stocks || []);
    setStockData(fetchedProduct.stocks || []);
  }
}, [product]);

// Convert health concern data into array of objects
const formattedHealthConcernData = healthConcernData.map((item, index) => ({
  id: index,
  name: item?.replace(/([A-Z])/g, ' $1')?.toLowerCase() // Convert camelCase to space-separated words
}));

// Convert subcategory data into array of objects
const formattedSubCategoryData = subCategoryData.map((item, index) => ({
  id: index,
  name: item?.replace(/([A-Z])/g, ' $1')?.toLowerCase() // Convert camelCase to space-separated words
}));

console.log('Formatted Health Concern Data:', formattedHealthConcernData);
console.log('Formatted Subcategory Data:', formattedSubCategoryData);
  useEffect(()=>{
    let data=[]
    if(categoriesData){
      // setCategories(categoriesData?.getCategories?.categories);
      categoriesData?.getCategories?.categories?.map((category)=>{
        data.push({name:category?.categoryName,id:category?.id})
      })
      setCategories(data)
      console.log(data,"categoriesData")
    }

  },[categoriesData])

  useEffect(()=>{
    console.log(category)
    if(category){

      setCategoryId(category?.categoryName);
    }
  },[categories])

  const [productName, setProductName] = useState(productData?.productName||"");
  const [productWeightInGrams, setProductWeightInGrams] = useState(productData?.productWeightInGrams||"");
    const [isChecked,setIsChecked] = useState(productData?.isPrescriptionNeeded||true);

  useEffect(() => {
    setCoupons(data?.getActiveCoupons?.coupons);
    setCouponId( data?.getActiveCoupons?.coupons[0]?.id)
  }, [data]);
  useEffect(()=>{
      console.log(categoryId,"cate----------------goryId")
  },[categoryId])
  // Function to handle adding a new product
  const handleAddProduct = async() => {
    // Prepare input data for the mutation
    let input = {
      points: points,
      stocks: newStock,
      productImages: productImages,
      couponId: couponId,
      origin: origin,
      storage: storage,
      composition: composition,
      prescriptionRequired: isChecked,
      productName: productName,
      productWeightInGrams:productWeightInGrams,
      published: option === 1 ? true : false,

      // discount:coupons?.filter((coupon)=>coupon?.id===couponId)[0]?.percentage || 0
    };
    console.log(input?.couponId,permission)

    if(!productData){
      console.log(subCategory,subCategoryData)
      input.subCategory=subCategory
      input.healthConcern=healthConcern
    }
    console.log(productImages,"productImages")
    if(!input?.productName || !categoryId|| !input?.origin|| !input?.storage|| !input?.composition){
      toast.error("Please fill all the required fields")
      return
    
      
    }

    if(!input?.stocks?.length){
      toast.error("Add min 1 Content , required")
      return
    }
    if(!input?.points?.length){
      toast.error("Add min 1 point , required")
      return
    }
    if(!input?.couponId || !permission){
      toast.error("Select coupon , required")
      return
    }

    if(!productData){

      const response = await addProductToCategory({
         variables: {
           id:  categories?.filter((category)=>category.name===categoryId)[0]?.id,
           input: input,
         },
       })
   console.log(response,"response")
       if(response.data?.addNewProductToCategory?.status==="SUCCESS"){
         toast.success(response.data?.addNewProductToCategory?.message)
         localStorage.setItem("isCategoryDeleted",true)
         navigate("/home/inventory")
       }else{
         toast.error(response.data?.addNewProductToCategory?.message)
       }
    }else{
      if(!editBool){
        toast.error("Update min 1 stock while Edit mode required");
        return;
      }
      let newData = newStock?.map(({ __typename, ...stock }) => {
        return {
          ...stock,
          noOfUnits: stock.noOfUnits ?? 0,
          weightPerUnit: stock.weightPerUnit ?? 0,
          boxMrp: stock.boxMrp ?? 0,
          noOfGrams: stock.noOfGrams ?? 0,
          noOfKgs: stock.noOfKgs ?? 0,
          manufacturingDate: stock?.manufacturingDate,
          expiryDate:stock?.expiryDate 
        };
      });
      
      let newPoints = points?.map(({ __typename, ...point }) => {
        return {
          ...point
        };
      })
      
      // Now newData contains the modified data without the __typename property
      console.log(newData);
      
      
      // Now newData contains the modified data
      console.log(newData);
      
      let input = {
        points: newPoints,
        stocks: newData,
        productImages: productImages,
        couponId: coupons?.filter((coupon)=>coupon?.code===couponId)[0]?.id,
        origin: origin,
        storage: storage,
        composition: composition,
        prescriptionRequired: isChecked,
        productName: productName,
        published: option === 1 ? true : false,
        archived:option===1 ? false : true,
        // discount:coupons?.filter((coupon)=>coupon?.id===couponId)[0]?.percentage || 0
      };
    
      const response = await updateProduct({
        variables: {
          id: productData?.id,
          input: input,
        },
      })
      if(response.data?.updateProductAdmin?.status==="SUCCESS"){
        toast.success(response.data?.updateProductAdmin?.message)
        localStorage.setItem("isCategoryDeleted",true)
        navigate("/home/inventory")
      }else{
        toast.error(response.data?.updateProductAdmin?.message)
      }
    }
  };

  const handleStockData = (newStock) => {
    console.log(newStock,'-----------new stock');
    setNewStock([newStock])
    setStockData([newStock]);
};


 
  const removeManufacturer = (manufacturer) => {
    setStockData((prevStockData) =>
      prevStockData.filter((stock) => stock.manufacturer !== manufacturer)
    );
  };



  const filteredstockData = searchQuery?.trim()
    ? newStock?.filter((user) =>
        user.manufacturer?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )
    : newStock;

    const handleFileUpload = async (file) => {
      setLoading(true);
      try {
        // Check if file size is larger than 1MB
        // if (file.size > 2.5 * 1024 * 1024) {
        //   toast.error('File size should not exceed 2.5 MB');
        //   setLoading(false);
        //   return;
        // }
    
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(
          "https://api.mymultimeds.com/api/file/upload",
          {
            method: "POST",
            body: formData,
          }
        );
    
        if (!response.ok) {
          throw new Error(`Failed to upload file: ${response.statusText}`);
        }
        
        const responseData = await response.json();
        const uploadedUrl = responseData.publicUrl;
        console.log(uploadedUrl, "uploaded url");
        setProductImages((prevImages) => [...prevImages, uploadedUrl]);
        
      } catch (error) {
        console.error("Error uploading file:", error.message);
        // If you're using a state to display the error message to the user,
        // you might want to update that state here.
      } finally {
        setLoading(false);
      }
    };
    
  
  const removeProductImage = (image) => {
    setProductImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  useEffect(() => {
    console.log(coupons);
  }, [couponId]);


  return (
    <div className="w-full p-12 flex flex-col gap-12 bg-white">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1"></div>

          <div className="flex gap-1 items-center h-12">
            <button
              onClick={() => handleAddProduct()}
              className="text-sm font-HelveticaNeueMedium text-[#031B89] flex justify-between py-3 px-4 w-fit bg-white border border-[#031B89] rounded items-center h-full"
            >
              {productData?"Update":"Add"} Product
            </button>
            <PublishProductDropDown setOption={setOption} option={option} />

            {/* <button className="text-sm font-HelveticaNeueMedium text-[#031B89] flex justify-between py-3 px-4 w-fit bg-white border border-[#031B89] rounded items-center h-full">
              Archive this product
            </button> */}

            {/* <button className="p-2">
              <DeleteForever />
            </button> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-lg font-HelveticaNeueBold text-[#0F172A]">
          General Information
        </h1>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-6 items-center">
            <ProfileInput
                        title="Product Name"
                        name="productName"
                        value={productName}
                        big
                        wide
                        setValue={(value) => setProductName( value)}
                        // errorMsg={errors.productName}
                        // isError={errors?.productName}
                      />

            <div className="flex gap-2 items-center">
              <Checkbox  setIsChecked={() => setIsChecked(!isChecked)} isChecked={isChecked} />
              <h1>Needs Prescription</h1>
            </div>
          </div>

          <div className="flex gap-6">
            <ProfileInput
              title="Assign Product Category"
              value={categoryId}
              setValue={(value) => setCategoryId(value)}
              // isError={!!formErrors.dept}
              // errorMsg={formErrors.dept}
              big
              dropdownField
              dropdownList={categories}
            />
            
            <ProfileInput
                        title="Product Composition"
                        name="productComposition"
                        value={composition}
                        big
                        wide
                        setValue={(value) => setComposition( value)}
                        // errorMsg={errors.productName}
                        // isError={errors?.productName}
                      />
          </div>

          <div className="flex gap-6">
            <ProfileInput
                        title="Storage Instructions?"
                        name="storageInstructions"
                        value={storage}
                        big
                        wide
                        setValue={(value) => setStorage( value)}
                        // errorMsg={errors.productName}
                        // isError={errors?.productName}
                      />
            <ProfileInput
                        title="Country of Origin"
                        name="countryOfOrigin"
                        value={origin}
                        big
                        wide
                        setValue={(value) => setOrigin( value)}
                        // errorMsg={errors.productName}
                        // isError={errors?.productName}
                      />
                      

          </div>
        {!productData&&  <div className="flex gap-6">

          <ProfileInput
              title="Add Sub Category (optional)"
              value={subCategory}
              setValue={(value) => setSubCategory(value)}
              big
              dropdownField
              dropdownList={formattedSubCategoryData}
            />
          <ProfileInput
              title="Add Health Concern (optional)"
              value={healthConcern}
              setValue={(value) => setHealthConcern(value)}
              big
              dropdownField
              dropdownList={formattedHealthConcernData}
            />
   <ProfileInput
                        title="Product Weight In Grams"
                        name="productWeightInGrams"
                        value={productWeightInGrams}
                        big
                        wide
                        setValue={(value) => setProductWeightInGrams( value)}
                        // errorMsg={errors.productName}
                        // isError={errors?.productName}
                      />
          </div>}
          
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-lg font-HelveticaNeueBold text-[#0F172A]">
          Discount Management
        </h1>

        <div className="flex justify-between">
          <h1 className="font-HelveticaNeueBold text-[#000000]">
            Enable Discount for Product
          </h1>

          <ToggleButton permission={permission} toggleData={productData?.coupon?true:false} setPermission={setPermission} />
        </div>
      </div>

      {permission ? (
        <div className="grid md:grid-cols-2 gap-[24px] mb-[24px]">
          <div>
            <p className="flex gap-[4px] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
              <p className="text-[#64748B] ">Select Discount coupon</p>
              <span className="text-red-500">*</span>
            </p>
            <select onChange={(e) => setCouponId(e.target.value)} value={couponId} className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full">
              <option selected disabled>
                Select Coupon
              </option>
              {coupons?.map((item) => (
                <option value={item.id}>{item.code}</option>
              ))}
              {!coupons?.length && <option disabled>No coupon found</option>}
            </select>
          </div>
          {/* <div>
            <p className="flex gap-[4px] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
              <p className="text-[#64748B] ">Discount Expiry</p>
              <span className="text-red-500">*</span>
            </p>
            <input
              className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
              type="email"
              placeholder="12/11/2023, 11:59 PM"
              disabled
            />
          </div> */}
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-HelveticaNeueBold text-[#0F172A]">
            Stock management
          </h1>

          <div className="flex gap-4 ">
            {/* <div className="w-[19.625rem] rounded border border-[#CBD5E1] bg-white py-0.5 px-2">
              <div className="p-2 flex gap-2 items-center">
                <img src={SearchIcon} alt="search icon" className="w-6 h-6" />

                <input
                  type="text"
                  placeholder="Search for manufacturers"
                  className="placeholder:text-[#94A3B8] text-sm focus:outline-none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
              </div>
            </div> */}

          { stockData?.length<1 && <button
              className="flex gap-2 items-center py-2 px-3 rounded border border-[#031B89] bg-white"
              onClick={() => {setNewStockModal(true); setdataToUpdate({})}}
            >
              <img src={MenuAddPlus} alt="plus" className="w-6 h-6" />

              <h1 className="text-sm font-HelveticaNeueMedium text-[#031B89]">
                Add Product Stock
              </h1>
            </button>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-[24px]">
          {filteredstockData?.length ? (
            newStock?.map((data,index) => {
              return (
                <ProductCard
                  stockData={data}
                  removeManufacturer={removeManufacturer}
                  setStockDetails={setNewStockModal}
                  setdataToUpdate={setdataToUpdate}
                  setEditBool={setEditBool}
                index={stockData.length}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>

        {!filteredstockData?.length ? (
          <Warning warning="No Products available" />
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-HelveticaNeueBold text-[#0F172A]">
              Product Images
            </h1>

            <h2 className="text-sm text-[#0F172A]">
              Star the primary Image for the product. Select upto 10 images
              (jpg,png,jpeg)
            </h2>
          </div>

          <button
            className="h-12 text-sm font-HelveticaNeueMedium text-[#031B89] flex gap-2 items-center py-2 px-3 rounded border border-[#031B89] bg-white"
            onClick={() => {
              fileRef.current.click();
            }}
          >
            Upload Product Images
          </button>
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            ref={fileRef}
          />
        </div>

        <div className="flex gap-4 items-center">
          {!productImages?.length ? (
            <div className="relative w-[14.125rem] h-[13.938rem] flex items-center justify-center bg-[#F1F5F9] rounded p-2">
              <img src={ImageIcon} alt="image icon" className="w-6 h-6" />
              <div className="absolute top-2 right-2 p-1 bg-white rounded">
              </div>
            </div>
          ) : (
            <></>
          )}
          {productImages?.map((data) => {
            return (
              <div className="relative w-[14.125rem] h-[13.938rem] flex items-center justify-center bg-[#F1F5F9] rounded p-2">
                <img src={data} alt="image icon" />
                <div className="absolute top-2 right-2 p-1 bg-white rounded">
                  <DeleteForeverOutlined
                    onClick={() => {
                      removeProductImage(data);
                    }}
                    className="w-6 h-6"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            );
          })}

        {productImages?.length < 10 &&  <button
            className="rounded-full bg-[#7487FF] p-3 w-12 h-12"
            onClick={() => {
              fileRef.current.click();
            }}
          >
            <img src={MenuAddPlusWhite} alt="plus" />
          </button>}
        </div>
      </div>

      <ContentManagement onSave={(data) => setPoints(data)} pointsProp={points} />
      {newStockModal && (
        <AddNewStock
          setNewStockModal={setNewStockModal}
          datatoUpdate={dataToUpdate}
          stockData={handleStockData}
        />
      )}
      {loading && <LoaderOverlay />}
    </div>
  );
};

export default AddNewProduct;
