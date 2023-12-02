import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/userDatacontext";

export default function Login() {

    const { setUserContext } = useContext(UserContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:8083/api/session', {
            method: "POST",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then( res => res.json())
        .then( res => {
            console.log(res)
            localStorage.setItem('token', res.token)
            setUserContext({ 
                    id: res.account.account._id,
                    email: res.account.account.email,
                    name: res.account.account.name,
                    surname: res.account.account.surname,
                    rol: res.account.account.rol,
                    isAuth: true,
            })
                if(res.account.account.rol != 'admin') {
                    navigate('/panel', {replace: true})
                } else {
                    navigate('/dashboard', {replace: true})
                }
        })
    }

    return(
        <>
            <section className="container mx-auto">
                <h1 className="text-center">Login GotoGameJam</h1>
                <form id="form" onSubmit={handleFormSubmit} className="flex flex-col max-w-2xl mx-auto" encType="application/x-www-form-urlencoded">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={handleEmailChange} value={email}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={handlePasswordChange} value={password}/>

                    <button type="submit">Login</button>
                </form>
                <Link className="block mx-auto text-center" to="/register">Registrarme</Link>
            </section>
        </>
    )
}