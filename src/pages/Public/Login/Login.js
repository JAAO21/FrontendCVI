import { useState } from "react"
import PropTypes from 'prop-types';
import "./index.css";
import logo from '../../../assests/logo/logoCvi.jpg';
import comercioAmbulante from '../../../assests/images/comercioAmbulante.jpg';

async function loginUser(credentials) {
    return fetch('http://localhost:3500/auth/signIn', {
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
    localStorage.setItem("name_user", username)
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            name_user: username,
            password
        });
        setToken(token);
    }

    return (
        <div className="login-conatiner">
            <div className="containerImg">
                <img src={comercioAmbulante} />

            </div>
            <div className="containerForm">
                <div className="containerImgLogin">
                    <img className="imgLogoLogin" src={logo} />
                </div>
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
    )
}

Login.propTypes = {
    setToken: PropTypes.func
}
export default Login;