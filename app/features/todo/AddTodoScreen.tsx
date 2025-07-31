import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '@app/components/AppBar';
import { useOrientation } from '@app/hooks/useOrientation';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '@app/hooks/storeHook';
import { addTodo } from './todoSlice';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';

type AddTodoFormData = {
  title: string;
  description: string;
};

const AddTodoScreen = () => {
  const orientation = useOrientation();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTodoFormData>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: AddTodoFormData) => {
    console.log(data);
    dispatch(addTodo(data));
    navigation.goBack();
  };

  const keyboardVerticalOffset = useMemo(() => {
    return orientation === 'LANDSCAPE' ? 0 : 80;
  }, [orientation]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <AppBar title="Add Todo" />
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
              {errors.title && (
                <Text style={styles.formTextInputError}>
                  {errors.title.message}
                </Text>
              )}
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
              {errors.description && (
                <Text style={styles.formTextInputError}>
                  {errors.description.message}
                </Text>
              )}
            </View>
            <View style={styles.expanded} />
            {orientation === 'LANDSCAPE' && (
              <View style={styles.submitButtonContainer}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit(onSubmit)}
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
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitButtonText}>Add Todo</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: { gap: 15, flex: 1 },
  formTextInputTitle: { fontWeight: '500', fontSize: 16 },
  formTextInput: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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
    backgroundColor: '#6874E8',
    borderRadius: 5,
  },
  submitButtonText: {
    textAlign: 'center',
    padding: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AddTodoScreen;
