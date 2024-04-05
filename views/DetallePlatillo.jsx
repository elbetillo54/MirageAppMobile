import React, { useContext } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';


const DetallePlatillo = () => {

    const navegacion = useNavigation();

    // Pedido context
    const { platillo } = useContext(PedidoContext);
    const { nombre, imagen, descripcion, precio } = platillo;

    const handlePress = () => {
        navegacion.navigate("FormularioPlatillo")
    };

    const pressableContent = Platform.OS === 'android' ? (
        <Pressable
            onPress={handlePress}
            android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
            style={styles.boton}>
            <Text style={ styles.textoboton }>Ordenar Platillo</Text>
        </Pressable>
    ) : (
        <TouchableNativeFeedback onPress={handlePress}>
            <View style={styles.boton}>
                <Text style={{ color: 'white' }}>Ordenar Platillo</Text>
            </View>
        </TouchableNativeFeedback>
    );

    return (
        <>


            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.titulo}>{nombre}</Text>

                    <Image source={{ uri: imagen }} style={styles.imagen} />

                    <Text style={styles.precio}>Precio: {precio}$</Text>

                    <Text style={styles.descripcion}>{descripcion}</Text>

                    {pressableContent}

                </View>
            </ScrollView>




        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: "white",
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        padding: 30,
        marginBottom: 30
    },
    imagen: {
        width: 200,
        height: 200,
        marginTop: 30,
        borderRadius: 20
    },

    titulo: {
        textAlign: "center",
        fontSize: 30,
        color: "black",
        fontWeight: "bold",
    },
    precio: {
        fontSize: 20,
        marginTop: 17,
        fontWeight: "700",
        color: "black",
    },
    descripcion: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 16,
        color: "black",
    },
    boton: {
        
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        //elevation: 2,
        backgroundColor: '#ca8a04',
        width: "100%"
    },
    textoboton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    }
    

});

export default DetallePlatillo;