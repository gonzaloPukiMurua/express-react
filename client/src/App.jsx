import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { OrderFormPage } from "./pages/OrderFormPage.jsx";
import { OrdersPage } from "./pages/OrdersPage.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { OrderDetailPage } from "./pages/OrderDetailPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { ProductPage } from "./pages/ProductPage.jsx";
import { ProductFormPage } from "./pages/ProductFormPage.jsx";
import { ProfilePage } from "./pages/ProfilePage";
import { UsersPage } from "./pages/UsersPage.jsx";
import { Unauthorized } from "./pages/Unauthorized.jsx";
import { UserProvider } from "./context/UsersContext.jsx";
import { ProductsPage } from "./pages/ProductsPage.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

function App() {
  console.log("Estoy en App.jsx");
  return (
    <BrowserRouter>
    <UserProvider>

      <ProductProvider>
      <AuthProvider>
        <OrderProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Rutas protegidas para usuarios autenticados */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetailPage />} />
              <Route path="/create-order" element={<OrderFormPage />} />
            </Route>
            
            {/* Rutas protegidas solo para administradores */}
            <Route element={<ProtectedRoute requiredRoles={["admin"]} />}>
              <Route path="/products" element= {<ProductsPage/>}/>
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/update-product/:id" element={<ProductFormPage />} />
              <Route path="/create-product" element={<ProductFormPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </OrderProvider>
      </AuthProvider>
      </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
