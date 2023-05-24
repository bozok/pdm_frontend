import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import axios from "axios";
import { useAuthContext } from "./hooks/auth/useAuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginPage from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import UserNew from "./pages/user/UserNew";
import UserList from "./pages/user/UserList";
import UserUpdate from "./pages/user/UserUpdate";
import Permission from "./pages/setting/permission/Permission";
import OfficeList from "./pages/setting/office/OfficeList";
import OfficeUpdate from "./pages/setting/office/OfficeUpdate";
import OfficeNew from "./pages/setting/office/OfficeNew";
import LogList from "./pages/log/LogList";
import CustomerList from "./pages/customer/CustomerList";
import CustomerNew from "./pages/customer/CustomerNew";
import CustomerUpdate from "./pages/customer/CustomerUpdate";
import ChangePassword from "./pages/auth/ChangePassword";
import SaleList from "./pages/sale/SaleList";
import SaleNew from "./pages/sale/SaleNew";
import SaleIG from "./pages/saleDetail/SaleIG";
import ApproveList from "./pages/approve/ApproveList";
//import { useLoginStatus } from "./hooks/useLoginStatus";

axios.defaults.withCredentials = true;

function App() {
  const { user, dispatch } = useAuthContext();
  // const { getLoginStatus } = useLoginStatus();
  // useEffect(() => {
  //   async function loginStatus() {
  //     const status = await getLoginStatus();
  //     //console.log(status);
  //     //dispatch({ type: "LOGIN", payload: status });
  //   }
  //   loginStatus();
  // }, []);
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Layout>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user/new"
          element={
            user ? (
              <Layout>
                <UserNew />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user/list"
          element={
            user ? (
              <Layout>
                <UserList />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user/:id"
          element={
            user ? (
              <Layout>
                <UserUpdate />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/setting/permission"
          element={
            user ? (
              <Layout>
                <Permission />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/setting/office/list"
          element={
            user ? (
              <Layout>
                <OfficeList />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/setting/office/new"
          element={
            user ? (
              <Layout>
                <OfficeNew />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/setting/office/:id"
          element={
            user ? (
              <Layout>
                <OfficeUpdate />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/log/list"
          element={
            user ? (
              <Layout>
                <LogList />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/customer/new"
          element={
            user ? (
              <Layout>
                <CustomerNew />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/customer/list"
          element={
            user ? (
              <Layout>
                <CustomerList />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/customer/:id"
          element={
            user ? (
              <Layout>
                <CustomerUpdate />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/authentication/changepassword"
          element={
            user ? (
              <Layout>
                <ChangePassword />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/sale/list"
          element={
            user ? (
              <Layout>
                <SaleList />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/approve/list"
          element={
            user ? (
              <Layout>
                <ApproveList />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/sale/new/:id"
          element={
            user ? (
              <Layout>
                <SaleNew />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/sale/IG/:id"
          element={
            user ? (
              <Layout>
                <SaleIG />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/forgotpassword"
          element={user ? <Navigate to="/" /> : <ForgotPassword />}
        />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
        {/* <Route path="*" element={<div>Error 404 Page not found</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
