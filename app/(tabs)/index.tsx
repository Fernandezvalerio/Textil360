import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function PantallaInicio() {
  return (
    <ScrollView style={estilos.contenedor}>
      <Image source={require('@/assets/images/header-taller.jpg')} style={estilos.imagenEncabezado} />

      <Text style={estilos.titulo}>Gestión de Pedidos</Text>

      <View style={estilos.contenedorTarjetas}>
        <TouchableOpacity style={estilos.tarjeta} onPress={() => router.push('../dictadoPedido')}>
          <Image source={require('@/assets/images/mic-icon.png')} style={estilos.imagenTarjeta} />
          <Text style={estilos.textoTarjeta}>Dictado de Pedido</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.tarjeta} onPress={() => router.push('../fichas')}>
          <Image source={require('@/assets/images/ficha-icon.png')} style={estilos.imagenTarjeta} />
          <Text style={estilos.textoTarjeta}>Ficha Técnica</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.tarjeta} onPress={() => router.push('../calendarioProduccion')}>
          <Image source={require('@/assets/images/calendar-icon.png')} style={estilos.imagenTarjeta} />
          <Text style={estilos.textoTarjeta}>Calendario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.tarjeta} onPress={() => router.push('../seguimientoPedido')}>
          <Image source={require('@/assets/images/status-icon.png')} style={estilos.imagenTarjeta} />
          <Text style={estilos.textoTarjeta}>Seguimiento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.tarjeta} onPress={() => router.push('../editarPedido')}>
          <Image source={require('@/assets/images/edit-icon.png')} style={estilos.imagenTarjeta} />
          <Text style={estilos.textoTarjeta}>Editar Pedido</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagenEncabezado: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  contenedorTarjetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  tarjeta: {
    width: '42%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  imagenTarjeta: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  textoTarjeta: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});





