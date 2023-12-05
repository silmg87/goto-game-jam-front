import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TitleH1 from "../components/TitleH1";
import {Card, CardHeader, CardBody, Image, Button} from "@nextui-org/react";

export default function DeleteGame() {

    const [game, setGame] = useState({})
    const [members, setMembers] = useState([])
    const [showModal, setModal] = useState(false);

    const navigate = useNavigate();
    const { idGame } = useParams()

    useEffect(() => {
        fetch(`http://www.localhost:8083/games/${idGame}`,{
            method: 'GET',
         })
            .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setGame(data)
                    setMembers(data.members)
            })
    }, [idGame]) 

    const handleFormSubmit = (e) => {
        e.preventDefault()

        fetch(`http://www.localhost:8083/games/${idGame}`, {
            method: "DELETE",
            headers: {
                'auth-token' : localStorage.getItem('token')
            },
        })
        .then( res => res.json())
        .then( res => {
            console.log(res)
            if(res) {
                navigate('/dashboard/manage-games', {replace: true})
            } else {
                navigate(`/dashboard/delete-game/${idGame}`, {replace: true})
            }
        })
    }

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    return(
        <>
            <div className="flex items-center justify-center flex-col relative">
                <div className="text-center my-10 mx-5">
                    <TitleH1>Eliminar de juego</TitleH1>
                    <Card className="max-w-[350px] bg-[#ABDAE5]/5 mt-8 mx-auto">
                        <CardHeader className="flex gap-3">
                        <Image
                            alt="nextui logo"
                            height={40}
                            radius="sm"
                            src="../../public/img-default.jpg"
                            width={40}
                            />
                            <div>
                            <p className="font-medium text-lg text-[#ABDAE5]">{game.name}</p>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="flex justify-center gap-8">
                                <p className="text-[#ABDAE5]">Género: {game.genre}</p>
                                <p className="text-[#ABDAE5]">Edición: {game.edition}</p>
                            </div>
                            <div>
                            <h3 className="text-[#ABDAE5] text-center mt-5 font-semibold">Desarrolladores</h3>
                                <ul className="text-center">
                                {
                                    members.map(member => 
                                        <li className="text-[#ABDAE5]" key={member.id}>{member.name}</li>
                                    )
                                }
                                </ul>
                            </div>
                        </CardBody>
                    </Card>
                    
                    <Button className="w-full mt-8 mb-4 text-md font-medium text-white bg-[#32ADC1]" radius="sm" size="sm" onClick={openModal}>Confirmar</Button>
                    <Button className="w-full text-md mb-4 font-medium text-white bg-red-500" radius="sm" size="sm">        
                        <Link to="/dashboard/manage-games">Cancelar</Link>
                    </Button>
                {
                showModal &&
                    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                        <div className="bg-[#1D7294] w-[300px] px-8 py-10 rounded-md z-50">
                            <h1 className="text-2xl mb-4 font-bold text-[#ABDAE5]">Eliminar Juego <span className="flex flex-col text-sm">{game._id}</span></h1>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-8">
                                        <p>La acción que estas a punto de cometer es irreversible</p>
                                        <p>¿Estas seguro que desas eliminar el juego {game.name} ?</p>
                                    </div>
                                    <div className="flex justify-end w-full gap-2">
                                    <Button radius="sm" size="sm" type="button" className="bg-red-500 text-md px-7 py-2 rounded-md text-white font-medium w-full" onClick={closeModal}>Cancelar</Button>
                                <Button radius="sm" size="sm" type="sumbit" className="bg-[#32ADC1] text-md px-7 py-2 rounded-md text-white font-medium w-full">Confirmar</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                }
                    </div>
            </div>   
        </>
    )
}