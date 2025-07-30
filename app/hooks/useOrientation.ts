import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

type Orientation = 'PORTRAIT' | 'LANDSCAPE';

export const useOrientation = (): Orientation => {
  const getOrientation = (): Orientation => {
    const { width, height } = Dimensions.get('window');
    return width < height ? 'PORTRAIT' : 'LANDSCAPE';
  };

  const [orientation, setOrientation] = useState<Orientation>(getOrientation);

  useEffect(() => {
    const handleChange = () => {
      setOrientation(getOrientation());
    };

    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return orientation;
};
