import React from 'react';
import { NativeBaseProvider, Center, Button, Text, extendTheme, Container } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const customTheme = extendTheme({
    colors: {
        customYellow: {
            600: '#ca8a04', // RGB(202, 138, 4) convertido a hexadecimal
        },
    },
});

const NuevaOrden = () => {

    const navigation = useNavigation();

    return (
        <NativeBaseProvider theme={customTheme}>
            <Container
                marginTop={8}
                marginX="auto" // Esto centrará el Container horizontalmente
                flexDirection="column" // Esto asegura que los componentes se apilen verticalmente
                alignItems="center" // Esto alinea los componentes horizontalmente dentro del Container
            >
                <Text fontSize="6xl" fontWeight="black" marginBottom={-5}>Mirage</Text>
                <Text fontSize="6xl" fontWeight="black" color="#ca8a04">App</Text>
            </Container>

            <Center flex={1}>
                <Button width="90%" alignItems="center" colorScheme="customYellow" onPress={() => navigation.navigate("Menu")}>
                    <Text fontWeight="black" fontSize="md" color="white" letterSpacing={1}>
                        Crear Nueva Orden
                    </Text>
                </Button>
            </Center>
        </NativeBaseProvider>
    );
}

export default NuevaOrden;
