import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardFooter, Image, Button, Select, SelectItem } from "@nextui-org/react";
import TitleH1 from "../components/TitleH1";

export default function Games(){

    const [games, setGames] = useState([])
    const [edition, setEdition] = useState('all')
    const [genre, setGenre] = useState('')
    const navigate = useNavigate()

    const handleEditionChange = (e) => {
        setEdition(e.target.value)
    }

    const handleGenreChange = (e) => {
        setGenre(e.target.value)
    }

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

    useEffect(() => {
        fetch(`http://localhost:8083/games/edition/${edition}?genre=${genre}`, {
            method: 'GET'
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            setGames(data)
        })
    }, [edition, genre])
    
    return(
        <>
            <section className="container mx-auto px-2 my-20 text-center lg:w-[1200px]">
                <TitleH1>Galería de Videosjuegos</TitleH1>
                <div className="flex flex-wrap w-full gap-8 mt-8">
                        <div className="w-full max-w-[300px] md:max-w-[600px] mx-auto">
                            <Select
                                label="Edición"
                                placeholder="Seleccione el año de edición"
                                className="w-full"
                                size="sm"
                                name="edicion" 
                                id="edicion" 
                                onChange={handleEditionChange} 
                                value={edition}
                                >
                                    <SelectItem key="all"  value="all">Todas</SelectItem>
                                    <SelectItem key="2023" value="2023">2023</SelectItem>
                                    <SelectItem key="2024" value="2024">2024</SelectItem>
                                    <SelectItem key="2025" value="2025">2025</SelectItem>
                                    <SelectItem key="2026" value="2026">2026</SelectItem>
                                    <SelectItem key="2027" value="2027">2027</SelectItem>
                                    <SelectItem key="2028" value="2028">2028</SelectItem>
                                </Select>
                        </div>
                        <div className="w-full max-w-[300px] md:max-w-[600px] mx-auto">
                            <Select
                                label="Generos"
                                placeholder="Seleccione el género"
                                className="w-full"
                                size="sm"
                                name="edicion" 
                                id="edicion" 
                                onChange={handleGenreChange} 
                                value={genre}
                                >
                                    <SelectItem key=""                value="">Todos</SelectItem>
                                    <SelectItem key="Ciencia Ficción" value="Ciencia Ficción">Ciencia Ficción</SelectItem>
                                    <SelectItem key="Fantasía"        value="Fantasía">Fantasía</SelectItem>
                                    <SelectItem key="Survival Horror" value="Survival Horror">Survival Horror</SelectItem>
                                    <SelectItem key="Carreras"        value="Carreras">Carreras</SelectItem>
                                    <SelectItem key="Estrategia"      value="Estrategia">Estrategia</SelectItem>
                                    <SelectItem key="Aventura"        value="Aventura">Aventura</SelectItem>
                                </Select>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 mt-8 mb-20">
                        {
                            games.map((game) => 
                            <Card key={game._id} isFooterBlurred className="w-[300px] h-[300px] mx-auto mt-16 shadow-[0_0_10px_-1px_rgba(171,218,229,1)]">
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
                                        <p className="text-[#050F20] text-tiny text-left">{game.genre}</p>
                                        <p className="text-[#050F20] text-tiny text-left">{game.edition}</p>
                                    </div>
                                    <Button className="text-[#050F20] font-semibold bg-[#32ADC1]" radius="sm" size="sm">
                                        <Link to={`/games/${game._id}`}>Ver Detalle</Link>
                                    </Button>
                                </CardFooter>
                            </Card>)
                        }
                        {
                            games.length == 0 &&
                            <p className="m-3 text-xl text-center col-span-3 text-[#ABDAE5]">No hay juegos disponibles con tu consulta</p>
                        }
                    </div>
            </section>
        </>
    )
}