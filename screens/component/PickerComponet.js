// PickerComponent.js
import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerComponent = ({ livrosRazao, selectedLivro, onValueChange }) => {
  return (
    <View>
      <Text>Selecione um Livro Razão:</Text>
      <Picker
        selectedValue={selectedLivro}
        onValueChange={(itemValue) => onValueChange(itemValue)}
      >
        {livrosRazao.map((livro) => (
          <Picker.Item key={livro.id} label={livro.nome} value={livro.id} />
        ))}
      </Picker>
    </View>
  );
};

export default PickerComponent;
