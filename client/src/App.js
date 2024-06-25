import Login from './pages/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './pages/Navbar';
import Blog from './pages/Blog';
import UserProfile from './pages/UserProfile';
import Page from './pages/Page'
import AllBlogs from './pages/AllBlogs';
import BlogsByTag from './pages/BlogsByTag';
import Footer from './pages/Footer'
import EditProfile from './pages/EditProfile';


function App() {
  return (
   <>
   <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/userprofile/:username" element={<UserProfile/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path='/page/:blogId' element={<Page/>}/>
      <Route path='/:category/:tag' element={<BlogsByTag/>}/>
      <Route path='/all' element={<AllBlogs/>}/>
      <Route path='/editprofile' element={<EditProfile/>}/>
    </Routes>
    <Footer/>
   </BrowserRouter>
   </>
  );
}

export default App;
