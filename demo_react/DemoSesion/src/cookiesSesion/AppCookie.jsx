import { useAuthCookie } from "./useAuthCookie";

export default function AppCookie() {
    const {token, login, logout}=useAuthCookie();

    return(
        <div>
            <h3>Auth con Cookie</h3>
            {
                token ? (
                    <>
                    <p>Sesion Activa</p>
                    <buton onClick= {logout}>
                        Logout
                    </buton>
                    </>
                ):(
                    <buton onClick= {loging}>
                        Login
                    </buton>
                )
            }
        </div>
    );
}