import React, { FC, isValidElement, ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';
import useThemedStyles from '@app/hooks/useThemedStyles';

interface AppBarProps {
  title: string | ReactNode;
  action?: ReactNode;
  trailing?: ReactNode;
  trailingIcon?: ReactNode;
  hideBackButton?: boolean;
}

const AppBar: FC<AppBarProps> = ({
  title,
  action,
  trailing,
  hideBackButton = false,
  trailingIcon,
}) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const styles = useThemedStyles(theme =>
    StyleSheet.create({
      container: {
        flexDirection: 'row',
        height: 56,
        backgroundColor: theme.card,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: theme.border,
        borderBottomWidth: 0.5,
      },
      title: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.textColor,
      },
      backIcon: {
        color: theme.textColor,
      },
    }),
  );

  const isShowBackIcon = !hideBackButton && canGoBack;

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {trailing ? (
        trailing
      ) : isShowBackIcon ? (
        <View style={{ paddingLeft: 20 }}>
          <TouchableOpacity onPress={onBack}>
            {trailingIcon ? (
              trailingIcon
            ) : (
              <Icon
                style={styles.backIcon}
                size={18}
                name="arrow-left"
                iconStyle="solid"
              />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ width: 40 }} />
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

export default AppBar;
