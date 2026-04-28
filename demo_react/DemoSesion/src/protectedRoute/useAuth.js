import { useState, useEffect } from "react";
import { useActionData } from "react-router-dom";

export function useAuth(){
    const [user, setUser]= useState(null);
    const [loading, setLoading]= useState(true);

    const checkAuth = async()=>{
        try{
            const res= await fetch("http://localhost:3000/perfil",{
                credentials: "include"
            });

            if(!res.ok) throw new Error();
            const data= await res.json();
            setUser(data.user);
        }catch{
            setUser(null);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        checkAuth();
    },[]);

    return {user, loading, checkAuth};
}