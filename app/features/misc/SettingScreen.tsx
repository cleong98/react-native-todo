import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '@app/components/AppBar';
import { ChevronRight } from '@app/components/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingStackParamList } from '@app/navigation/navigation';
import useThemedStyles from '@app/hooks/useThemedStyles';

type SettingScreenNavigationProps = NativeStackNavigationProp<
  SettingStackParamList,
  'General'
>;

const SettingScreen = () => {
  const navigation = useNavigation<SettingScreenNavigationProps>();

  const styles = useThemedStyles(theme =>
    StyleSheet.create({
      container: {
        flex: 1,
      },
      sectionContainer: {
        backgroundColor: theme.background,
        padding: 30,
        flex: 1,
        gap: 5,
      },
      sectionTitle: {
        color: theme.textColor,
        fontSize: 16,
        fontWeight: '400',
      },
      section: {
        backgroundColor: theme.card,
        borderRadius: 10,
        gap: 5,
      },
      sectionItem: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
      },
      sectionItemIcon: {
        color: theme.iconColor,
      },
      sectionItemLabel: {
        color: theme.textColor,
        flex: 1,
      },
      sectionItemPressed: {
        backgroundColor: theme.lightPrimary,
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
    }),
  );

  const handleThemeNavigate = useCallback(() => {
    navigation.navigate('Theme');
  }, []);

  const items = useMemo(
    () => [
      {
        title: 'Theme',
        icon: <ChevronRight style={styles.sectionItemIcon} />,
        onPress: handleThemeNavigate,
      },
    ],
    [handleThemeNavigate, styles],
  );
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
                key={title}
                style={({ pressed }) => [
                  styles.sectionItem,
                  pressed && styles.sectionItemPressed,
                  isSingle && styles.sectionItemRadius,
                  isFirst && styles.SectionItemtopRadius,
                  isLast && styles.SectionItembottomRadius,
                ]}
                onPress={onPress}
              >
                <Text style={styles.sectionItemLabel}>{title}</Text>
                {icon}
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
