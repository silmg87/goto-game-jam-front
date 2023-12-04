import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Card, CardHeader, CardFooter, Image, Button} from "@nextui-org/react";
import TitleH1 from "../components/TitleH1";

export default function Games(){

    const [games, setGames] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8083/games', {
            method: 'GET'
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            setGames(data)
        })
    }, [navigate]) 

    return(
        <>
            <section className="container mx-auto px-2 my-10">
                <TitleH1>Galería de Videosjuegos</TitleH1>
                    {
                        games.map((game) => 
                        <Card key={game._id} isFooterBlurred className="w-[300px] h-[300px] mx-auto my-16 col-span-12 sm:col-span-5 shadow-[0_0_10px_-1px_rgba(171,218,229,1)]">
                            <CardHeader className="absolute z-10 bottom-16 flex-col items-start">
                                <h4 className="text-[#050F20] font-medium text-2xl">{game.name}</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt=""
                                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                                src="../../public/img-default.jpg"
                            />
                            <CardFooter className="absolute bottom-0 z-10 justify-between">
                                <div>
                                    <p className="text-[#050F20] text-tiny">{game.genre}</p>
                                    <p className="text-[#050F20] text-tiny">{game.edition}</p>
                                </div>
                                <Button className="text-[#050F20] font-semibold bg-[#32ADC1]" radius="full" size="sm">
                                    <Link to={`/games/${game._id}`}>Ver Detalle</Link>
                                </Button>
                            </CardFooter>
                        </Card>)
                    }
            </section>
        </>
    )
}