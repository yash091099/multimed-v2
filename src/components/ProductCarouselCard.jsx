import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

// ... other imports

const ProductCarouselCard = ({
  id,
  title,
  product,
  discount,
  image,
  price,
  openProduct,
  maxRetailPrice,
  sp,
  marketer
}) => {

  const toupperCase = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  function getFormattedQuantity(stockData) {
    if (!stockData) return "N/A";
  
    switch (stockData.stockType) {
      case 'Boxes':
        return `${stockData.sheets} Sheets per Box, ${stockData.noOfTabletsPerSheet} Units per Sheet`;
      case 'Units':
        return `${stockData.noOfUnits} Units`;
      case 'Grams':
        return `${stockData.noOfGrams} Grams`;
      case 'Kilograms':
        return `${stockData.noOfKgs} Kilograms`;
      default:
        return "N/A";
    }
  }
  return (
    <div className="product-card w-[14.375rem] flex gap-[0.781rem] flex-col justify-center items-stretch p-2">
      {/* Product Image */}
      <div className="image-container flex justify-center items-center relative h-[8.438rem] w-full">
        {image?.length > 0 && (
          <>
            <img
              onClick={() => openProduct(id)}
              src={image}
              alt={title}
              className="h-full w-full object-contain"
            />
             <h1 className="absolute top-0 left-0 text-[0.625rem] font-HelveticaNeueMedium p-2 bg-[#C2F5E9]">
          {discount}% OFF
        </h1>
          </>
        )}
      </div>


      {/* Product Details */}
      <div className="details flex flex-col gap-2 text-[#0F172A]" onClick={() => openProduct(id)}>
        <div className="title flex justify-between items-center">
          <h1 className="font-medium truncate" data-tooltip-id={`titleTooltip-${id}`}>
            {toupperCase(title)}
          </h1>
          <ReactTooltip id={`titleTooltip-${id}`} place="bottom" content={toupperCase(title)} />
        </div>

        <div className="price-section flex justify-between items-center">
          <h1 className="font-medium text-[#031B89] truncate" data-tooltip-id={`priceTooltip-${id}`}>
            Rs {parseFloat(sp).toFixed(2)}
          </h1>
          <ReactTooltip id={`priceTooltip-${id}`} place="bottom" content={` ${parseFloat(sp).toFixed(2)}`} />

          <p className="text-[0.75rem] text-[#94A3B8] truncate" data-tooltip-id={`mrpTooltip-${id}`}>
            MRP: Rs <span className="line-through">{parseFloat(maxRetailPrice).toFixed(2)}</span>
          </p>
          <ReactTooltip id={`mrpTooltip-${id}`} place="bottom" content={` ${parseFloat(maxRetailPrice).toFixed(2)}`} />
        </div>

        <div className="quantity-section flex justify-end">
          <p className="text-[0.875rem] text-[#64748B] truncate" data-tooltip-id={`quantityTooltip-${id}`}>
            {getFormattedQuantity(product?.stocks?.[0])}
          </p>
          <ReactTooltip id={`quantityTooltip-${id}`} place="bottom" content={getFormattedQuantity(product?.stocks?.[0])} />
        </div>

        <div className="marketer-section">
          <p className="text-[0.625rem] font-italic text-[#64748B] truncate" data-tooltip-id={`marketerTooltip-${id}`}>
            {toupperCase(marketer)}
          </p>
          <ReactTooltip id={`marketerTooltip-${id}`} place="bottom" content={toupperCase(marketer)} />
        </div>

        <button
          className="add-to-cart-btn w-full font-medium border-[1px] rounded text-[#031B89] border-[#031B89] py-2"
          onClick={() => {/* function to handle adding to cart */}}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCarouselCard;
