import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Contexto y Reductores
import PedidoContext from '../context/pedidos/pedidosContext'; // (Específico de tu aplicación)
import { useNavigation } from '@react-navigation/native'; // (Depende de tu configuración de navegación)
import firebase from '../firebase'; // Asegúrate de que la ruta sea correcta según la ubicación de tu archivo de configuración de Firebase

const ListaMesas = () => {
    const [mesasIncompletas, setMesasIncompletas] = useState([]);
    const navigation = useNavigation();
    
    const {pedido, selectP} = useContext(PedidoContext)

    useEffect(() => {
        // Consulta Firebase para obtener las mesas con pedidos incompletos
        const unsubscribe = firebase.db.collection("ordenes")
            .onSnapshot(snapshot => {
                const mesasData = [];
                snapshot.forEach(doc => {
                    mesasData.push({ id: doc.id, ...doc.data() });
                });
                setMesasIncompletas(mesasData);
            });
        
        return () => unsubscribe();
    }, []);

    const navigateToResumenPedidoSeleccionado = (mesaId) => {
        selectP(mesaId);
        navigation.navigate("ResumenPedidoSeleccionado", { mesaId });
    };
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Mesas Activas</Text>
                {mesasIncompletas.map(mesa => (
                    <TouchableOpacity
                        key={mesa.id}
                        style={[
                            styles.mesaContainer,
                            { backgroundColor: mesa.completado ? 'green' : '#fff' }
                        ]}
                        onPress={() => navigateToResumenPedidoSeleccionado(mesa.id)}
                    >
                        <Text style={[
                            styles.mesaText,
                            { color: mesa.completado ? '#fff' : 'black' }
                        ]}>Mesa número: {mesa.mesa}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        elevation: 3,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop:20,
        color: "black"
    },
    mesaContainer: {
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
        elevation: 1
    },
    mesaText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});

export default ListaMesas;
