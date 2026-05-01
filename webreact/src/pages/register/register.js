import React from 'react';
import '../../App.css'
import { Link } from 'react-router-dom'
import Firebase from '../../Firebase.js';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const db = getFirestore(Firebase)
const auth = getAuth(Firebase)

const erros = {
  "auth/email-already-in-use": "Email já cadastrado",
  "auth/invalid-email": "Email inválido",
  "auth/weak-password": "Senha muito fraca"
};

class Register extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            nome: "",
            sobrenome: "",
            dataNascimento: "",
            email: "",
            senha: "",
            message: ""
        }
    }

    async cadastrar() {
        const { nome, sobrenome, dataNascimento, email, senha } = this.state;

        if (!nome?.trim() || !sobrenome?.trim() || !dataNascimento?.trim() || !email?.trim() || !senha?.trim()) {
            this.setState({ message: "Todos os dados devem ser preenchidos!" });
            return;
        }

        try {
            const userDto = { nome, sobrenome, dataNascimento, email };

            const userCredentials = await createUserWithEmailAndPassword(auth, email, senha)
            
            await setDoc(doc(db, "users", userCredentials.user.uid), userDto)
            
            alert("Usuário cadastrado com sucesso!")

            window.location.href = '/login';
        }
        catch (e) {
            console.log(e.code)
            console.log(e.message)
            this.setState({ message: erros[e.code] || "Erro ao cadastrar usuário" });
        }
    }

    render() {
        return (
            <div className='page auth'>
                <div className='modal'>
                    <h2>Cadastro</h2>
                    <input id='input_nome' name='nome' type='text' placeholder='Nome...' onChange={(e) => this.setState({ nome: e.target.value })}></input>
                    <input id='input_sobrenome' name='sobrenome' type='text' placeholder='Sobrenome...' onChange={(e) => this.setState({ sobrenome: e.target.value })}></input>
                    <input id='input_dataNasc' name='dataNasc' type='text' placeholder='Data de nascimento...' onChange={(e) => this.setState({ dataNascimento: e.target.value })}></input>
                    <input id='input_email' name='email' type='text' placeholder='E-mail...' onChange={(e) => this.setState({ email: e.target.value })}></input>
                    <input id='input_senha' name='senha' type='password' placeholder='Senha...' onChange={(e) => this.setState({ senha: e.target.value })}></input>
                    <button id='btn_acessar' onClick={(e) => this.cadastrar()}>Cadastrar</button>
                    <Link className="link" to="/login">Já tenho cadastro</Link>
                    {this.state.message && <span className='message'>{this.state.message}</span>}
                   
                </div>
            </div>
        )
    }
}
export default Register;