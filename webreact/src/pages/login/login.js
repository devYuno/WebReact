import React from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';

// Gambiarra feia que eu fiz para navegar dentro de classe
function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

const credenciais = {
    emailReal: 'pucpr@gmail.com',
    senhaReal: '12345'
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

    setEmail(event) {
        let email = event.target.value
        this.setState({ email: email })
    }

    setSenha(event) {
        let senha = event.target.value
        this.setState({ senha: senha })
    }

    acessar() {
        if (this.state.email === credenciais.emailReal && this.state.senha === credenciais.senhaReal) {
            this.setState({ message: "Acesso liberado" })

            this.props.navigate("/");
        }
        else {
            this.setState({ message: "Acesso negado" })
        }
    }

    render() {
        return (
            <div className='page auth'>
                <div className='modal'>
                    <h2>Login</h2>
                    <input id='input_email' name='email' type='text' onChange={(e) => { this.setEmail(e) }}></input>
                    <input id='input_senha' name='senha' type='password' onChange={(e) => { this.setSenha(e) }}></input>
                    <button id='btn_acessar' onClick={(e) => { this.acessar(e) }}>Acessar</button>
                    <Link className="link" to="/register">Não tenho cadastro</Link>
                    <span className='message'>{this.state.message}</span>
                </div>
            </div>
        )
    }
}

export default withNavigation(Login);
