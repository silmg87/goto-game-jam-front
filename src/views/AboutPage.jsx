import TitleH1 from "../components/TitleH1";
import TitleH2 from "../components/TitleH2";
import {Image, Card, CardHeader, CardBody} from "@nextui-org/react";
import { IconCode, IconMessages, IconLayersIntersect } from '@tabler/icons-react';

export default function About() {
    
    return(
        <>
            <section className="container mx-auto px-2 my-20 text-center lg:w-[1200px]">
                <TitleH1>Nosotros</TitleH1>
                <p className="text-[#ABDAE5] px-2 mt-8 mb-20"><b>GOTO Game JAM</b>, el epicentro de la creatividad y la innovación en el mundo de los videojuegos. Somos apasionados desarrolladores y entusiastas de los juegos que creemos firmemente en la magia que ocurre cuando la comunidad se une para dar vida a ideas extraordinarias.</p>

                <TitleH2>Nuestra Misión</TitleH2>
                <div className="flex flex-col justify-center items-center md:flex-row mt-8 gap-4 mb-20">    
                    <Image
                        isBlurred
                        className="mx-auto"
                        width={240}
                        alt=""
                        src="../../public/nosotros.jpg"
                    />
                    <p className="md:w-1/2 text-[#ABDAE5] px-2 mt-5 mb-5 text-left">En GOTO Game JAM, nos esforzamos por proporcionar una plataforma donde la imaginación no tiene límites. Nuestra misión es fomentar la colaboración, la experimentación y la superación de límites creativos al desafiar a los equipos a crear videojuegos increíbles en un tiempo récord.</p>
                </div>

                <TitleH2>Lo que nos hace únicos</TitleH2>
                <div className="md:grid md:grid-cols-3 mt-8 mb-20">
                    <Card className="text-[#ABDAE5] my-5 bg-[#ABDAE5]/5 w-[250px] mx-auto rounded-lg p-3">
                        <CardHeader className="flew flex-row items-center justify-start">
                            <IconCode  size="24px" strokeWidth="1.5" color="white" className=" drop-shadow-lg"/>
                            <h3 className="text-md ml-3 font-semibold">Innovación Constante</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Celebramos la innovación y el pensamiento fuera de la caja. En GOTO Game JAM, cada línea de código es una obra de arte y cada juego es una historia por descubrir.</p>
                        </CardBody>
                    </Card>

                    <Card className="text-[#ABDAE5] my-5 bg-[#ABDAE5]/5 w-[250px] mx-auto rounded-lg p-3">
                        <CardHeader className="flew flex-row items-center justify-start">
                            <IconMessages size="24px" strokeWidth="1.5" color="white" className=" drop-shadow-lg"/>
                            <h3 className="text-md ml-3 font-semibold">Comunidad Enérgica</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Creemos en la fuerza de la comunidad. GOTO Game JAM es más que una competencia; es un lugar donde los desarrolladores pueden conectarse, aprender y crecer juntos.</p>
                        </CardBody>
                    </Card>

                    <Card className="text-[#ABDAE5] my-5 bg-[#ABDAE5]/5 w-[250px] mx-auto rounded-lg p-3">
                        <CardHeader className="flew flex-row items-center justify-start">
                            <IconLayersIntersect size="24px" strokeWidth="1.5" color="white" className=" drop-shadow-lg"/>
                            <h3 className="text-md ml-3 font-semibold">Inclusividad</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Todos son bienvenidos en GOTO Game JAM. No importa tu nivel de habilidad, todos tienen la oportunidad de brillar y aprender en este emocionante desafío.</p>
                        </CardBody>
                    </Card>
                </div>    
            </section>
        </>
    )
}