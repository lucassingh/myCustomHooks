import React, { useState, useEffect, useRef } from 'react'

export const useFetch = (url) => {

    const isMounted = useRef(true)

    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false; //es para prevenir el set state que no se llame si el compoennte no esta montado por eso usamos el useRef
        }
    }, [])


    useEffect(() => {

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                }                
            })
            .catch( () => {
                setState({
                    loading: false,
                    error: 'No se pudo cargar la info',
                    data: null
                })
            })
    }, [url])

    return state;

}
