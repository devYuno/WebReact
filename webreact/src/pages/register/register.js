import '../../App.css'
import { Link } from 'react-router-dom'

function Register() {
    return (
        <div className='page auth'>
                <div className='modal'>
                    <h2>Cadastro</h2>
                    <input id='input_name' name='name' type='text' onChange={(e) => {  }}></input>
                    <input id='input_email' name='email' type='text' onChange={(e) => {  }}></input>
                    <input id='input_senha' name='senha' type='password' onChange={(e) => {  }}></input>
                    <button id='btn_acessar' onClick={(e) => {  }}>Acessar</button>
                    <Link className="link" to="/login">Já tenho cadastro</Link>
                    {/* <span className='message'>{this.state.message}</span> */}
                </div>
            </div>
    )
}
export default Register;