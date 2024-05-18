import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef } from 'react';

export default function ProtectedRoute (props) {
    const useEffectOnce = useRef(false);
    try {
        const [cookies] = useCookies();
        const { Component } = props;
        const token = cookies.token;
        const decodedToken = jwtDecode(token);
        return <>
            <Component/>
        </>
    } catch (error) {
        const navigate = useNavigate();
        useEffect(() => {
            if (useEffectOnce.current == false) {
                alert("This route is restricted, signin first!");
                navigate("/signin");
                return () => { useEffectOnce.current = true }
            }
        }, []);
    }
};