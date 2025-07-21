/*
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function FichaTecnicaScreen() {
  const route = useRoute();
  const { pedido } = route.params || {};

  if (!pedido) {
    return (
      <View style={styles.centered}>
        <Text>No hay datos de pedido disponibles.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={require('@/assets/images/img01.jpg')} style={styles.headerImage} />

      <Text style={styles.title}>Ficha Técnica del Pedido</Text>

      <View style={styles.infoBox}>
        <Text>👕 Tipo de Prenda: {pedido.tipoPrenda}</Text>
        <Text>📌 Subtipo: {pedido.subTipo}</Text>
        <Text>📋 Descripción: {pedido.descripcion}</Text>
        <Text>📏 Talla: {pedido.talla}</Text>
        <Text>🧵 Material: {pedido.material}</Text>
        <Text>🔢 Cantidad: {pedido.cantidad}</Text>
        <Text>👷 Operarios: {pedido.operarios}</Text>
        <Text>📦 Material estimado: {pedido.tabla.metros} m</Text>
        <Text>💰 Costo estimado: S/. {pedido.tabla.costo}</Text>
        <Text>⏱️ Tiempo estimado: {pedido.tabla.tiempo} días</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => alert('Agendado correctamente')}>
        <Text style={styles.buttonText}>📆 Agendar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImage: { width: '100%', height: 220, resizeMode: 'cover' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  infoBox: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#1e90ff',
    margin: 16,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
*/
