import { Link } from "react-router-dom"
export default function NotFound() {
    return (
        <>
        <div className="flex items-center justify-center flex-col relative">
            <div className="max-w-3xl w-full px-6">
                <h1 className="text-slate-600 font-bold text-4xl pt-14 text-left">Página no encontrada</h1>
                    <div className="my-10">
                        <p className="mb-4">Lo sentimos, la página que buscas no existe.</p>
                        <p className="mb-8">No te preocupes, aun puedes seguir disfrutantdo de nuestra página web</p>   
                        <Link to={"/"} className="text-blue-600 font-medium hover:opacity-75 underline">
                            Haz clic aqui para volver a la Home
                        </Link>
                    </div>
            </div>
        </div>
        </>
    )
}