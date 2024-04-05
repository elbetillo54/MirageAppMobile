import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NuevaOrden = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Mirage</Text>
                <Text style={[styles.titleText, { color: '#ca8a04' }]}>App</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#ca8a04' }]}
                    onPress={() => navigation.navigate("Menu")}
                >
                    <Text style={styles.buttonText}>Crear Nueva Orden</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#ca8a04' }]}
                    onPress={() => navigation.navigate("ListaMesas")}
                >
                    <Text style={styles.buttonText}>Lista De Mesas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', // Alinear al principio
        paddingTop: 50, // Añadir un relleno superior
    },
    titleContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    titleText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 200

    },
    button: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default NuevaOrden;
