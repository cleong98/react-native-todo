import { View, TextInput, Pressable } from 'react-native';
import { FC } from 'react';
import useThemedStyles from '@app/hooks/useThemedStyles';
import { Search } from './icons';

interface SearchBarProps {
  value: string;
  onChangeText?: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChangeText }) => {
  const styles = useThemedStyles(theme => ({
    container: {
      marginHorizontal: 20,
      height: 50,
      borderRadius: 10,
      padding: 10,
      backgroundColor: theme.card,
      flexDirection: 'row',
      alignItems: 'center',
    },
    search: {
      flex: 1,
      color: theme.textColor,
    },
    iconButton: {
      color: theme.textColor,
      fontSize: 16,
      width: 20,
      marginRight: 10,
    },
  }));

  return (
    <View style={styles.container}>
      <Pressable>
        <Search style={styles.iconButton} />
      </Pressable>
      <TextInput
        style={styles.search}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search your Todo Title or Description"
      />
    </View>
  );
};

export default SearchBar;
