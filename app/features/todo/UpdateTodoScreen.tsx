import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '@app/components/AppBar';
import { HomeStackParamList } from '@app/navigation/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { selectTodoById, updateTodo } from './todoSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks/storeHook';
import { Controller, useForm } from 'react-hook-form';
import { useOrientation } from '@app/hooks/useOrientation';
import useThemedStyles from '@app/hooks/useThemedStyles';

type UpdateTodoScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'UpdateTodo'
>;

type UpdateTodoRouteProps = RouteProp<HomeStackParamList, 'UpdateTodo'>;

type UpdateTodoForm = {
  title: string;
  description: string;
};

const UpdateTodoScreen = () => {
  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.card,
    },
    keyboardContainer: {
      flex: 1,
    },
    scrollViewContainer: {
      flexGrow: 1,
      padding: 20,
    },
    formContainer: { gap: 15, flex: 1 },
    formTextInputTitle: {
      fontWeight: '500',
      fontSize: 16,
      color: theme.textColor,
    },
    formTextInput: {
      height: 50,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      backgroundColor: theme.background,
      color: theme.textColor,
    },
    formTextInputError: {
      color: 'red',
      fontSize: 16,
    },
    formGap: { gap: 5 },
    expanded: { flex: 1 },
    submitButtonContainer: {
      padding: 10,
    },
    submitButton: {
      backgroundColor: theme.primary,
      borderRadius: 5,
    },
    submitButtonText: {
      textAlign: 'center',
      padding: 15,
      fontWeight: 'bold',
      color: theme.buttonText,
    },

    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },

    notFoundTodoText: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    notFoundButton: {
      flexDirection: 'row',
      backgroundColor: theme.primary,
      borderRadius: 5,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notFoundButtonText: {
      color: theme.buttonText,
    },
  }));

  const navigation = useNavigation<UpdateTodoScreenNavigationProp>();

  const route = useRoute<UpdateTodoRouteProps>();

  const { id } = route.params;

  const todo = useAppSelector(state => selectTodoById(state, id));

  const { control, handleSubmit } = useForm<UpdateTodoForm>({
    defaultValues: todo,
  });

  const dispatch = useAppDispatch();

  const orientation = useOrientation();

  const onSubmit = (id: string, data: UpdateTodoForm) => {
    console.log(data);
    dispatch(
      updateTodo({
        id,
        ...data,
      }),
    );
    navigation.goBack();
  };

  const keyboardVerticalOffset = useMemo(() => {
    return orientation === 'LANDSCAPE' ? 0 : 80;
  }, [orientation]);

  const goBack = () => {
    navigation.goBack();
  };

  if (!todo) {
    return (
      <SafeAreaView style={styles.container}>
        <AppBar title="Update Todo" />
        <View style={styles.contentContainer}>
          <Text style={styles.notFoundTodoText}>Todo ID {id} Not Found</Text>
          <TouchableOpacity style={styles.notFoundButton} onPress={goBack}>
            <Text style={styles.notFoundButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <AppBar title="Update Todo" />
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <View style={styles.formGap}>
              <Text style={styles.formTextInputTitle}>Title</Text>
              <Controller
                control={control}
                name="title"
                defaultValue={''}
                rules={{ required: 'Title is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    style={styles.formTextInput}
                  />
                )}
              />
            </View>
            <View style={styles.formGap}>
              <Text style={styles.formTextInputTitle}>Description</Text>
              <Controller
                control={control}
                name="description"
                defaultValue={''}
                rules={{ required: 'Description is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    style={styles.formTextInput}
                  />
                )}
              />
            </View>
            <View style={styles.expanded} />
            {orientation === 'LANDSCAPE' && (
              <View style={styles.submitButtonContainer}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit(data => onSubmit(todo.id, data))}
                >
                  <Text style={styles.submitButtonText}>Add Todo</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        {orientation === 'PORTRAIT' && (
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(data => onSubmit(todo.id, data))}
            >
              <Text style={styles.submitButtonText}>Update Todo</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdateTodoScreen;
