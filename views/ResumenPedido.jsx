import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable, Alert, Platform, TextInput } from 'react-native';
import PedidoContext from '../context/pedidos/pedidosContext';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';

const ResumenPedido = () => {
    // Context del pedido
    const { pedido, total, mostrarResumen, eliminarP, nuevoP, selectedOrderId } = useContext(PedidoContext);
    const [orden, setOrden] = useState(null);
    const [mesa, setMesa] = useState('');
    const navigation = useNavigation();
    const [comentario, setComentario] = useState('');

    console.log(selectedOrderId)


    const progresoPedido = async () => {

        try {
            const mesaExistenteRef = await firebase.db.collection("ordenes").where("mesa", "==", mesa).get();

            if (!mesaExistenteRef.empty) {
                const primerDocumento = mesaExistenteRef.docs[0];
                const identificador = primerDocumento.id;
                const referencia = firebase.db.collection("ordenes").doc(identificador);

                // Obtener el valor existente del campo "orden"
                const ordenExistente = primerDocumento.data().orden;
                const precio = primerDocumento.data().total
                const comen = primerDocumento.data().comentarios

                // Agregar un nuevo objeto al array "orden"
                const nuevosProductos = pedido.map(item => ({
                    categoria: item.categoria,
                    count: item.count,
                    descripcion: item.descripcion,
                    id: item.id,
                    imagen: item.imagen,
                    nombre: item.nombre,
                    precio: item.precio,
                    total: item.total,
                }));



                // Agregar los nuevos productos al array ordenExistente
                const nuevoOrden = [...ordenExistente, ...nuevosProductos];

                // Actualizar el documento con el nuevo array "orden"
                await referencia.update({ orden: nuevoOrden });

                // Actualizar el documento con el nuevo comentario 

                const nuevoCom = [...comen, comentario]
                console.log(nuevoCom);
                
                await referencia.update({ comentarios: nuevoCom})
                await referencia.update({ completado: false})

                // Recalcular el nuevo total
                const calcularTotalFinal = (productos) => {
                    let totalFinal = 0;
                    productos.forEach(producto => {
                        console.log(producto);

                        totalFinal += producto.total;

                    });
                    return totalFinal + precio;
                };

                const totalFinal = calcularTotalFinal(nuevosProductos);
                await referencia.update({ total: totalFinal });

                // Actualizar el campo "total" en Firebase



            } else {
                console.log("No hay orden existente para esta mesa.");

                // Crear un nuevo documento
                const pedidoOb = {
                    completado: false,
                    total: Number(total),
                    orden: pedido,
                    mesa: mesa,
                    creado: Date.now(),
                    comentarios: [comentario.trim()]
                }
                const nuevoOrden = await firebase.db.collection("ordenes").add(pedidoOb);
                console.log("ID del nuevo documento:", nuevoOrden.id);
            }

            navigation.navigate("NuevaOrden");
            nuevoP();
        } catch (error) {
            console.error("Error al procesar el pedido:", error);
            Alert.alert("Error", "Hubo un problema al procesar el pedido. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal);
    };

    const eliminarProducto = id => {
        Alert.alert(
            "¿Seguro que quieres eliminar el platillo?",
            "Podrás agregarlo nuevamente desde el menú",
            [
                {
                    text: "Confirmar",
                    onPress: () => {
                        eliminarP(id);
                    }
                },
                {
                    text: "Cancelar",
                    style: "cancel",
                }
            ]
        );
    };

    const pressableContent = Platform.OS === 'android' ? (
        <Pressable
            onPress={() => {
                navigation.navigate("Menu");
            }}
            android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
            style={styles.boton}>
            <Text style={styles.textoboton}>Seguir Ordenando</Text>
        </Pressable>
    ) : (
        <TouchableNativeFeedback onPress={null}>
            <View style={styles.boton}>
                <Text style={{ color: 'white' }}>Seguir Ordenando</Text>
            </View>
        </TouchableNativeFeedback>
    );

    const pressableContent_Ordenar = Platform.OS === 'android' ? (
        <Pressable
            onPress={() => {
                progresoPedido();
            }}
            android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
            style={[styles.boton, { backgroundColor: "#ca8a04", marginTop: 0 }]}>
            <Text style={styles.textoboton}>Terminar Orden</Text>
        </Pressable>
    ) : (
        <TouchableNativeFeedback onPress={null}>
            <View style={styles.boton}>
                <Text style={{ color: 'white' }}>Seguir Ordenando</Text>
            </View>
        </TouchableNativeFeedback>
    );

    return (
        <ScrollView>
            <Text style={styles.titulo}>Resumen Pedido</Text>

            {pedido.map((platillo, i) => (
                <View key={platillo.id + i} style={styles.platilloContainer}>
                    <Image source={{ uri: platillo.imagen }} style={styles.imagen} />
                    <View style={styles.platilloInfo}>
                        <Text style={styles.platilloNombre}>{platillo.nombre}</Text>
                        <Text style={styles.platilloPrecio}>Precio: ${platillo.precio}</Text>
                        <Text style={styles.platilloCantidad}>Cantidad: {platillo.count}</Text>
                        <Pressable style={styles.eliminar} onPress={() => eliminarProducto(platillo.id)}>
                            <Text style={[styles.textoboton, { fontSize: 15 }]}>Eliminar</Text>
                        </Pressable>
                    </View>
                </View>
            ))}

            <Text style={styles.titulo}>Total a pagar: {total}$</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Número de mesa:</Text>
                <TextInput
                    style={styles.input}
                    value={mesa}
                    onChangeText={text => setMesa(text)}
                    keyboardType="numeric"
                    placeholder="Ingrese el número de mesa"
                    placeholderTextColor={"#444"}
                    color= "black"
                />
            </View>

            

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Comentarios:</Text>
                <TextInput
                    style={styles.input}
                    value={comentario}
                    onChangeText={text => setComentario(text)}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Ingrese comentarios"
                    placeholderTextColor={"#444"}
                    color= "black"
                    
                />
            </View>

            {pressableContent}
            {total === 0 ? null : pressableContent_Ordenar}
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
    boton: {
        width: "90",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        //elevation: 2,
        backgroundColor: 'gray',
        width: "90%",
        marginBottom: 20
    },
    textoboton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
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
    inputContainer: {
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20
    },
    label: {
        marginBottom: 10,
        fontSize: 15,
        color: "black"
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
});

export default ResumenPedido;