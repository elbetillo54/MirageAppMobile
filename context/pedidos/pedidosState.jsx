import React, {useReducer} from 'react';

import pedidosReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    NUEVO_PEDIDO, 
    SELECCIONAR_ORDEN_PEDIDO
} from "../../types/index"

const PedidoState = props =>{

    // Crear el state inicial 
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0
    }

    //  useReducer con dispatch para ejecutar las funciones 
    const [state, dispatch] = useReducer(pedidosReducer, initialState)

    const seleccionarPlatillo = platillo => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
        
    }

    // Cuando el usuario confirma un platillo 
    const guardarPedido = pedido => {
        const repetido = state.pedido.find(articulo => articulo.id === pedido.id)

        if(repetido) {
            repetido.count += pedido.count
            repetido.total += pedido.total
            
        }else{
            dispatch({
                type: CONFIRMAR_ORDENAR_PLATILLO,
                payload: pedido
            })
        }

        
    }

    // Mostrar el total a pagar en el resumen 

    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    //Eliminar articulos del state 
    const eliminarP = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    const nuevoP = () => {
        dispatch({
            type: NUEVO_PEDIDO
        })
    }

    const selectP = orderId => {
        console.log({orderId});
        
        dispatch({
            type: SELECCIONAR_ORDEN_PEDIDO,
            payload: orderId
        })
    } 

    

    return(
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarP,
                nuevoP,
                selectP,
                selectedOrderId: state.selectedOrderId
                
                }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;