import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"
import { UserContext } from "../contexts/userDatacontext";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from "@nextui-org/react";
import TitleH1 from "../components/TitleH1";

export default function ManageGames() {

    const { contextUserData } = useContext(UserContext)

    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8083/games', {
            method: 'GET',
            headers: {
                'auth-token' : localStorage.getItem('token')
            }
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else if(response.status == 401) {
                navigate('/login', {replace: true})
            }
        })
        .then(data => {
            setGames(data)
        })
    }, [navigate]) 

    return (
            <>
            <div className="flex items-center justify-center flex-col relative">
                <div className="text-center mt-10 mb-10">
                <TitleH1>Administrar Juegos</TitleH1>
                
                    <div className="max-w-4xl w-full p-6 mx-3 my-5 md:grid md:grid-cols-2 md:gap-8 ">
                    {
                       games.map((game) => 
                       <Card key={game._id} className="max-w-[350px] bg-[#ABDAE5]/5 mb-8 px-5 pt-3">
                       <CardHeader className="flex gap-3">
                           <Image
                           alt="nextui logo"
                           height={40}
                           radius="sm"
                           src="../../public/img-default.jpg"
                           width={40}
                           />
                           <div>
                           <p className="text-[12px] font-medium text-[#ABDAE5]">ID : {game._id}</p>
                           </div>
                       </CardHeader>
                       <Divider/>
                       <CardBody>
                           <h2 className="text-2xl mb-2 font-semibold text-[#32ADC1]">
                               {game.name}
                           </h2>
                           <div className="col-span-2">
                               <ul className="font-normal text-gray-700 antialiased">
                                   <li className="text-[#ABDAE5]">
                                       <span className="mr-2 inline-block font-semibold text-sm text-[#ABDAE5]">Genero: </span>{game.genre}
                                   </li>
                                   <li className="text-[#ABDAE5]">
                                       <span className="mr-2 inline-block font-semibold text-sm text-[#ABDAE5]">Edición: </span>{game.edition}
                                   </li>
                               </ul>
                           </div>
                       </CardBody>
                       <Divider/>
                       <CardFooter>
                       <div className="gap-5 flex w-full">
                               {
                                   contextUserData.rol == 'admin' &&
                                   <>
                                       <Button className="w-full text-md mb-4 font-medium text-white bg-[#32ADC1]" radius="sm" size="sm">
                                           <Link to={`/dashboard/edit-game/${game._id}`}>Editar</Link>
                                       </Button>
                                       <Button className="w-full text-md mb-4 font-medium text-white bg-red-500" radius="sm" size="sm">
                                           <Link to={`/dashboard/delete-game/${game._id}`}>Eliminar</Link>  
                                       </Button>
                                   </>
                               }
                               {
                                   contextUserData.rol == 'judge' &&
                                   <>
                                       <div className="w-full">
                                           <Link to={`/panel/add-vote/${game._id}`}className="uppercase w-full block rounded py-1.5 px-3 text-center align-middle text-white font-semibold bg-cyan-500  hover:bg-cyan-400 active:bg-cyan-600 transition disabled:bg-slate-200">Votar</Link>
                                       </div>
                                   </>
                               }
                           </div>
                       </CardFooter>
                   </Card>)
                    }
                    </div>
                </div>
            </div>
        </>
    )
}
