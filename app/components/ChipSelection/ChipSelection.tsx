import { View } from 'react-native';
import React, { ReactNode } from 'react';
import useThemedStyles from '@app/hooks/useThemedStyles';

interface ChipSelectionProps<T> {
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
}

const ChipSelection = <T,>({ items, renderItem }: ChipSelectionProps<T>) => {
  const styles = useThemedStyles(theme => ({
    container: {
      marginHorizontal: 10,
      borderRadius: 10,
      // backgroundColor: theme.card,
      flexDirection: 'row',
      padding: 5,
      gap: 10,
      // height: 50,
    },
  }));
  return <View style={styles.container}>{items.map(renderItem)}</View>;
};

export default ChipSelection;
