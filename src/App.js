import "./App.css";
import Login from "./components/Login/Login";
import Navigation from "./components/Navbar";
import Register from "./components/Login/register";
import Home from "./components/list/home";
import AddBook from "./components/Book/AddBook";
import { AuthProvider } from "./components/access/AuthContext";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Learn from "./components/Learn";
import IssueForm from "./components/issue/AddIssue";
import Addmember from "./components/member/Addmember";
import Memberlist from "./components/list/Memberlist";
import ViewMember from "./components/member/ViewMember";
import EditMember from "./components/member/EditMember";
import EditBookForm from "./components/Book/EditBook";
import BookDetails from "./components/Book/ViewBook";
import Footer from "./components/footer";
import AddIssue from "./components/issue/AddIssue";
import IssueList from "./components/list/IssueList";
import ViewIssue from "./components/issue/ViewIssue";
import ToggleNavBar from "./components/toggle/ToggleNavBar";
import About from './components/About';
import Homepage from "./components/HomePage";
import LogoutPage from "./components/Login/Logout";

function App() {


  return (
    <div className="App">
      <Router>
        <ToggleNavBar>
          <Navigation />
        </ToggleNavBar>
       
        <Routes>
          
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Login hide Navigation />} />
          <Route exact path="/logout" element={<LogoutPage />} />


         
          <Route exact path="/addissue" element={<AddIssue />} />
          <Route exact path="/issuelist" element={<IssueList />} />
          <Route path="/viewissue/:issueId" element={<ViewIssue/>} />


          <Route exact path="/booklist" element={<Home />} />
          <Route exact path="/add" element={<AddBook />} />
          <Route path="/editbook/:bookId" element={<EditBookForm />} />
          <Route path="/viewbook/:bookId" element={<BookDetails />} />
          

          <Route exact path="/memberlist" element={<Memberlist />} />
          <Route exact path="/addmember" element={<Addmember />} />
          <Route path="/viewmember/:memberId" element={<ViewMember />} />
          <Route path="/editmember/:memberId" element={<EditMember />} />


          <Route exact path="/about" element={<About />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
