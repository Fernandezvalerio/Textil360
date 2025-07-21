import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const estadosPedido = [
  'Seguimiento', // Morado
  'Agendado', // Amarillo
  'Corte',
  'Diseño',
  'Planchado',
  'Confección',
  'Empaquetado',
  'Entrega', // Verde
  'Finalizado', // Azul
];

const coloresEstado = {
  Seguimiento: '#800080',
  Agendado: '#FFD700',
  Corte: '#DAA520',
  Diseño: '#BDB76B',
  Planchado: '#9ACD32',
  Confección: '#6B8E23',
  Empaquetado: '#32CD32',
  Entrega: '#228B22',
  Finalizado: '#007BFF',
};

const mapaImagenes: Record<string, any> = {
  'polo.jpg': require('@/assets/images/polo.jpg'),
  'casaca.jpg': require('@/assets/images/casaca.jpg'),
  'camiseta.jpg': require('@/assets/images/camiseta.jpg'),
};

export default function SeguimientoPedido() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const data = await AsyncStorage.getItem('fichas');
      if (data) {
        setPedidos(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error cargando pedidos:', error);
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    const actualizados = pedidos.map((p) =>
      p.id === id ? { ...p, estado: nuevoEstado } : p
    );
    setPedidos(actualizados);
    await AsyncStorage.setItem('fichas', JSON.stringify(actualizados));
  };

  const calcularProgreso = (estado) => {
    const index = estadosPedido.indexOf(estado);
    return Math.max(0, (index - 1) / (estadosPedido.length - 3));
  };

  const renderItem = ({ item }) => {
    const estadoActual = item.estado || 'Seguimiento';
    const progreso = calcularProgreso(estadoActual);
    const colorBarra = coloresEstado[estadoActual];
    const imagen = mapaImagenes[item.imagen] || mapaImagenes['polo.jpg'];

    return (
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Image
            source={imagen}
            style={styles.image}
          />
          <View style={styles.infoText}>
            <Text style={styles.title}>{item.subTipo}</Text>
            <Text style={styles.text}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.text}>Estado: {estadoActual}</Text>

            <View style={styles.progressBackground}>
              <View
                style={[styles.progressBar, {
                  width: `${progreso * 100}%`,
                  backgroundColor: colorBarra,
                }]}
              />
            </View>

            <Picker
              selectedValue={estadoActual}
              onValueChange={(value) => actualizarEstado(item.id, value)}
              style={styles.picker}
            >
              {estadosPedido.map((estado) => (
                <Picker.Item label={estado} value={estado} key={estado} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📦 Seguimiento de Pedidos</Text>
      {pedidos.length === 0 ? (
        <Text style={styles.empty}>No hay pedidos registrados.</Text>
      ) : (
        <FlatList
          data={pedidos}
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 16,
    padding: 10,
    elevation: 2,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  picker: {
    marginTop: 10,
  },
  progressBackground: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 40,
  },
});
