import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const imageMap: Record<string, any> = {
  'polo.jpg': require('@/assets/images/polo.jpg'),
  'casaca.jpg': require('@/assets/images/casaca.jpg'),
  'camiseta.jpg': require('@/assets/images/camiseta.jpg'),
};

export default function FichaTecnica() {
  const { pedido } = useLocalSearchParams();
  const parsedPedido = pedido ? JSON.parse(pedido) : null;

  if (!parsedPedido) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No se recibió ningún pedido</Text>
      </View>
    );
  }

  const {
    tipoPrenda,
    subTipo,
    descripcion,
    talla,
    material,
    cantidad,
    operarios,
    tabla,
    imagen,
  } = parsedPedido;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ficha Técnica Generada</Text>

      <Image
        source={imageMap[imagen] || imageMap['polo.jpg']}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.label}>Tipo de Prenda: <Text style={styles.value}>{tipoPrenda}</Text></Text>
      <Text style={styles.label}>Subtipo: <Text style={styles.value}>{subTipo}</Text></Text>
      <Text style={styles.label}>Descripción: <Text style={styles.value}>{descripcion}</Text></Text>
      <Text style={styles.label}>Talla: <Text style={styles.value}>{talla}</Text></Text>
      <Text style={styles.label}>Material: <Text style={styles.value}>{material}</Text></Text>
      <Text style={styles.label}>Cantidad: <Text style={styles.value}>{cantidad}</Text></Text>
      <Text style={styles.label}>Operarios: <Text style={styles.value}>{operarios}</Text></Text>

      <View style={styles.tableBox}>
        <Text style={styles.tableTitle}>📊 Estimación Automática</Text>
        <Text>📦 Metros estimados: {tabla.metros}</Text>
        <Text>💰 Costo estimado: S/. {tabla.costo}</Text>
        <Text>⏱️ Tiempo estimado: {tabla.tiempo} días</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>🏠 Volver al Menú Principal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
  },
  value: {
    fontWeight: 'normal',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  tableBox: {
    marginTop: 20,
    backgroundColor: '#eef',
    padding: 16,
    borderRadius: 10,
    width: '100%',
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

