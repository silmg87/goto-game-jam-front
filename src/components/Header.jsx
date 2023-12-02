import { UserContext } from "../contexts/userDataContext"
import { useContext } from "react"

import NavBar from "./NavBar"

export default function Header() {

    const { contextUserData } = useContext(UserContext)

    let auth = false;
    let admin = false;

    if(contextUserData.isAuth != false) {
        auth = true
    }

    if(contextUserData.rol == 'admin') {
        admin = true
    }

    return (
        <>
            <div className="w-full bg-black text-white h-[60px]">
                <NavBar isAuth={auth} isAdmin={admin}></NavBar>
            </div>
        </>
    )
}
