import Icon from '@react-native-vector-icons/fontawesome6';
import { FC } from 'react';
type Props = IconProps
const Cancel: FC<Props> = ({size, color}) => {
  return (
    <Icon name="xmark" iconStyle="solid" size={size} color={color} />
  )
}

export default Cancel