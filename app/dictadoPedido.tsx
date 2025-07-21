import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

export default function PantallaDictadoPedido() {
  const [tipoPrenda, setTipoPrenda] = useState  ('');
  const [subTipo, setSubTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [talla, setTalla] = useState('');
  const [material, setMaterial] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [operarios, setOperarios] = useState('');

  const subTipos = {
    Polos: ['Polo publicitario', 'Polo Empresa', 'Polo Personalizado'],
    Camiseta: ['Camiseta deportiva', 'Camiseta de Basquet', 'Camiseta Replica'],
    Casaca: ['Casaca Acolchada', 'Casaca colegio', 'Casaca promocional'],
  };

  const generarFicha = async () => {
    const metros = (Math.random() * (10 - 5) + 5).toFixed(1);
    const costo = Math.floor(Math.random() * (150 - 100 + 1)) + 100;
    const tiempo = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

    const imagen = tipoPrenda.toLowerCase() + '.jpg';

    const pedido = {
      id: Date.now(),
      tipoPrenda,
      subTipo,
      descripcion,
      talla,
      material,
      cantidad,
      operarios,
      tabla: { metros, costo, tiempo },
      imagen,
      fecha: new Date().toLocaleDateString(),
    };

    try {
      const almacenadas = await AsyncStorage.getItem('fichas');
      const fichas = almacenadas ? JSON.parse(almacenadas) : [];
      fichas.push(pedido);
      await AsyncStorage.setItem('fichas', JSON.stringify(fichas));
      router.push({ pathname: '/fichaTecnica', params: { pedido: JSON.stringify(pedido) } });
    } catch (error) {
      console.error('❌ Error guardando ficha técnica:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={estilos.scroll}>
        <Text style={estilos.titulo}>Dictado de Pedido</Text>

        <Text style={estilos.etiqueta}>Tipo de Prenda</Text>
        <Picker selectedValue={tipoPrenda} onValueChange={(val) => { setTipoPrenda(val); setSubTipo(''); }}>
          <Picker.Item label="Seleccione" value="" />
          <Picker.Item label="Polos" value="Polos" />
          <Picker.Item label="Camiseta" value="Camiseta" />
          <Picker.Item label="Casaca" value="Casaca" />
        </Picker>

        {tipoPrenda !== '' && (
          <>
            <Text style={estilos.etiqueta}>Tipo de {tipoPrenda}</Text>
            <Picker selectedValue={subTipo} onValueChange={setSubTipo}>
              <Picker.Item label="Seleccione" value="" />
              {subTipos[tipoPrenda].map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </>
        )}

        <Text style={estilos.etiqueta}>Descripción</Text>
        <TextInput style={estilos.input} value={descripcion} onChangeText={setDescripcion} placeholder="Ej: Corte dama, manga larga" />

        <Text style={estilos.etiqueta}>Talla</Text>
        <Picker selectedValue={talla} onValueChange={setTalla}>
          <Picker.Item label="Seleccione" value="" />
          <Picker.Item label="Niño" value="Niño" />
          <Picker.Item label="Medio" value="Medio" />
          <Picker.Item label="Adulto" value="Adulto" />
        </Picker>

        <Text style={estilos.etiqueta}>Material</Text>
        <Picker selectedValue={material} onValueChange={setMaterial}>
          <Picker.Item label="Seleccione" value="" />
          <Picker.Item label="Tela camiseta" value="Tela camiseta" />
          <Picker.Item label="Tela casaca" value="Tela casaca" />
          <Picker.Item label="Tela polo" value="Tela polo" />
        </Picker>

        <Text style={estilos.etiqueta}>Cantidad</Text>
        <TextInput style={estilos.input} value={cantidad} onChangeText={setCantidad} keyboardType="numeric" placeholder="Ej: 20" />

        <Text style={estilos.etiqueta}>Operarios</Text>
        <TextInput style={estilos.input} value={operarios} onChangeText={setOperarios} keyboardType="numeric" placeholder="Ej: 2" />

        <TouchableOpacity style={estilos.boton} onPress={generarFicha}>
          <Text style={estilos.textoBoton}>Correr Tabla</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  scroll: {
    padding: 16,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginTop: 4,
  },
  boton: {
    marginTop: 30, backgroundColor: '#1e90ff',
    padding: 14, borderRadius: 8, alignItems: 'center',
  },
  textoBoton: {
    color: '#fff', fontWeight: 'bold',
  },
});
