import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/userDatacontext";
import { useContext, useState } from "react"
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function NavBar({isAuth, isAdmin}) {
    
    const navigate = useNavigate();
    const { setUserContext } = useContext(UserContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault()

        fetch('http://localhost:8083/api/session', {
            method: "DELETE",
            headers: {
                'auth-token' : localStorage.getItem('token')
            },
        })
        .then( res => res.json())
        .then( res => {
            console.log(res)
            setUserContext({ 
                    email: null,
                    name: null,
                    surname: null,
                    rol: null,
                    isAuth: false,
            })
            localStorage.removeItem('token')
            navigate('/', {replace: true})
        })
    }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-gradient-to-t from-[#32ADC1] to-[#050F20] h-full border-0"
    >
      <NavbarContent className="pr-3" justify="end">
        <NavbarBrand>
          <Link to="/" className="font-bold text-inherit">GTGameJam</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
            <NavbarItem>
                <Link className="font-medium" to="/">Home</Link>
            </NavbarItem>
            <NavbarItem>
                <Link className="font-medium" to="/about">Nosotros</Link>
            </NavbarItem>
            <NavbarItem>
                <Link className="font-medium" to="/games">Juegos</Link>
            </NavbarItem>
            {!isAuth && (
                <NavbarItem>
                    <Link className="font-medium" to="/login">Iniciar Sesión</Link>
                </NavbarItem>
            )}                     
            {isAuth && isAdmin && (
                <NavbarItem>
                    <Link className="font-medium" to="/dashboard">Dashboard</Link>
                </NavbarItem>
            )}   
            {isAuth && !isAdmin && (
                <NavbarItem>
                    <Link className="font-medium" to="/panel">Panel</Link>
                </NavbarItem>
            )}
            {isAuth && (
                 <NavbarItem>
                    <form id="form" onSubmit={handleLogout}>
                        <button type="submit" className="font-medium">Cerrar Sesión</button>
                    </form>
                </NavbarItem> 
            )} 
      </NavbarContent>

      <NavbarMenu>
            <NavbarMenuItem>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-medium w-full" size="lg">Home</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="font-medium w-full" size="lg">Nosotros</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
                <Link to="/games" onClick={() => setIsMenuOpen(false)} className="font-medium w-full" size="lg">Juegos</Link>
            </NavbarMenuItem>
            {!isAuth && (
                <NavbarMenuItem>
                    <Link to="/login" className="font-medium w-full" size="lg">Iniciar Sesión</Link>
                </NavbarMenuItem>
            )}                     
            {isAuth && isAdmin && (
                <NavbarMenuItem>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="font-medium w-full" size="lg">Dashboard</Link>
                </NavbarMenuItem>
            )}   
            {isAuth && !isAdmin && (
                <NavbarMenuItem>
                    <Link to="/panel" onClick={() => setIsMenuOpen(false)} className="font-medium w-full" size="lg">Panel</Link>
                </NavbarMenuItem>
            )}
            {isAuth && (
                 <NavbarMenuItem>
                    <form id="form" onSubmit={handleLogout}>
                        <button type="submit" className="font-medium">Cerrar Sesión</button>
                    </form>
                </NavbarMenuItem> 
            )} 
      </NavbarMenu>
    </Navbar>
  );
}


