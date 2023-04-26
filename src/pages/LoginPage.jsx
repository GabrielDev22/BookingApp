import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function LoginPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try {
           const {data} = await axios.post('/login', {email,password});
           setUser(data);
            alert('login sucessful')
            setRedirect(true); 
        } catch (e) {
            alert('Login failen')
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }


    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto border" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value) }></input>
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Dont have an account yet?
                    <Link className="underline text-align" to={'/register'}>Register now</Link>
                </div>
            </form>
            </div>
        </div>
    )
}
