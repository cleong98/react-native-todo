import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '@app/components/AppBar';
import { Cancel } from '@app/components/icons';

const ThemeScreen = () => {
  return (
    <SafeAreaView>
      <AppBar title="" trailingIcon={<Cancel size={18} />} />
      <Text>ThemeScreen</Text>
    </SafeAreaView>
  );
};

export default ThemeScreen;
