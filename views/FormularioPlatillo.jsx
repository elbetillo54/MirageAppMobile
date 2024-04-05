import React, {useState, useContext, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Pressable, TouchableNativeFeedback, Alert } from 'react-native';

import PedidoContext from '../context/pedidos/pedidosContext';
import { useNavigation } from '@react-navigation/native';

const FormularioPlatillo = () => {

  const [count, setCount] = useState(1); //Hook del contador 
  const [total, guardarTotal] = useState(0);

  //Context platillo
  const { platillo, guardarPedido } = useContext(PedidoContext)
  const {precio} = platillo

  // Redireccionar 
  const navigation = useNavigation();

  //Calcular la cantidad desde que el componente carga 
  useEffect(() => {
    calcularTotal()
  }, [count]);
  
  //Calcular el total del platillo por su cantidad
  const calcularTotal = () => {
    const totalPagar = precio * count;
    guardarTotal(totalPagar)
  }
  
  

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };


  //Animación del boton dependiendo de la plataforma 
  const pressableContent = Platform.OS === 'android' ? (
    <Pressable
        onPress={() =>{
          confirmarOdern()
        }}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
        style={styles.boton}>
        <Text style={ styles.textoboton }>Agregar al Pedido</Text>
    </Pressable>
) : (
    <TouchableNativeFeedback onPress={null}>
        <View style={styles.boton}>
            <Text style={{ color: 'white' }}>Agregar al Pedido</Text>
        </View>
    </TouchableNativeFeedback>
);

  //Confirmar la orden
  const confirmarOdern = () => {
    Alert.alert(
      "¿Deseas confirmar tu pedido?",
      "Un pedido confirmado ya no se podrá modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            //Almacenar el pedido al pedido principal
            const pedido = {
              ...platillo,
              count,
              total
            }
            //console.log(pedido);
            guardarPedido(pedido);
            
            //Navegar hacia el Resumen 
            navigation.navigate("ResumenPedido")
            
          }
        },
        {
          text: "Cancelar",
          style: "cancel",
        }
      ],
      
    )
  }

  return (
    <View >
    <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={decrementCount}>
      <Text style={styles.buttonText}>-</Text>
    </TouchableOpacity>
    <Text style={styles.counterText}>{count}</Text>
    <TouchableOpacity style={styles.button} onPress={incrementCount}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
    </View>

    <View style={styles.totalContainer}>
      <Text style={styles.totalText}>Subtotal: {total}$</Text>
    </View>

    <View style= {styles.botonContainer}>
      {pressableContent}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: 'lightgray',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color:"black"
    
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: "black",
  },
  totalContainer: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  totalText: {
    fontSize: 30,
    color: "black",
    fontWeight: 'bold',
    marginTop: 20, // Ajusta el margen superior según sea necesario
  },
  botonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  }
  ,
  
  boton: {
    width: "90",
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    //elevation: 2,
    backgroundColor: '#ca8a04',
    width: "90%"
},
textoboton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
}
});



export default FormularioPlatillo;