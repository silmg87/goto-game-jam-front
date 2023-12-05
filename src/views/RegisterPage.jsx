import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Image } from "@nextui-org/react";

export default function Register() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setPasswordConfirm] = useState('');

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleSurnnameChange = (e) => {
        setSurname(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:8083/api/account', {
            method: "POST",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({name, surname, email, password, confirm_password})
        })
        .then( res => res.json())
        .then( res => {
            console.log(res)
            if(!res.error) {
                navigate('/login', {replace: true})
            }
        })
    }

    return(
        <>
            <section className="flex justify-center items-center h-screen">
                <div className="bg-[#ABDAE5]/5 mx-2 px-6 py-3 rounded-lg text-center flex flex-col justify-center items-center max-w-[400px]">
                    <Image
                            isBlurred
                            className="mx-auto"
                            width={80}
                            alt=""
                            src="../../public/logo.svg"
                        />
                    <h1 className="text-[#32ADC1] text-2xl font-semibold">Registro</h1>
                    <form id="form" onSubmit={handleFormSubmit} className="w-full mt-5" encType="application/x-www-form-urlencoded">
                     
                        <Input className="mb-6" variant="flat" size="sm" type="text" label="Nombre" name="name" id="name" onChange={handleNameChange} value={name}/>

                        <Input className="mb-6" variant="flat" size="sm" type="text" label="Apellido" name="surname" id="surname" onChange={handleSurnnameChange} value={surname}/>

                        <Input className="mb-6" variant="flat" size="sm" type="email" label="Email" name="email" id="email" onChange={handleEmailChange} value={email}/>

                        <Input className="mb-6" variant="flat" size="sm" type="password" label="Password" name="password" id="password" onChange={handlePasswordChange} value={password}/>
                        
                        <Input variant="flat" size="sm" type="password" label="Confirmar Password" name="confirm_password" id="confirm_password" onChange={handlePasswordConfirmChange} value={confirm_password}/>
                                            
                        <Button className="text-md mt-8 mb-4 font-medium bg-[#32ADC1]" type="submit" radius="sm" size="sm">
                            Registrarse
                        </Button>
                    </form>
                    <Link className="text-small block mx-auto text-center font-medium text-[#32ADC1]" to="/login">Volver al Inicio de sesión de GoToGamesJam.</Link>
                </div>
            </section>
        </>
    )
}