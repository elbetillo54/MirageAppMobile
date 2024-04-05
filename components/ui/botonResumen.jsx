import React, {useContext} from 'react'
import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../context/pedidos/pedidosContext';


const BotonResumen = () => {

    const navigation = useNavigation();

    const {pedido} = useContext(PedidoContext)

    if (pedido.length === 0) return null;
 
    return(
        <Pressable style={styles.boton} onPress={() => navigation.navigate("ResumenPedido")}>
            <Text style={styles.texto}>Ir a Pedido</Text>
            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    boton: {
        flexDirection: 'row', // Para alinear el texto y el icono horizontalmente
        alignItems: 'center', // Para centrar verticalmente el texto y el icono
        marginRight: 12,
    },
    texto: {
        fontWeight: "bold",
        color: "black",
        fontSize: 17.5
    }
})

export default BotonResumen;
