import { useState } from "react"
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch('https://cvi.up.railway.app/auth/signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

const Login = ({ setToken }) => {

    const [username, setUserName] = useState();
    const [password, setpassword] = useState();


    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            name_user: username,
            password
        })
        localStorage.setItem("token", token?.token)
        localStorage.setItem("name_user", username)
        setToken(token?.token)
    }

    return (
        <div className="login-containerF">
            <div className="login-conatiner">
                <div className="containerImg">
                </div>
                <div className="containerForm">


                    <h2 >Bienvenido</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Username
                        </label>
                        <input type={"text"} onChange={e => setUserName(e.target.value)} />
                        <label>
                            password
                        </label>
                        <input type={"password"} onChange={e => setpassword(e.target.value)} />
                        <div className="containerBtnLogin">
                            <button type="submit" className="btnLogin">Enviar</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func
}
export default Login;