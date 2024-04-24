import React, { useContext, useState,useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import { useQuery } from "@apollo/client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loader";
import Context from "../../context/AppContext";
import { GET_ALL_PRODUCTS } from "../../context/mutation";



const FindByIndex = () => {
  const location = useLocation();

  let isIllness=false;
  const { type } = useParams();
  if(type){
    isIllness=true
  }
  const healthConcern= location?.state?.healthConcern;
  const subCategory= location?.state?.subCategory;
  const {setSelectedProduct}=useContext(Context)
  console.log(type)
  const navigate=useNavigate()
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeLetter, setActiveLetter] = useState('All');
  const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(null);
  const {   data:dataListProduct } = useQuery(GET_ALL_PRODUCTS,{
    onCompleted: (data) => {
       
      
        setIsFetched(true);
        setIsLoading(false)
    },
    onError: (err) => {
      setIsLoading(false)

    }
  });   

  useEffect(() => {
    let data = dataListProduct;
    if (healthConcern || subCategory) {
      console.log(healthConcern, "+++++healthConcern+++++++++");
      console.log(subCategory, "+++++subCategory+++++++++");
      if (healthConcern) {
        console.log(data?.getAllProducts?.products.filter((product) => product?.healthConcern === healthConcern), "+++++data+++++++++");
        console.log(data?.getAllProducts?.products, "+++++data+++++++++");
        setProductList(data?.getAllProducts?.products.filter((product) => product?.healthConcern === healthConcern));
        setFilteredProducts(data?.getAllProducts?.products.filter((product) => product?.healthConcern === healthConcern));
      } else {
        setProductList(data?.getAllProducts?.products.filter((product) => product?.subCategory === subCategory));
        setFilteredProducts(data?.getAllProducts?.products.filter((product) => product?.subCategory === subCategory));
      }
    } else {
      setProductList(data?.getAllProducts?.products);
      setFilteredProducts(data?.getAllProducts?.products); 
    }
  }, [dataListProduct, healthConcern, subCategory]); // Adding dependencies to the dependency array
  

  const handleAlphabetFilter = (letter) => {
    setActiveLetter(letter);
    applyFilters(letter, isPrescriptionRequired);
  };

  const handlePrescriptionFilter = (required) => {
    setIsPrescriptionRequired(required);
    applyFilters(activeLetter, required);
  };

  const toCapitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  const applyFilters = (letter, prescription) => {
    let filtered = productList;

    // Filter by prescription if needed
    if (prescription !== null) {
      filtered = filtered.filter((product) => product.prescriptionRequired === prescription);
    }

    // Filter by letter if not 'All'
    if (letter !== 'All') {
      if(isIllness){
        filtered = filtered.filter((product) => product.concerns[0].toUpperCase().startsWith(letter));
      }else{

        filtered = filtered.filter((product) => product.productName.toUpperCase().startsWith(letter));
      }
    }

    setFilteredProducts(filtered);
  };
  const alphabetButtons = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)).map((letter) => (
    <button
      key={letter}
      className={activeLetter === letter ? "text-[#7487FF] font-HelveticaNeueMedium" : ""}
      onClick={() => handleAlphabetFilter(letter)}
    >
      {letter}
    </button>
  ));


  return (
     <div>
      {
        isLoading && <Loader /> 
      }
       {
         isFetched ?
         (
          <div className="flex flex-col justify-between py-12 px-[6.25rem] gap-[1.25rem] bg-white mb-4">
          <h1 className="w-full text-[0.875rem] text-[#64748B]">
          <span onClick={()=>{navigate('/')}} className="text-[#94A3B8] font-HelveticaNeueMedium" style={{cursor:'pointer'}}>
               Home/
            </span>
            <span className="text-[#031B89] font-HelveticaNeueMedium">
              Product Page
            </span>
          </h1>
    
          {/* Heading */}
          <div className="w-full flex justify-between items-center">
            <h1 className="text-[1.25rem] font-HelveticaNeueMedium text-[#031B89]">
              {isIllness ? `Sort By Illness` : "Find your Medicines"}
            </h1>
    
            {/* SortBy */}
            {/* <IndexSortBy isIndex /> */}
            <select className="text-[#94A3B8] text-[0.875rem] relative w-[21.875rem] flex justify-between p-2 rounded border border-[#CBD5E1] items-center" onChange={(e) => handlePrescriptionFilter(e.target.value === 'required')}>
          <option className="text-[#94A3B8] text-[0.875rem]" value="required">Prescription Required</option>
          <option className="text-[#94A3B8] text-[0.875rem]" value="notRequired">No Prescription Required</option>
        </select>
          </div>
    
          {/* Sort Indexes */}
          <div className="flex flex-col gap-2">
        {/* Alphabetical Filter */}
        {/* <button style={{    width:' 8%',
    float: 'right',
    display: 'flex',
    justifyContent: 'center',    position: 'relative',
    left: '92%'
}} className="w-[5.5rem] py-2 px-4 bg-[#7487FF] text-white rounded font-HelveticaNeueMedium" onClick={() => clearFilters()}>Clear Filters</button> */}
        <div className="flex gap-6 text-[#334155]">
          <button
            className={activeLetter === 'All' ? "text-[#7487FF] font-HelveticaNeueMedium" : ""}
            onClick={() => handleAlphabetFilter('All')}
          >
            All
          </button>
          {alphabetButtons}
        </div>

        {/* Prescription Filter Dropdown */}
        {/* <select onChange={(e) => handlePrescriptionFilter(e.target.value === 'required')}>
          <option value="required">Prescription Required</option>
          <option value="notRequired">No Prescription Required</option>
        </select> */}
      </div>

      {/* Products */}
      {!isIllness ? (
        <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProducts.map((product, i) => (
            <div key={'product-' + product.id}>
              <ProductCard product={product} isPrescriptionNeeded={product.prescriptionRequired} />
            </div>
          ))}
        </div>
      ) : (
            // find by illness
            <div className="grid grid-cols-5 gap-4">
            {filteredProducts.map((product, i) => (
              <div style={{ cursor: 'pointer' }} onClick={() =>{ setSelectedProduct(product); navigate(`/product/${product.id}`)}} key={"product-" + product.id} className="flex items-center">
                <img
                  src={product?.productImages[0]}
                  alt={product?.productName}
                  className={isIllness ? "w-16 h-16 mr-2" : "w-24 h-24 mr-4"}
                />
                <h2 className={isIllness ? "text-[0.875rem] " : "text-[0.875rem] font-HelveticaNeueMedium"}>
                  {isIllness ? toCapitalize(product?.productName ): toCapitalize(product?.manufacturer)}
                </h2>
              </div>
            ))}
          </div>
          )}
        </div>
         )
         :(
           <div></div>
         )
       }
       {!filteredProducts?.length && <div className="w-full mb-4 flex justify-center items-center gap-2 font-HelveticaNeueMedium text-[#94A3B8] text-[0.875rem]">No products found</div>}
     </div>
  );
};

export default FindByIndex;
