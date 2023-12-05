import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/userDatacontext";
import { Input, Button, Image } from "@nextui-org/react";

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
            <section className="flex justify-center items-center h-screen">
                <div className="bg-[#ABDAE5]/5 mx-2 p-8 rounded-lg text-center flex flex-col items-center max-w-[400px]">
                    <Image
                        isBlurred
                        className="mx-auto"
                        width={200}
                        alt=""
                        src="../../public/logo.svg"
                    />
                    <h1 className="text-[#32ADC1] text-2xl font-semibold">Iniciar sesión</h1>
                    <form id="form" onSubmit={handleFormSubmit} className="w-full mt-5" encType="application/x-www-form-urlencoded">
                        <Input className="mb-8" variant="flat" type="email" label="Email" size="sm" name="email" id="email" onChange={handleEmailChange} value={email}/>
                        <Input variant="flat" type="password" label="Password" size="sm" name="password" id="password" onChange={handlePasswordChange} value={password}/>
                        <Button className="text-md mt-8 mb-4 font-medium bg-[#32ADC1]" type="submit" radius="sm" size="sm">
                            Iniciar sesión
                        </Button>
                    </form>
                    <Link className="text-small block mx-auto text-center font-medium text-[#32ADC1]" to="/register">¿Aún no estas registrado?. Registrarte.</Link>
                </div>
            </section>
        </>
    )
}