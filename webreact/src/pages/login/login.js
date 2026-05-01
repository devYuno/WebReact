import { Link } from 'react-router-dom';
import React from 'react';
import '../../App.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Firebase from '../../Firebase.js';

const auth = getAuth(Firebase)

const erros = {
    "auth/invalid-credential" : "Login inválido",
    "auth/invalid-email" : "Login inválido"
}

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            senha: '',
            message: ''
        }
    }

    async acessar() {
        const { email, senha } = this.state;

        if ( !email?.trim() || !senha?.trim()) {
            this.setState({ message: "Todos os dados devem ser preenchidos!" });
            return;
        }

        try {
            const userDto = { email, senha }

            await signInWithEmailAndPassword(auth, userDto.email, userDto.senha )

            this.setState({ message: "Acesso liberado" })

            window.location.href = '/';
        }
        catch(e) {
            console.log(e.code)
            console.log(e.message)
            this.setState({ message: erros[e.code] || "Não foi possivel realizar o login."})
        }
    }

    render() {
        return (
            <div className='page auth'>
                <div className='modal'>
                    <h2>Login</h2>
                    <input id='input_email' name='email' type='text' placeholder='Email' onChange={(e) => this.setState({ email: e.target.value }) }></input>
                    <input id='input_senha' name='senha' type='password'  placeholder='Senha' onChange={(e) => this.setState({ senha: e.target.value })}></input>
                    <button id='btn_acessar' onClick={(e) => { this.acessar(e) }}>Acessar</button>
                    <Link className="link" to="/register">Não tenho cadastro</Link>
                    {this.state.message && <span className='message'>{this.state.message}</span>}
                </div>
            </div>
        )
    }
}

export default Login;
