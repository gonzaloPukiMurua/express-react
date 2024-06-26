import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import TaskPage from "./pages/TaskPage";


function App() {
 
  return (
    <AuthProvider>
      <BrowserRouter>   
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>          
        
          <Route element={<ProtectedRoute/>}>
            <Route path="/tasks" element={<TaskPage/>}/>
            <Route path="/add-task" element={<TaskFormPage/>}/>
            <Route path="/tasks/:id" element={<TaskFormPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
   
  )
}

export default App
