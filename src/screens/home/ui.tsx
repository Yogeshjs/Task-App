/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {
  addTask,
  filterView,
  toggleTask,
  deleteTask,
} from '../../store/tasks/taskSlice';
import * as yup from 'yup';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Card} from './components/card';

type FilterType = 'All' | 'Complete' | 'InComplete';

function Tasks(): React.JSX.Element {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [appliedFilter, setAppliedFilter] = React.useState('All');

  const dispatch = useAppDispatch();
  const totalTask = useAppSelector(state => state.task.tasks.length);
  const tasks = useAppSelector(state => state.task.filterView);
  const outOfTask = useAppSelector(state => state.task.filterView.length);

  React.useEffect(() => {
    dispatch(filterView({type: 'All'}));
  }, [dispatch]);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
  };

  const handleDatePickerOpen = () => {
    setShowDatePicker(true);
  };

  const handleDateSelection = (newDate: Date) => {
    setDate(newDate);
    setShowDatePicker(false);
  };

  const initialValues = {
    title: '',
    description: '',
    dueDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    completed: false,
  };

  // validations
  const addTaskValidation = yup.object({
    title: yup.string().required(),
  });

  const handleAddTask = (task: typeof initialValues) => {
    console.log('task ::', task);
    dispatch(addTask(task));
    handleModalClose();
    Toast.show({
      type: 'success',
      text1: 'Task Created',
      text2: 'Try finishing Task soon, Happy tasking 👋',
    });
  };

  const handleFilterSelection = (filterType: FilterType) => {
    dispatch(filterView({type: filterType}));
    setAppliedFilter(filterType);
  };

  const handleToggleTask = (id: number) => {
    dispatch(toggleTask({id}));
    dispatch(filterView({type: appliedFilter}));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask({id}));
    dispatch(filterView({type: appliedFilter}));
  };

  const highliteAllFilter =
    appliedFilter === 'All'
      ? {backgroundColor: '#106EE9', color: '#fff'}
      : null;
  const highliteCompleteFilter =
    appliedFilter === 'Complete'
      ? {backgroundColor: 'green', color: '#fff'}
      : null;
  const highlitInCompleteFilter =
    appliedFilter === 'InComplete'
      ? {backgroundColor: 'red', color: '#fff'}
      : null;

  const getFilterBasedColor = (filterType: string) => {
    switch (filterType) {
      case 'All':
        return '#106EE9';
      case 'Complete':
        return 'green';
      case 'InComplete':
        return 'red';
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        onRequestClose={handleModalClose}
        visible={showModal}>
        <View style={styles.addTaskScreen}>
          <Formik
            validationSchema={addTaskValidation}
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
              handleAddTask(values);
              resetForm();
              dispatch(filterView({type: appliedFilter}));
            }}>
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.labelWithInput}>
                  <Text>Title</Text>
                  <TextInput
                    style={[
                      styles.inputBox,
                      {
                        borderColor:
                          errors.title && touched.title ? 'red' : 'black',
                      },
                    ]}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                  />
                </View>
                <View style={styles.labelWithInput}>
                  <Text>Description</Text>
                  <TextInput
                    style={styles.inputBox}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                  />
                </View>
                <View style={styles.labelWithInput}>
                  <Text>Due Date</Text>
                  <TextInput
                    value={`${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`}
                    style={styles.inputBox}
                    onFocus={handleDatePickerOpen}
                  />
                  <DatePicker
                    modal
                    mode="date"
                    date={date}
                    open={showDatePicker}
                    onCancel={handleDatePickerClose}
                    onConfirm={handleDateSelection}
                  />
                </View>
                <View style={styles.addToListBtn}>
                  <Button title="Add to List" onPress={() => handleSubmit()} />
                </View>
              </>
            )}
          </Formik>
        </View>
      </Modal>
      <View style={styles.filterSection}>
        <Pressable
          style={styles.filterBtn}
          onPress={() => handleFilterSelection('All')}>
          <Text style={[styles.filterText, highliteAllFilter]}>All</Text>
        </Pressable>
        <Pressable
          style={styles.filterBtn}
          onPress={() => handleFilterSelection('InComplete')}>
          <Text style={[styles.filterText, highlitInCompleteFilter]}>Todo</Text>
        </Pressable>
        <Pressable
          style={styles.filterBtn}
          onPress={() => handleFilterSelection('Complete')}>
          <Text style={[styles.filterText, highliteCompleteFilter]}>Done</Text>
        </Pressable>
      </View>
      <View style={styles.countSection}>
        <Text>Total Tasks: </Text>
        <Text>{totalTask} / </Text>
        <Text
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: getFilterBasedColor(appliedFilter),
            textAlign: 'center',
            color: '#fff',
          }}>
          {outOfTask}
        </Text>
      </View>
      <View style={styles.listSection}>
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <Card
              id={item.id}
              title={item.title}
              description={item.description}
              completed={item.completed}
              date={item.dueDate}
              handleToggle={handleToggleTask}
              onDeletePress={handleDelete.bind(null, item.id)}
            />
          )}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={
            <View style={styles.noTaskComponent}>
              <Text>Add task</Text>
            </View>
          }
        />
      </View>
      <Pressable onPress={handleModalOpen} style={styles.addButton}>
        <FontAwesome6
          style={{fontSize: 30, color: '#fff'}}
          solid
          name={'plus'}
        />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 15,
    paddingTop: 25,
    position: 'relative',
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  listSection: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    right: 20,
    bottom: 25,
    backgroundColor: '#106EE9',
  },
  addTaskScreen: {
    paddingLeft: 25,
    paddingTop: 25,
    flex: 1,
  },
  inputBox: {
    height: 50,
    marginTop: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  labelWithInput: {
    width: '90%',
    marginTop: 30,
  },
  addToListBtn: {
    marginTop: 50,
    width: '90%',
  },
  countSection: {
    flexDirection: 'row',
  },
  noTaskComponent: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  filterBtn: {
    width: 100,
    shadowRadius: 4,
    borderRadius: 14,
  },
  filterText: {
    padding: 5,
    textAlign: 'center',
    borderRadius: 14,
  },
});

export {Tasks};
