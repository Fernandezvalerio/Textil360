import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function EditarPedido() {
  const [fichas, setFichas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    cargarFichas();
  }, []);

  const cargarFichas = async () => {
    try {
      const data = await AsyncStorage.getItem('fichas');
      if (data) {
        setFichas(JSON.parse(data).reverse());
      }
    } catch (error) {
      console.error('Error cargando fichas:', error);
    }
  };

  const verFicha = (ficha: any) => {
        router.push({
            pathname: '/dictadoPedido',
            params: { pedido: JSON.stringify(ficha) },
        });
   };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={estilos.tarjeta} onPress={() => verFicha(item)}>
      <Image
        source={mapaImagenes[item.imagen] || mapaImagenes['polo.jpg']}
        style={estilos.imagen}
      />
      <View style={estilos.info}>
        <Text style={estilos.titulo}>{item.subTipo}</Text>
        <Text style={estilos.texto}>Cantidad: {item.cantidad}</Text>
        <Text style={estilos.texto}>Fecha: {item.fecha}</Text>
      </View>
    </TouchableOpacity>
  );

  const mapaImagenes: Record<string, any> = {
    'polo.jpg': require('@/assets/images/polo.jpg'),
    'casaca.jpg': require('@/assets/images/casaca.jpg'),
    'camiseta.jpg': require('@/assets/images/camiseta.jpg'),
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.encabezado}>✏️ Editar Pedidos Guardados</Text>
      {fichas.length === 0 ? (
        <Text style={estilos.vacio}>No hay pedidos para editar.</Text>
      ) : (
        <FlatList
          data={fichas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={estilos.lista}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  encabezado: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  lista: {
    paddingBottom: 20,
  },
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    alignItems: 'center',
  },
  imagen: {
    width: 64,
    height: 64,
    marginRight: 10,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  texto: {
    color: '#444',
  },
  vacio: {
    marginTop: 40,
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
});
