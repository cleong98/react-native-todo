import useThemedStyles from '@app/hooks/useThemedStyles';
import { Text, TouchableOpacity } from 'react-native';

interface ChipProps<T> {
  value: T;
  selected?: boolean;
  onPress?: (value: T) => void;
}

const Chip = <T extends string>({
  selected = false,
  value,
  onPress,
}: ChipProps<T>) => {
  const styles = useThemedStyles(
    theme => ({
      container: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        backgroundColor: selected ? theme.lightPrimary : theme.border,
        borderRadius: 50,
      },
      chipText: {
        fontSize: 16,
        fontWeight: '500',
        color: selected ? theme.primary : theme.textColor,
      },
    }),
    [selected],
  );
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress?.(value)}>
      <Text style={styles.chipText}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Chip;
