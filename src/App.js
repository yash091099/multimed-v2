import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";

// import { CartProvider } from "./CartContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Legal from "./pages/Legal";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Transaction from "./pages/Transaction";
import PrescriptionAnalyzed from "./components/Cart/PrescriptionAnalyzed";
import Process from "./pages/Process";
import Products from "./pages/Products";
import Account from "./pages/Account";
import OrderDetails from "./components/Account/OrderDetails";
import Footer from "./components/Footer";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import BlogDetails from "./components/blogdetails";
import Referrals from "./components/Account/Refferal/Refferal";
import Wallet from "./components/Account/Wallet/wallet";
import TxnSuccess from "./components/Transactions/TxnSuccess";
import TxnFail from "./components/Transactions/TxnFail";
import TrackOrder from "./components/Cart/TrackOrder/TrackOrder";
import TrackOrderDetail from "./components/Cart/TrackOrder/TrackOrderDetails";
import Support from "./components/Account/Support/support";
import Subscription from "./components/Account/Subscriptions/subscription";
import OrderStatus from "./components/Cart/OrderStatus/OrderStatus";
import NotFound from "./components/404/404";
import OfferCoupon from "./components/OfferCoupon";
import Coupons from "./components/Cart/Bill";
import CouponModal from "./components/Cart/CouponModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyingPrescription from "./components/verifying-prescription/verifying-prescription";
const ProtectedRoute = ({ children }) => {
  const isUserLoggedIn = localStorage.getItem("userInfo");

  if (!isUserLoggedIn) {
    // Redirect to the home page if the user is not logged in
    return <Navigate to="/" state={{ openLoginModal: true }} replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route
          path="about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="contact-us"
          element={
              <ContactUs />
          }
        />
        <Route
          path="product/:id"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/success"
          element={
            <ProtectedRoute>
              <TxnSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/fail"
          element={
            <ProtectedRoute>
              <TxnFail />
            </ProtectedRoute>
          }
        />
        <Route
          path="track-order"
          element={
            <ProtectedRoute>
              <TrackOrder />
            </ProtectedRoute>
          }
        />
       
        <Route
          path="track-order/details/:id"
          element={
            <ProtectedRoute>
              <TrackOrderDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="products/:type"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="support"
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          }
        />
        <Route
          path="subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="order-status"
          element={
            <ProtectedRoute>
              <OrderStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="blog"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route
          path="blogDetails"
          element={
            // <ProtectedRoute>
              <BlogDetails />
            // </ProtectedRoute>
          }
        />
        <Route
          path="privacypolicy"
          element={
              <PrivacyPolicy />
          }
        />
        <Route
          path="refferal"
          element={
            <ProtectedRoute>
              <Referrals />
            </ProtectedRoute>
          }
        />
        <Route
          path="shippingpolicy"
          element={
            <ProtectedRoute>
              <ShippingPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="returnpolicy"
          element={
            <ProtectedRoute>
              <ReturnPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="terms-and-conditions"
          element={
              <TermsAndConditions />
          }
        />
        <Route
          path="legal"
          element={
            <ProtectedRoute>
              <Legal />
            </ProtectedRoute>
          }
        />
        <Route
          path="account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="account/orders/order-details"
          element={
            <ProtectedRoute>
              <OrderDetails orderStatus="Arriving" />
            </ProtectedRoute>
          }
        />
        <Route
          path="process"
          element={
            <ProtectedRoute>
              <Process />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="search-results"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />
        <Route
          path="verifying-prescription"
          element={
            <ProtectedRoute>
              <VerifyingPrescription />
            </ProtectedRoute>
          }
        />
 
     
        <Route
          path="prescription-analyzed"
          element={
            <ProtectedRoute>
              <PrescriptionAnalyzed />
            </ProtectedRoute>
          }
        />
           <Route
          path="*"
          element={
              <NotFound />
          }
        />
        
        {/* Add any additional protected routes here */}
      </Routes>


      <Footer />
      <ToastContainer 
          position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    </div>
  );
}

export default App;
