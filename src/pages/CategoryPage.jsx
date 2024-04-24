import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../assets/searchIcon.svg";
import CategoryCard from "../components/CategoryCard";
import ToggleButton from "../components/ToggleButton";
import { useLocation, useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import ProfileInput from "../components/ProfileInput";
import { client } from "../main";
import LoaderOverlay from "../components/loadinOverlay";

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($input: ID!) {
    deleteCategory(input: $input) {
      status
      message
    }
  }
`;
const GET_SEGMENTS = gql`
  query GetSegments {
    getSegments {
      status
      message
      segments {
        id
        segmentName
        totalProducts
        totalCategories
      }
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      status
      message
    }
  }
`;

const GET_ALL_PRODUCTS = gql`
query {
  getAllProducts {
    status
    message
    products {
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
      healthConcern
      subCategory
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
      createdAt
      updatedAt
      coupon {
        id
        code
        percentage
        fixedAmount
        description
        status
        expiryDate
      }
      stocks {
        id
        manufacturer
        groupNumber
        stockType
        boxes
        sheets
        noOfTabletsPerSheet
        
        
        mrpPerSheet
        batchNumber
        manufacturingDate
        expiryDate
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
        segment {
          id
          segmentName
        }
        coupon {
          id
          code
          percentage
          fixedAmount
          description
          status
          expiryDate
        }
        products{
          productName
          productImages
          manufacturer
          type
          description
          maxRetailPrice
          sp
        
        }
      
        createdAt
        updatedAt
      }
    }
  }
}
`;

export default function CategoryPage() {
  const dateRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const categories = location?.state?.category;
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const [fetchData, setRefetch] = useState(false);
  const [categoryName, setCategoryName] = useState(
    categories?.categoryName || ""
  );
  const [categoryDescription, setCategoryDescription] = useState(
    categories?.categoryDescription || ""
  );
  const [categorySegment, setCategorySegment] = useState(
    categories?.segment?.segmentName || ""
  );
  const {
    loading: loadingSegment,
    error,
    data,
    refetch,
  } = useQuery(GET_SEGMENTS);

  const [segmentList, setSegmentList] = useState([]);
  const [productListCategoryWise, setProductListForCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [searchText, setSearchText] = useState('');
  const [createdDateFilter, setCreatedDateFilter] = useState('');
  const [viewFilter, setViewFilter] = useState('');
  const [filterProduct, setFilterdProducts] = useState([]);
useEffect(() => {
  console.log(filterProduct)
},[filterProduct])
  const handleUpdate = async () => {
    setLoading(true);
    const { data } = await updateCategory({
      variables: {
        id: categories?.id,
        input: {
          categoryName: categoryName,
          categoryDescription: categoryDescription,
          segmentId: segmentList?.filter(
            (segment) => segment.name === categorySegment
          )[0]?.id,
        },
      },
    });
    if (data?.updateCategory?.status === "SUCCESS") {
      setLoading(false);
      toast.success("Category updated successfully");
      localStorage.setItem("isCategoryDeleted", true);
      navigate("/home/inventory");
    } else {
      setLoading(false);
      toast.error(
        data?.updateCategory?.message ||
          "An error occurred while updating the category"
      );
    }
  };

  useEffect(() => {
    let data2 = [];
    if (data) {
      data?.getSegments?.segments?.forEach((segment) => {
        data2.push({ id: segment.id, name: segment.segmentName });
      });

      console.log(data2);
      setSegmentList(data2);
    }
  }, [data]);

  const handleDeleteCategory = async () => {
    setLoading(true);
    const { data } = await deleteCategory({
      variables: {
        input: categories.id,
      },
    });
    if (data?.deleteCategory?.status === "SUCCESS") {
      setLoading(false);
      toast.success("Category deleted successfully");
      localStorage.setItem("isCategoryDeleted", true);
      navigate("/home/inventory");
    } else {
      setLoading(false);
      toast.error(
        data?.deleteCategory?.message ||
          "An error occurred while deleting the category"
      );
    }
  };

  const fetchcategoriesProducts = async () => {
    setLoading(true);
    try {
      const { data } = await client.query({
        query: GET_ALL_PRODUCTS,
        variables: { input: categories?.id },
      });
      let filteredproduct = data?.getAllProducts?.products?.filter(
        (product) => product.category?.id === categories?.id
      );

      setProductListForCategory(filteredproduct);
      setFilterdProducts(filteredproduct);

      console.log(data?.getAllProducts?.products);
    } catch (error) {
      console.error("Error fetching department users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(categories, "categories");
    if (categories?.id) {
      fetchcategoriesProducts();
    }
  }, [categories]);

  useEffect(() => {
    fetchcategoriesProducts();
  }, []);

// Inside the handleResetFilters function
// Inside the handleResetFilters function
const handleResetFilters = () => {
  setSearchText('');
  setCreatedDateFilter('');
  setViewFilter('');
};

// Inside the useEffect hook where filtering is applied
useEffect(() => {
  if(!searchText && !createdDateFilter && !viewFilter) {
    setFilterdProducts(productListCategoryWise);
    return;
  }
  
  // Apply filters on productListCategoryWise
  let filteredProducts = productListCategoryWise?.filter(product => {
    let passesSearchFilter = true;
    let passesCreatedDateFilter = true;
    let passesViewFilter = true;

    if (searchText) {
      passesSearchFilter = product.productName.toLowerCase().includes(searchText.toLowerCase());
    }
    
    if (createdDateFilter) {
      const productCreatedDate = new Date(Number(product.createdAt));
      const filterDate = new Date(createdDateFilter);
      passesCreatedDateFilter = productCreatedDate.getTime() >= filterDate.getTime();
    }

    if (viewFilter === 'Active') {
      passesViewFilter = product.published;
    } else if (viewFilter === 'Draft') {
      passesViewFilter = !product.published;
    }

    return passesSearchFilter && passesCreatedDateFilter && passesViewFilter;
  });
  
  setFilterdProducts(filteredProducts);
}, [searchText, createdDateFilter, viewFilter]);


  return (
    <div className="flex flex-col gap-[48px] p-[48px] w-full bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] font-HelveticaNeueBold"></h1>
        <div className="flex gap-[24px]">
          <div className="flex items-center md:w-[314px] rounded border border-[#CBD5E1] bg-white px-2">
            <div className="md:p-2 p-1 flex gap-2 items-center w-full">
              <img src={SearchIcon} alt="search icon" className="w-6 h-6" />
              <input
                type="text"
                placeholder="Search for products"
                className="placeholder:text-[#94A3B8] md:text-sm text-xs focus:outline-none w-full"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-[8px]">
            <button
              className="text-white text-[16px] font-[500] leading-[20px] w-[248px] bg-[#031B89] px-[16px] py-[12px] rounded-[4px]"
              onClick={() =>
                navigate("/home/add-product", {
                  state: { category: categories },
                })
              }
            >
              + Add New Product
            </button>
            <button
              className="text-[#EF4444] text-[16px] font-[500] leading-[20px] w-[172px] border-[2px] border-[#EF4444] px-[16px] py-[12px] rounded-[4px]"
              onClick={() => handleDeleteCategory()}
            >
              Delete Category
            </button>
          </div>
        </div>
      </div>
      {/* General Information */}
      <div>
        <h2 className="text-[18px] font-HelveticaNeueBold leading-[22.5px] mb-[24px]">
          General Information
        </h2>
        <div className="grid md:grid-cols-2 gap-[24px]">
          <div>
            <p className="flex gap-[4px] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
              <p className="text-[#64748B] ">Category Name</p>
              <span className="text-red-500">*</span>
            </p>
            <input
              className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
              type="text"
              placeholder="Category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div>
            <ProfileInput
              title="Category segment"
              name="segment"
              value={categorySegment}
              big
              wide
              dropdownField
              dropdownList={segmentList}
              setValue={(value) => setCategorySegment(value)}
            />
          </div>
          <div>
            <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
              Category Description
            </p>
            <input
              className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
              type="text"
              placeholder="Enter category description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
          </div>

          <button
            className="text-white text-[16px] font-[500] leading-[20px]  bg-[#031B89] px-[16px] py-[12px] rounded-[4px]"
            onClick={handleUpdate}
          >
            Update Category
          </button>
        </div>
      </div>
      {/* Filter section */}
      <div className="mb-[24px]">
        <p className="mb-[8px]">Filters</p>
        <div className="flex gap-[32px]">
          <div className="flex items-center gap-[8px]">
            <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">
              Date Created:
            </p>
            <div className="text-[#7487FF] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl">
              <input
                type="date"
                value={createdDateFilter}
                onChange={(e) => setCreatedDateFilter(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">
              View:{" "}
            </p>
            <div className="text-[#7487FF] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl">
              <select
                value={viewFilter}
                onChange={(e) => setViewFilter(e.target.value)}
                className="bg-transparent outline-none"
              >
                <option value="" disabled>Select</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
          {(createdDateFilter || viewFilter || searchText) && (
            <button
              className="text-white text-[16px] font-[500] leading-[20px] bg-gray-500 px-[16px] py-[12px] rounded-[4px]"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
      {/* Product list */}
      <div className="grid md:grid-cols-2 gap-y-[24px] gap-x-[16px]" style={{maxHeight:"460px",overflow:"scroll",scrollBehavior:"smooth"}}>
        {filterProduct?.map((data) => {
          return (
            <CategoryCard
              key={data.id}
              productData={data}
            />
          );
        })}
        {!filterProduct?.length && (
          <div className="text-end">
            <p>No product found</p>
          </div>
        )}
      </div>
      {(loading || loadingSegment) && <LoaderOverlay />}
    </div>
  );
}
