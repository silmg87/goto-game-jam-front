import { createContext, useState } from "react"

export const UserContext = createContext()

export function UserDataContextProvider(props) {

    const [contextUserData, setUserContext] = useState({
        id: null,
        email: null,
        name: null,
        surname: null,
        rol: null,
        isAuth : false
    })
    
    const user = { contextUserData, setUserContext };

    return  (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}