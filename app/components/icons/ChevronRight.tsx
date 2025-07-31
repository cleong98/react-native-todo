import Icon from '@react-native-vector-icons/fontawesome6';
import { FC } from 'react';
type Props = IconProps
const ChevronRight: FC<Props> = ({size, color}) => {
  return (
    <Icon name="chevron-right" iconStyle="solid" size={size} color={color} />
  )
}

export default ChevronRight