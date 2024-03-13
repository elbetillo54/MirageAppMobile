import React, {useEffect, useReducer} from 'react';

import firebase from '../../firebase/index'
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

import { OBTENER_PRODUCTOS_EXITO } from '../../types';

const FirebaseState = props =>{

    
    

    // Crear el state inicial 
    const initialState = {
        menu: []
    }

    //  useReducer con dispatch para ejecutar las funciones 
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    //Funcion que se ejectuta para traer los productos
    const obtenerProductos = () => {
        console.log(`Desde Firebase State`);
        
    }

    useEffect(() => {
        dispatch({
            type: OBTENER_PRODUCTOS_EXITO,
        });
        //consultar firebase
        firebase.db
            .collection("productos").where("existencia", "==", true).onSnapshot(manejarSnapshot) //Trae solo los que estan en existencia

        function manejarSnapshot(snapshot){
            let platillos = snapshot.docs.map(doc => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });

            //Tenemos Resultador
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: platillos //Payload cambia el state 
            });
        }
    }, [])


    return(
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
                }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;