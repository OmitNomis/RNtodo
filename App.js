import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

function App() {
  const [todoList, setTodoList] = useState([
    'Learn React Native',
    'Learn TypeScript',
    'Learn React Native',
  ]);

  const addTodo = newTodo => {
    console.log(newTodo);
    if (newTodo === '') return;
    if (todoList.includes(newTodo)) {
      Alert.alert('Todo already exists');
      return;
    }
    setTodoList([...todoList, newTodo]);
  };
  const deleteTodo = index => {
    Alert.alert(
      'Do you want to delete this todo?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const newTodoList = todoList.filter((_, i) => i !== index);
            setTodoList(newTodoList);
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.heading}>
        <Text style={styles.headingText}>Today's Task</Text>
      </View>
      <ScrollView style={styles.todoList}>
        {todoList.map((todo, index) => {
          return (
            <Todo
              deleteTodo={deleteTodo}
              key={index}
              todo={todo}
              index={index}
            />
          );
        })}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AddTodo addTodo={addTodo} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  heading: {
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  todoList: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#1A1A1A',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 20,
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.5,
    borderRadius: 5,
    marginRight: 15,
  },
  todoText: {},
  todoTextChecked: {
    textDecorationLine: 'line-through',
    color: '#A5A5A5',
  },
  checkbox: {},
  addTodo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 60,
    width: '80%',
  },
  button: {
    backgroundColor: '#55BCF6',
    padding: 15,
    borderRadius: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

const Todo = ({todo, index, deleteTodo}) => {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={() => {
        deleteTodo(index);
      }}
      style={styles.todo}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.square} />
        <Text
          style={checked === false ? styles.todoText : styles.todoTextChecked}>
          {todo}
        </Text>
      </View>
      {/* checkbox */}
      <CheckBox
        style={styles.checkbox}
        value={checked}
        onValueChange={setChecked}
      />
    </TouchableOpacity>
  );
};

const AddTodo = ({addTodo}) => {
  const [input, setInput] = useState('');
  return (
    <View style={styles.addTodo}>
      <TextInput style={styles.input} onChangeText={setInput} value={input} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addTodo(input);
          setInput('');
        }}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
