import Icon from '@react-native-vector-icons/fontawesome6';
import { FC } from 'react';
import { IconProps } from './type';
type Props = IconProps;
const Checked: FC<Props> = ({ size, color, style }) => {
  return (
    <Icon
      name="check"
      iconStyle="solid"
      size={size}
      color={color}
      style={style}
    />
  );
};

export default Checked;
