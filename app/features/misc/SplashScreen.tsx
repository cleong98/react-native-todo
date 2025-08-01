import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import useThemedStyles from '@app/hooks/useThemedStyles'
import { images } from '@app/assets/constant'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '@app/navigation/navigation'

type SplashScreenNavigationProps = NativeStackNavigationProp<StackParamList, 'Splash'>;

const SplashScreen = () => {

  const navigate = useNavigation<SplashScreenNavigationProps>();

    const styles = useThemedStyles(theme => ({
        container: {
            backgroundColor: theme.background,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
        },
        splashTitle: {
          color: theme.textColor,
          fontSize: 24,
          fontWeight: 'bold'
        }
    }))

    useEffect(() => {
      const timeout = setTimeout(() => {
        navigate.replace("Main");
      }, 2000);

      return () => {
        clearTimeout(timeout);
      }
    }, []);

  return (
    <View style={styles.container}>
      <Image source={images.Logo} style={{width: 150, height: 150}} />
      <Text style={styles.splashTitle}>My Todo</Text>
    </View>
  )
}

export default SplashScreen