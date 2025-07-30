import { FC, ReactNode } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
interface IconButtonProps {
  icon: ReactNode;
  backgroundColor: string;
  disabled?: boolean;
  onPress: () => void;
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  backgroundColor,
  disabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
    disabled={disabled}
      style={[styles.button, { backgroundColor }, disabled && styles.disabled,]}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default IconButton;