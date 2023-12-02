import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
            <section className="container mx-auto">
                <h2>Lista de juegos</h2>
                    <ul>
                    {
                        games.map((game) => 
                        <li key={game._id}>
                            {game.name}
                            <Link to={`/games/${game._id}`}>Ver Detalle</Link>
                        </li>)
                    }
                    </ul>
            </section>
        </>
    )
}