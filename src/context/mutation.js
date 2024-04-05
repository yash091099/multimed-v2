// mutations.js
import { gql } from "@apollo/client";

export const REGISTER_ADMIN = gql`
  mutation RegisterAdmin($email: String!, $password: String!) {
    registerAdmin(input: { email: $email, password: $password }) {
      status
      message
      token
    }
  }
`;

export const ADMIN_LOGIN = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(input: { email: $email, password: $password }) {
      status
      message
      token
    }
  }
`;


export const CREATE_COUPON = gql`
  mutation createCoupon($code: String!,$products: [ID]!, $percentage: Int!, $description: String!, $type: CouponType!, $status: CouponStatus!, $expiryDate: String!, $categories: [ID]!,$fixedAmount: Float) {
    createCoupon(input: { code: $code,products: $products, percentage: $percentage, fixedAmount: $fixedAmount, description: $description, type: $type, status: $status, expiryDate: $expiryDate, categories: $categories }) {
      status
      message
    }
  }
`;


export const GET_COUPONS = gql`
query{getCoupons{
  status
  message
  coupons{
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
    associatedCategories{
      id
      categoryName
      segmentId
      categoryDescription
      segment{
        id
        segmentName
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
      products{
        id
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
}}
`;
export const GET_ACTIVE_COUPONS = gql`
query{
  getActiveCoupons{
    status
    message
    coupons{
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
`;

export const UPDATE_COUPON = gql`
  mutation updateCoupon($id: ID!, $input: UpdateCouponInput!) {
    updateCoupon(id: $id, input: $input) {
      status
      message
    }
  }
`;


export const DELETE_COUPONS = gql`
  mutation deleteCoupon($id: ID!) {
    deleteCoupon(id:  $id ) {
      status
      message
    }
  }
`;

export const ADD_DEPARTMENT = gql`
  mutation addDepartment($name: String!,$description: String!,$permissions: [String]!) {
    addDepartment(input: { name: $name, description: $description, permissions: $permissions }) {
      status
      message
    }
  }
`;

export const GET_DEPARTMENT_USER_COUNT=gql`
query GetDepartmentUserCount($input:ID!){
  getDepartmentUserCount(input:$input){
  status
  message
  count
}}
`

export const GET_DEPARTMENT_USER=gql`
query GetDepartmentUsers($input:ID!){
  getDepartmentUsers(input:$input){
  status
  message
  users{
    id
    fullName
    contactNumber
    email
    walletBalance
    role
    profilePicture
    currentAddress{
 			  id
        houseNumber
        aptOrBuildingName
        streetOrAreaName
        city
        state
        pincode
        label
    }
    department{
      id
      name
      description
      permissions
      
    }
  }
}}
`

export const GET_ADDED_DEPARTMENTS=gql`
query{getAddedDepartments{
  status
  message
  departments{
    id
    name
    description
    permissions
    creator{
      id
      fullName
      contactNumber
      email
      profilePicture
      walletBalance
      role
      currentAddress{
        id
        houseNumber
        aptOrBuildingName
        streetOrAreaName
        city
        state
        pincode
        label
      }
      department{
        id
        name
        description
        permissions
      }
    }
  }
}}
`


export const UPDATE_USER=gql`
  mutation updateUser($fullName: String!,$contactNumber: String!,$email: String!,$role: String!,$departmentId: ID!,$userId: ID!) {
    updateUser(input: { fullName: $fullName, contactNumber: $contactNumber, email: $email, role: $role, departmentId: $departmentId , userId: $userId }) {
      status
      message
    }
  }
`

export const DELETE_USER=gql`
  mutation deleteUser($id: ID!) {
    deleteUser(input:$id ) {
      status
      message
    }
  }
`

export const UPDATE_DEPARTMENT=gql`
  mutation updateDepartment($name: String!,$description: String!,$permissions: [String]!, $departmentId: String!) {
    updateDepartment(input: { name: $name, description: $description, permissions: $permissions, departmentId: $departmentId }) {
      status
      message
    }
  }
` 
export const DELETE_DEPARTMENT=gql`
mutation deleteDepartment($deptId: ID!) {
  deleteDepartment(input:$deptId) {
    status
    message
  }
}

`
export const GET_USERS=gql`
query{getUsers{
  status
  message
  users{
    id
    fullName
    contactNumber
    email
    profilePicture
    walletBalance
    createdAt
    role
    addresses{
      id
      houseNumber
      aptOrBuildingName
      streetOrAreaName
      city
      state
      pincode
      label
    }
    department{
      id
      name
      description
      permissions
    }
  }
}}
`
export const ADD_PRODUCT_TO_CATEGORY = gql` 
  mutation AddNewProductToCategory($id: ID!, $input: AddNewProductInput!) {
    addNewProductToCategory(id: $id, input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_PRODUCT=gql`
mutation updateProductAdmin($id: ID!, $input: UpdateProductAdminInput!) {
  updateProductAdmin(id: $id, input: $input) {
    status
    message
  }
}
`

export const GET_BANNERS=gql`
query{getBanners{
  status
  message
  banners{
    id
    url
    mobileUrl
    index
  }
}}
`
export const CREATE_BANNER=gql`
  mutation createBanner($url: String!,$mobileUrl: String!,$index: Int!) {
    createBanner(input: { url: $url, mobileUrl: $mobileUrl, index: $index}) {
      status
      message
      banner{
        id
        url
        mobileUrl
        index
      }
    }
  }
`

export const UPDATE_BANNER=gql`
  mutation updateBanner($url: String!,$mobileUrl: String!,$index: Int!,$id: ID!) {
    updateBanner(id: $id,input: { url: $url, mobileUrl: $mobileUrl, index: $index}) {
      status
      message
      banner{
        id
        url
        mobileUrl
        index
      }
    }
  }
`

export const DELETE_BANNER=gql`
  mutation deleteBanner($id: ID!) {
    deleteBanner(id: $id ) {
      status
      message
    }
  }
`