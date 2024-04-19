import { createContext, useState } from "react";

const Context = createContext({});
export default Context;

export function AppContext({children}){
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [showCouponPopUp, setShowCouponPopUp] = useState(false);
    const [showAddressPopUp, setShowAddressPopUp] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    const [showDeletePopUp, setShowDeletePopUp] = useState(undefined);
    const [refetchCustomers, setRefetchCustomers] = useState(false);
    const [productAddType, setProductAddType] = useState(0);
    return (
        <Context.Provider value={{userLoggedIn,refetchCustomers, setRefetchCustomers, setUserLoggedIn, showCouponPopUp, setShowCouponPopUp,showAddressPopUp, setShowAddressPopUp, showDeletePopUp, setShowDeletePopUp, saveModal, setSaveModal, productAddType, setProductAddType }} >
            {children}
        </Context.Provider>
    )
}