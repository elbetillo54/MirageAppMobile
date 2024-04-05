import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import DetallePlatillo from './DetallePlatillo';

const Menu = () => {
    const { menu, obtenerProductos } = useContext(FirebaseContext);
    const { seleccionarPlatillo } = useContext(PedidoContext);
    const navigation = useNavigation();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const handleItemPress = useCallback((item) => {
        const { existencia, ...platillo2 } = item;
        seleccionarPlatillo(platillo2);
        navigation.navigate("DetallePlatillo");
    }, [navigation, seleccionarPlatillo]);

    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={styles.articuloContainer}>
                <Image source={{ uri: item.imagen }} style={styles.imagen} />
                <View style={styles.textContainer}>
                    <Text style={styles.nombre}>{item.nombre}</Text>
                    <Text style={styles.precio}>Precio: {item.precio}$</Text>
                    <Text style={styles.categoria}>Categoría: {item.categoria}</Text>
                </View>
            </View>
        </TouchableOpacity>
    ), [handleItemPress]);

    const articulosFiltrados = categoriaSeleccionada ? menu.filter(articulo => articulo.categoria === categoriaSeleccionada) : menu;
    
    const data = articulosFiltrados.reduce((acc, articulo) => {
        if (!acc[articulo.categoria]) {
            acc[articulo.categoria] = [];
        }
        acc[articulo.categoria].push(articulo);
        return acc;
    }, {});

    const secciones = Object.keys(data)
        .sort()
        .map(categoria => ({
            title: categoria,
            data: data[categoria],
        }));

    return (
        <SectionList
            sections={secciones}
            keyExtractor={(item, index) => item.id}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.separadorContainer}>
                    <Text style={styles.separador}>{title.toUpperCase()}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    articuloContainer: {
        marginLeft: "auto",
        marginRight: "auto",
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 4,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 3
    },
    imagen: {
        width: 70,
        height: 70,
        borderRadius: 0,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    precio: {
        fontSize: 16,
        color: 'black',
        fontWeight: "bold"
    },
    categoria: {
        fontSize: 16,
        color: 'black',
        fontWeight: "bold"
    },
    separadorContainer: {
        backgroundColor: '#eee',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    separador: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#000",
    },
});

export default Menu;
