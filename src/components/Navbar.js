import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiFillHome, AiFillBook, AiOutlineUser,AiOutlineLogout} from "react-icons/ai"; // Import icons from React Icons
import { BsBook, BsPhone } from "react-icons/bs";
import { BiBookBookmark } from "react-icons/bi";
import "./Navbar.css"
export default function Navigation() {
  return (
    <Navbar  variant="dark" expand="lg" className="sidebar-flex-column "style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} >
      <Container>
        <Navbar.Brand href="/home">
          <BsBook/> Bookworm Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbutton">
            <Nav.Link href="/home">
              <AiFillHome /> Home
            </Nav.Link>
            <NavDropdown title={<><AiFillBook /> Book</>} className="navbutton">
              <NavDropdown.Item href="/add">
                <AiFillBook /> Add Book
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/booklist">
                <AiFillBook /> Book List
              </NavDropdown.Item>
           
            </NavDropdown>
            <NavDropdown title={<><AiOutlineUser /> Member</>} className="navbutton">
              <NavDropdown.Item href="/addmember">
                <AiOutlineUser /> Add Member
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/memberlist">
                <AiOutlineUser /> Member List
              </NavDropdown.Item>
             
            </NavDropdown>
            <NavDropdown title={<><BiBookBookmark /> Issue Book</>} className="navbutton" >
              <NavDropdown.Item href="/addissue">
                <BiBookBookmark /> Add Issue
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/issuelist">
                <BiBookBookmark /> Issue List
              </NavDropdown.Item>
           
             
            </NavDropdown>
            <Nav.Link href="/about" className="navbutton">
              <BsPhone /> About
            </Nav.Link>
            <Nav.Link href="/logout" className="logout">
              <AiOutlineLogout />  Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
