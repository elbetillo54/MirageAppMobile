import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable, Alert, Platform, TextInput } from 'react-native';
import PedidoContext from '../context/pedidos/pedidosContext';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';

const ResumenPedidoSeleccionado = ({ route }) => {
    const { selectedOrderId } = useContext(PedidoContext);
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);
    const [mesa, setMesa] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        if (route.params && route.params.mesaId) {
            const { mesaId } = route.params;
            setMesa(mesaId);
            
            // Consultar el pedido de la mesa seleccionada en Firebase
            const unsubscribe = firebase.db.collection("ordenes").doc(mesaId)
                .onSnapshot(snapshot => {
                    const data = snapshot.data();
                    setPedido(data?.orden || []);
                    setTotal(data?.total || 0);
                });

            return () => unsubscribe();
        }
    }, [route.params]);

    const eliminarProducto = id => {
        // Tu lógica para eliminar un producto del pedido
    };

    return (
        <ScrollView>
            <Text style={styles.titulo}>Resumen Pedido</Text>

            {pedido.map((platillo, i) => (
                <View key={platillo.id + i} style={styles.platilloContainer}>
                    <Image source={{ uri: platillo.imagen }} style={styles.imagen} />
                    <View style={styles.platilloInfo}>
                        <Text style={styles.platilloNombre}>{platillo.nombre}</Text>
                        <Text style={styles.platilloPrecio}>Precio: {platillo.precio}$</Text>
                        <Text style={styles.platilloCantidad}>Cantidad: {platillo.count}</Text>
                        
                    </View>
                </View>
            ))}

            <Text style={styles.titulo}>Total a pagar: {total}$</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    titulo: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
        marginBottom: 35
    },
    platilloContainer: {
        backgroundColor: "white",
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        width: "90%",
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    platilloInfo: {
        flex: 1,
    },
    platilloNombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    platilloPrecio: {
        fontSize: 16,
        color: "black"
    },
    platilloCantidad: {
        fontSize: 16,
        color: "black"
    },
    imagen: {
        width: 70,
        height: 70,
        borderRadius: 0,
        marginRight: 10,
    },
    eliminar: {
        marginTop: 10,
        backgroundColor: "#ED4223",
        marginRight: 1,
        width: "100%",
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
});

export default ResumenPedidoSeleccionado;
