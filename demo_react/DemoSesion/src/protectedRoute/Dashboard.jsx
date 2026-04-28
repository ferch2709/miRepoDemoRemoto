export default function Dashboard({user, onLogout}){
    return(
        <div>
            <h1>Dashboad</h1>
            <p>Bienvenido</p>
            <p>{user?.username}</p>
            
            <button onClick={onLogout}>
                Logout
            </button>
        </div>
    );
};