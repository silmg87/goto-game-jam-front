import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

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
            <section className="container mx-auto">
                <h1 className="text-center">Registrarse GotoGameJam</h1>
                <form id="form" onSubmit={handleFormSubmit} className="flex flex-col max-w-2xl mx-auto" encType="application/x-www-form-urlencoded">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" id="name" onChange={handleNameChange} value={name}/>

                    <label htmlFor="surname">Apellido</label>
                    <input type="text" name="surname" id="surname" onChange={handleSurnnameChange} value={surname}/>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={handleEmailChange} value={email}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={handlePasswordChange} value={password}/>

                    <label htmlFor="confirm_password">Confirmar Password</label>
                    <input type="password" name="confirm_password" id="confirm_password" onChange={handlePasswordConfirmChange} value={confirm_password}/>

                    <button type="submit">Registrarse</button>
                </form>
                <Link className="block mx-auto text-center" to="/login">Volver</Link>
            </section>
        </>
    )
}