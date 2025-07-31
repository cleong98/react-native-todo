import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FC, ReactNode } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '@app/navigation/navigation';
import Icon from '@react-native-vector-icons/fontawesome6';

const CustomTabbar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const routeName = route.name as keyof BottomTabParamList;

        let icon: ReactNode;

        switch (routeName) {
          case 'Home': {
            icon = (
              <Icon
                name="house"
                iconStyle="solid"
                size={20}
                style={[isFocused && styles.activeIcon]}
              />
            );
            break;
          }

          case 'Setting': {
            icon = (
              <Icon
                name="gear"
                iconStyle="solid"
                size={20}
                style={[isFocused && styles.activeIcon]}
              />
            );
            break;
          }
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tab]}
          >
            {icon}
            <Text style={[styles.tabbarText, isFocused && styles.activeText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: { color: '#6874E8', fontSize: 24 },
  tabbarText: { fontSize: 14, fontWeight: '400' },
  activeText: { color: '#6874E8', fontSize: 16 },
});

export default CustomTabbar;
