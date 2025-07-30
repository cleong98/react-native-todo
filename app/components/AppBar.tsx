import React, { FC, isValidElement, ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation, useNavigationState } from '@react-navigation/native';

interface AppBarProps {
  title: string | ReactNode;
  action?: ReactNode;
  trailing?: ReactNode;
  hideBackButton?: boolean;
}

const AppBar: FC<AppBarProps> = ({
  title,
  action,
  trailing,
  hideBackButton = false,
}) => {
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();
  const isShowBackIcon = !hideBackButton && canGoBack;

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {isShowBackIcon ? (
        <View style={{ paddingLeft: 20 }}>
          <TouchableOpacity onPress={onBack}>
            <Icon size={18} name="arrow-left" iconStyle="solid" />
          </TouchableOpacity>
        </View>
      ) : (
        trailing ?? <View style={{ width: 40 }} />
      )}
      <View style={{ flex: 1, alignItems: 'center' }}>
        {isValidElement(title) ? (
          title
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
      {action}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#00000033',
      },
      default: {
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3.84,
        shadowOpacity: 0.25,
      },
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AppBar;
