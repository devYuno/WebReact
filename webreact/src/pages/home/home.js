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
            <>
                <div className="page" style={{ padding: 0, flexDirection: "row" }}>
                    <div className="barraLateral">
                        {user ? (
                            <div className="userData" style={{ gap: "3rem"}}>
                                <h1>Bem-vindo, {user.nome}</h1>
                                <div className="userData" style={{ gap: "2px"}}>
                                <span style={{ fontWeight: "bold" }}>Nome:</span>
                                <span>{user.nome} {user.sobrenome}</span>
                                <br/>
                                <span style={{ fontWeight: "bold" }}>E-mail:</span>
                                <span>{user.email}</span>
                                <br/>
                                <span style={{ fontWeight: "bold" }}>Data de nascimento:</span>
                                <span>{user.dataNascimento}</span>
                                </div>
                            </div>
                        ) : (
                            <p>Carregando...</p>
                        )}
                        <div style={{ textAlign: "center" }}>
                        <button onClick={this.logout}>Sair</button>
                        </div>
                    </div>
                    <div className="page" style={{ paddingLeft: "3rem" }}>
                        <h1>Home</h1>
                    </div>
                </div>
            </>
        );
    }
}
export default Home;