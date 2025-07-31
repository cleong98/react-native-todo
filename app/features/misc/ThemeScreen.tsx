import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '@app/components/AppBar';
import { Cancel } from '@app/components/icons';
import useThemedStyles from '@app/hooks/useThemedStyles';
import { useTheme } from '@app/context/themeContext';
import { Checked } from '@app/components/icons';
import { capitalCase } from 'change-case';

const ThemeScreen = () => {
  const { supportedThemes, theme, setTheme } = useTheme();
  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
    },
    backIconColor: {
      color: theme.textColor,
    },
    title: {
      color: theme.textColor,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    contentContainer: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
    },
    themeItemContainer: {
      padding: 20,
      backgroundColor: theme.card,
      flexDirection: 'row',
    },
    themeItemText: {
      color: theme.textColor,
      flex: 1,
    },
    themeItemIcon: {
      color: theme.primary,
      fontSize: 18,
    },
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppBar
        title=""
        trailingIcon={<Cancel size={18} style={styles.backIconColor} />}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Please select your theme</Text>
        <View style={{ height: 50 }} />
        {supportedThemes.map(supportedTheme => (
          <Pressable
            style={styles.themeItemContainer}
            onPress={() => setTheme(supportedTheme as any)}
            key={supportedTheme}
          >
            <Text style={styles.themeItemText}>
              {' '}
              {capitalCase(supportedTheme)}
            </Text>
            {theme === supportedTheme ? (
              <Checked style={styles.themeItemIcon} />
            ) : (
              <View />
            )}
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ThemeScreen;
