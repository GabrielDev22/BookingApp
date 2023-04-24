import { Link } from "react-router-dom";

export default function RegisterPage(){
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto border">
                <input type="text" placeholder="John Doe"></input>
                <input type="email" placeholder={"your@email.com"}></input>
                <input type="password" placeholder="password"></input>
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Allready a member?
                    <Link className="underline text-black" to={'/login'}>Register now</Link>
                </div>
            </form>
            </div>
        </div>
    )
}