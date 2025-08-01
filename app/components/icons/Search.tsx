import Icon from '@react-native-vector-icons/fontawesome6';
import { FC } from 'react';
import { IconProps } from './type';
type Props = IconProps;
const Search: FC<Props> = ({ size, color, style }) => {
  return (
    <Icon
      name="magnifying-glass"
      iconStyle="solid"
      size={size}
      color={color}
      style={style}
    />
  );
};

export default Search;
