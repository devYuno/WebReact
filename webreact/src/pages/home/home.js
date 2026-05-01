import React from "react";
import '../../App.css'
import Firebase from "../../Firebase.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        const auth = getAuth(Firebase);
        const db = getFirestore(Firebase);

        this.unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                window.location.href = "/login";
                return;
            }

            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.setState({ user: docSnap.data() });
                } else {
                    console.log("Usuário não encontrado.");
                }
            } catch (e) {
                console.log("Erro ao buscar dados:", e);
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    logout = async () => {
        const auth = getAuth();

        try {
            await signOut(auth);

            window.location.href = "/login";
        } catch (e) {
            console.log("Erro ao deslogar:", e);
        }
    };

    render() {
        const { user } = this.state;

        return (
            <div className="page">
                {user ? (
                    <div>
                        <h1>Bem-vindo, {user.nome} {user.sobrenome}</h1>
                        <span>{user.dataNascimento}</span>
                    </div>
                ) : (
                    <p>Carregando...</p>
                )}
                <button onClick={this.logout}>Sair</button>
            </div>
        );
    }
}
export default Home;