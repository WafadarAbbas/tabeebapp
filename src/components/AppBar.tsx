"use client";

import { clearUser } from "../app/store/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { useDispatch  } from "react-redux";


export default function AppBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const r = localStorage.getItem("role");
    setAuthed(!!token);
    setRole(r);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    dispatch(clearUser());
    setAuthed(false);
    setRole(null);
    router.push("/login");
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Link href="/" className="navbar-brand fw-bold " style={{color:'#014e78'}}>
          Tabeeb
        </Link>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Link href="/doctor/doctor-form" className="nav-link">Join as Doctor</Link>
            <Link href="/doctor/doctor-list" className="nav-link">Doctors</Link>
            <Link href="/labs" className="nav-link">Labs</Link>
             <Link href="/hospitals/hospitals-list" className="nav-link">Hospitals</Link>

          </Nav>

          <div className="d-flex align-items-center">
            {!authed ? (
              <>
                <Link href="/login" passHref>
                  <Button variant="outline-success" className="me-2">Login</Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button   style={{backgroundColor:'#014e78'}}>Sign Up</Button>
                </Link>
              </>
            ) : (
              <>
                <Badge bg="secondary" className="me-3">{role}</Badge>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
