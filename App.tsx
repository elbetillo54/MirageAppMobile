import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from "@react-navigation/native"
import {  createStackNavigator } from "@react-navigation/stack"

import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';

/**Importar state de context */
import FirebaseState from './context/firebase/firebaseState';
import PedidoState from './context/pedidos/pedidosState'; 

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <>
    <FirebaseState>
      <PedidoState>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#ca8a04",
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white",
              letterSpacing: 2
            }
          }
           
        }

        >
          <Stack.Screen
            name='NuevaOrden'
            component={NuevaOrden}
            options={{
              title: "Nueva Orden",
              headerShown: false
            }}
          />

          <Stack.Screen
            name='Menu'
            component={Menu}
            options={{
              title: "Menu"
            }}
          />

          <Stack.Screen
            name='DetallePlatillo'
            component={DetallePlatillo}
            options={{
              title: "Detalle Platillo"
            }}
          />

          <Stack.Screen
            name='FormularioPlatillo'
            component={FormularioPlatillo}
            options={{
              title: "Ordenar Platillo"
            }}
          />

          <Stack.Screen
            name='ResumenPedido'
            component={ResumenPedido}
            options={{
              title: "Resumen Pedido"
            }}
          />

          <Stack.Screen
            name='ProgresoPedido'
            component={ProgresoPedido}
            options={{
              title: "Progreso de Pedido"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PedidoState>
      </FirebaseState>
    </>
  );
}

export default App;
