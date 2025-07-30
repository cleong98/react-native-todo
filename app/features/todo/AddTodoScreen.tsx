import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '@app/components/AppBar';
import Icon from '@react-native-vector-icons/fontawesome6';
import IconButton from './components/IconButton';
import { useNavigation } from '@react-navigation/native';

const AddTodoScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <AppBar
        title="Add Todo"
        action={
          <IconButton
            disabled={true}
            icon={
              <Icon size={16} name="trash" iconStyle="solid" color={'white'} />
            }
            onPress={() => {}}
            backgroundColor="#F44336"
          />
        }
      />
      <Text>AddTodoScreen</Text>
    </SafeAreaView>
  );
};

export default AddTodoScreen;
