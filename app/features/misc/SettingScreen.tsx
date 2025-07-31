import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '@app/components/AppBar';
import { ChevronRight } from '@app/components/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingStackParamList } from '@app/navigation/navigation';

type SettingScreenNavigationProps = NativeStackNavigationProp<
  SettingStackParamList,
  'General'
>;

const SettingScreen = () => {
  const navigation = useNavigation<SettingScreenNavigationProps>();
  const handleThemeNavigate = useCallback(() => {
    navigation.navigate('Theme');
  }, []);

  const items = useMemo(
    () => [
      {
        title: 'Theme',
        icon: <ChevronRight />,
        onPress: handleThemeNavigate,
      },
    ],
    [handleThemeNavigate],
  );
  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Setting" />
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Personalization</Text>
        <View style={styles.section}>
          {items.map(({ title, icon, onPress }, index) => {
            const isSingle = items.length === 1;
            const isFirst = index === 0;
            const isLast = index === items.length - 1;
            return (
              <Pressable
                style={({ pressed }) => [
                  styles.sectionItem,
                  pressed && { backgroundColor: '#B8C4F6' },
                  isSingle && styles.sectionItemRadius,
                  isFirst && styles.SectionItemtopRadius,
                  isLast && styles.SectionItembottomRadius,
                ]}
                onPress={onPress}
              >
                <Text style={{ flex: 1 }}>{title}</Text>
                {icon}
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    padding: 30,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    // padding: 10,
    gap: 5,
  },
  sectionItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  SectionItemtopRadius: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  SectionItembottomRadius: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  sectionItemRadius: {
    borderRadius: 10,
  },
});

export default SettingScreen;
