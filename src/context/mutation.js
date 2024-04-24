import axios from 'axios';
import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS =  gql`
query{
    getAllProducts{
      status
      message
      products{
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
        marketer
        description
        
        directionToUse
        safetyInformation
        ingredients
        productForm
        consumeType
        unitsInPack
        boxContent
        size
        stockQuantity
        packForm
        discount
        archived
        published
        storage
        origin
        healthConcern
        subCategory
        createdAt
        sp
        stocks{
          id
          productId
          manufacturer
          groupNumber
          stockType
          boxes
          sheets
          noOfKgs
          noOfUnits
          noOfGrams
          noOfTabletsPerSheet
          weightPerUnit
          mrpPerSheet
          boxMrp
          batchNumber
          manufacturingDate
          expiryDate
          createdAt
        }
        bulletPoints{
          id
          point
          description
          author
          
        }
        category{
          id
          categoryName
          segmentId
          categoryDescription
          createdAt
        }
        coupon{
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



