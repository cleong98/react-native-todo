import React, { FC, isValidElement, ReactNode } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

interface AppBarProps {
  title: string | ReactNode;
  action?: ReactNode;
}

const AppBar: FC<AppBarProps> = ({title, action}) => {
  return (
    <View style={styles.container}>
      
       <View style={{flex: 1, alignItems: 'center'}}>
        {
           isValidElement(title) ? title : <Text style={styles.title}>{title}</Text>
        }
        </View>
      

      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android:{
         borderBottomWidth:0.5,
         borderBottomColor:'#00000033'      
      },
      default:{
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3.84,
        shadowOpacity: 0.25,
      }
    })

  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AppBar;