import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';

const Menu = () => {
    // Contexto de Firebase
    const { menu, obtenerProductos } = useContext(FirebaseContext);
    // Estado para almacenar la categoría seleccionada
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    useEffect(() => {
        obtenerProductos();
    }, []);

    // Filtrar los artículos según la categoría seleccionada
    const articulosFiltrados = categoriaSeleccionada
        ? menu.filter(articulo => articulo.categoria === categoriaSeleccionada)
        : menu;

    // Agrupar los artículos por categoría para la SectionList
    const data = articulosFiltrados.reduce((acc, articulo) => {
        if (!acc[articulo.categoria]) {
            acc[articulo.categoria] = [];
        }
        acc[articulo.categoria].push(articulo);
        return acc;
    }, {});

    // Convertir el objeto agrupado en un array de secciones
    const secciones = Object.keys(data)
        .sort() // Ordenar las claves (categorías) alfabéticamente
        .map(categoria => ({
            title: categoria,
            data: data[categoria],
        }));

    return (
        <SectionList
            sections={secciones}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
                <View style={styles.articuloContainer} key={item.id}>
                    <Image source={{ uri: item.imagen }} style={styles.imagen} />
                    <View style={styles.textContainer}>
                        <Text style={styles.nombre}>{item.nombre}</Text>
                        <Text style={styles.precio}>Precio: {item.precio}</Text>
                        <Text style={styles.categoria}>Categoría: {item.categoria}</Text>
                    </View>
                </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.separadorContainer}>
                    <Text style={styles.separador}>{title}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    articuloContainer: {
        marginLeft: "auto", //Centro de la izquierda
        marginRight:"auto", //Centro de la derecha 
        flex: 1, 
        width: '90%', 
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 2,
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
    },
    categoria: {
        fontSize: 16,
        color: 'black',
    },
    separadorContainer: {
        backgroundColor: '#eee',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    separador: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#000"
    },
});

export default Menu;
