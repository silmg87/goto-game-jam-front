import TitleH2 from "../components/TitleH2";
import {Image, Card, CardHeader, CardBody} from "@nextui-org/react";
import { IconSourceCode, IconDeviceGamepad2, IconAffiliate, IconAward } from '@tabler/icons-react';

export default function Home() {

    return (
        <> 
            <section className="mb-20 text-center">
                <section className="flex justify-center flex-col px-2 items-center content-center text-center banner-web w-[100vw]">
                    <h1 className="tracking-tight inline font-semibold from-[#ABDAE5] to-[#32ADC1] text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b">¡UNITE AL DESAFIO!</h1>
                    <p className="my-2 italic text-[#ABDAE5] font-bold text-xl">¿Estás listo para la batalla?</p>
                    <p className="italic text-[#ABDAE5] font-bold text-lg">¡La cuenta regresiva ha comenzado!</p>
                </section>
                <section className="my-20 px-2 text-center">
                    <TitleH2>Bienvenido a GOTO Game JAM</TitleH2>
                    <div className="flex flex-col justify-center items-center md:flex-row mt-8">
                        <p className="md:w-1/2 text-[#ABDAE5] px-2 my-5 text-left">¡Bienvenidos desarrolladores y entusiastas del mundo de los videojuegos a GOTO Game JAM, donde la creatividad y la velocidad se encuentran en una fusión única de 48 horas! Nos emociona presentar la plataforma que será testigo de la magia de la creación de juegos en tiempo real.</p>
                        <Image
                            isBlurred
                            className="mx-auto"
                            width={240}
                            alt=""
                            src="../../public/desarrolladores.jpg"
                        />
                    </div>
                </section>
                <section className="my-20 px-2 text-center">
                    <TitleH2>¿Qué es GOTO Game JAM?</TitleH2>
                    <div className="flex flex-col justify-center items-center md:flex-row mt-8 gap-3">
                    <Image
                            isBlurred
                            className="mx-auto"
                            width={240}
                            alt=""
                            src="../../public/gotogamesjam.jpg"
                    />
                    <p className="md:w-1/2 text-[#ABDAE5] px-2 my-5 text-left">GOTO Game JAM es más que una competencia; es un desafío apasionante donde equipos de desarrolladores se sumergen en el emocionante universo de la creación de videojuegos en un tiempo récord. Durante 48 horas, los participantes darán vida a sus ideas, superarán obstáculos y competirán por el reconocimiento en diversas categorías.</p>
                    </div>
                </section>
                <section className="my-20 px-2 text-center">
                    <TitleH2>¿Qué Puedes Esperar?</TitleH2>
                    <div className="md:grid md:grid-cols-2 md:gap-8 mt-8 max-w-[800px] mx-auto">
                        <Card className="text-[#ABDAE5] my-5 bg-[#ABDAE5]/5 w-[250px] mx-auto rounded-lg p-3">
                            <CardHeader className="flew flex-row items-center justify-start">
                                <div className="bg-[#32ADC1] p-1.5 rounded-full">
                                <IconSourceCode size="24px" strokeWidth="1.5" color="white" className=" drop-shadow-lg"/>
                                </div>
                                <h3 className="text-lg ml-3 font-semibold">Desarrollo</h3>
                            </CardHeader>
                            <CardBody>
                                <p>Una experiencia de desarrollo intensiva.</p>
                            </CardBody>
                        </Card>

                        <Card className="text-[#ABDAE5] my-5 bg-[#ABDAE5]/5 w-[250px] mx-auto rounded-lg p-3">
                            <CardHeader className="flew flex-row items-center justify-start">
                                <div className="bg-[#32ADC1] p-1.5 rounded-full">
                                <IconDeviceGamepad2 size="24px" strokeWidth="1.5" color="white" className=" drop-shadow-lg"/>
                                </div>
                                <h3 className="text-lg ml-3 font-semibold">Juegos</h3>
                            </CardHeader>
                            <CardBody>
                                <p>Juegos innovadores que desafiarán tus expectativas.</p>
                            </CardBody>
                        </Card>

                        <Card className="text-[#ABDAE5] my-5 bg-[#ABDAE5]/5 w-[250px] mx-auto rounded-lg p-3">
                            <CardHeader className="flew flex-row items-center justify-start">
                                <div className="bg-[#32ADC1] p-1.5 rounded-full">
                                <IconAffiliate size="24px" strokeWidth="1.5" color="white" className=" drop-shadow-lg"/>
                                </div>
                                <h3 className="text-lg ml-3 font-semibold">Interacción</h3>
                            </CardHeader>
                            <CardBody>
                                <p>Interacción con talentosos jueces y colegas desarrolladores.</p>
                            </CardBody>
                        </Card>

                        <Card className="text-[#ABDAE5] my-5 bg-[#ABDAE5]/5 w-[250px] mx-auto rounded-lg p-3">
                            <CardHeader className="flew flex-row items-center justify-start">
                                <div className="bg-[#32ADC1] p-1.5 rounded-full">
                                <IconAward size="24px" strokeWidth="1.5" color="white" className=" drop-shadow-lg"/>
                                </div>
                                <h3 className="text-lg ml-3 font-semibold">Premios</h3>
                            </CardHeader>
                            <CardBody>
                                <p>La oportunidad de llevar a casa premios increíbles.</p>
                            </CardBody>
                        </Card>
                    </div>                    
                    <p className="text-[#ABDAE5] px-2 my-5">Únete a nosotros en este viaje lleno de adrenalina donde cada línea de código, cada diseño y cada decisión cuentan. ¡GOTO Game JAM está a punto de comenzar, y tú eres parte fundamental de esta emocionante travesía!
                        ¡Prepárate para sumergirte en el mundo del desarrollo de videojuegos como nunca antes en GOTO Game JAM!
                    </p>
                </section>
            </section>
        </>
    )
}


