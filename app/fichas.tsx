import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function FichasScreen() {
  const [fichas, setFichas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    cargarFichas();
  }, []);

  const cargarFichas = async () => {
    try {
      const data = await AsyncStorage.getItem('fichas');
      if (data) {
        setFichas(JSON.parse(data).reverse()); // mostrar las más recientes primero
      }
    } catch (error) {
      console.error('Error cargando fichas:', error);
    }
  };

  const verFicha = (ficha: any) => {
    router.push({
      pathname: '/TechSheet',
      params: { pedido: JSON.stringify(ficha) },
    });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => verFicha(item)}>
      <Image
        source={imageMap[item.imagen] || imageMap['polo.jpg']}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.subTipo}</Text>
        <Text style={styles.text}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.text}>Fecha: {item.fecha}</Text>
      </View>
    </TouchableOpacity>
  );

  const imageMap: Record<string, any> = {
    'polo.jpg': require('@/assets/images/polo.jpg'),
    'casaca.jpg': require('@/assets/images/casaca.jpg'),
    'camiseta.jpg': require('@/assets/images/camiseta.jpg'),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📁 Fichas Técnicas Guardadas</Text>
      {fichas.length === 0 ? (
        <Text style={styles.empty}>Aún no hay fichas generadas.</Text>
      ) : (
        <FlatList
          data={fichas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 10,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#444',
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
});
