import Icon from '@react-native-vector-icons/fontawesome6';
import { FC } from 'react';
import { IconProps } from './type';
type Props = IconProps
const ChevronRight: FC<Props> = ({size, color, style}) => {
  return (
    <Icon name="chevron-right" iconStyle="solid" size={size} style={style} color={color} />
  )
}

export default ChevronRight