import { useEffect, useState } from "react";

export function useGeolocation() { 

    //llamdo a la api de geolocalizacion

    const [ state, setState ] = useState({
        latitude: null,
        longitude: null,
        error: null,
    })

    useEffect(() => {
        if(!navigator.geolocation) {
            setState((prev) => ({ ...prev, error: "Geolocalizacion no soportada en este navegador." }));
            return;
        }
        //funciones de exito y error

        const hamdleSuccess  = (error) => {
            setState({
                latitude: error.coords.latitude,
                longitude: error.coords.longitude,
                error: null,
            });
        }

        const hendleError = (error) => {
            setState((prev) => ({
            ...prev,
            error: `Error al obtener la geolocalizacion: ${error.message}`,
            //usar coordenadas predeterminadas si hay un error
            latitude: -34.61, // Buenos Aires
            longitude: -58.38, // Buenos Aires

        }))
        }
    

    const options = {
        timeout: 5000, // 5 segundos
        maximumAge: 0, // No usar caché
    }

    navigator.geolocation.getCurrentPosition(hamdleSuccess, hendleError, options);
    }, [])

    return state;

}