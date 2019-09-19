//  Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Modal, ScrollView, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, Title, Subheading, TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

//  API
import API from '../../Api';

//  Actions
import {addTask, addTasks, changeIsOpenAddTaskModal, changeIsOpenEditTaskModal} from '../../actions';

//  Styles
import styles from './styles';

const mapStateToProps = state => ({
  tasks: state.tasks.data,
  taskConfig: state.tasks.taskConfig,
  editTaskConfig: state.tasks.editTaskConfig,
  isOpenAddTaskModal: state.tasks.modals.addTask,
  isOpenEditTaskModal: state.tasks.modals.editTask,
});

const mapDispatchToProps = dispatch => ({
  addNewTask(task) {
    addTask({dispatch, task});
  },
  addTasks(tasks) {
    addTasks({dispatch, tasks});
  },
  handleChangeIsOpenAddTaskModal(visible = false) {
    changeIsOpenAddTaskModal({dispatch, visible});
  },
  handleChangeIsOpenEditTaskModal(visible = false) {
    changeIsOpenEditTaskModal({dispatch, visible});
  },
});

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTask: {},
      form: {
        addTask: {},
        editTask: {},
      },
    };
  }

  async UNSAFE_componentWillMount() {
    let tasksNameStates = {};
    let editTasksNameStates = {};
    let tasks = await AsyncStorage.getItem('@tasks');

    if (tasks) {
      tasks = JSON.parse(tasks);
    } else {
      tasks = this.props.tasks;
    }

    await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));

    await this.props.addTasks(tasks);

    this.props.taskConfig.forEach(task => {
      tasksNameStates[task.nameState] = '';
    });

    this.props.editTaskConfig.forEach(task => {
      editTasksNameStates[task.nameState] = '';
    });

    this.setState(state => ({
      ...state,
      form: {
        ...state.form,
        addTask: tasksNameStates,
        editTask: editTasksNameStates,
      },
    }));
  }

  handleChangeIsOpenAddTaskModal = () =>
    this.props.handleChangeIsOpenAddTaskModal(!this.props.isOpenAddTaskModal);

  handleChangeIsOpenEditTaskModal = () =>
    this.props.handleChangeIsOpenEditTaskModal(!this.props.isOpenEditTaskModal);

  sumTimeWorkedTask = async time => {
    const {tasks} = this.props;
    const {currentTask} = this.state;

    const timeWorked = await API.add({intA: currentTask.timeWorked, intB: time});

    this.props.addTasks(tasks.map(task => ({...task, timeWorked})));
  };

  dropTask = async id => {
    const {tasks} = this.props;

    this.props.addTasks(tasks.filter(task => task.id !== id));
  };

  render() {
    const {
      tasks,
      taskConfig,
      editTaskConfig,
      isOpenAddTaskModal,
      isOpenEditTaskModal,
      handleChangeIsOpenAddTaskModal,
      addNewTask,
    } = this.props;

    const {form, currentTask} = this.state;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.floatButton}
          underlayColor="hsla(192, 100%, 21%, 1)"
          onPress={this.handleChangeIsOpenAddTaskModal}>
          <Icon name="plus" style={styles.floatButtonIcon}/>
        </TouchableHighlight>

        <ScrollView style={styles.tasks}>
          <View style={styles.wrapper}>
            {tasks.map((task, key) => (
              <View key={`board-${key + 1}`} style={styles.task}>
                <TouchableHighlight
                  style={styles.taskEdit}
                  underlayColor="hsla(32, 88%, 47%, 1)"
                  onPress={() => {
                    this.setState(state => ({
                      ...state,
                      currentTask: task,
                    }), this.handleChangeIsOpenEditTaskModal);
                  }}
                >
                  <Icon name="edit" style={styles.taskEditText}/>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.dropTask}
                  underlayColor="hsla(22, 88%, 47%, 1)"
                  onPress={async () => {
                    await this.dropTask(task.id);
                  }}
                >
                  <Icon name="trash" style={styles.dropTaskText}/>
                </TouchableHighlight>

                <View style={styles.taskHeader}>
                  <View style={styles.taskHeaderTitle}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                  </View>

                  <View style={styles.taskHeaderMeta}>
                    <Text style={styles.taskEstimatedTime}>
                      {`Tiempo estimado: ${task.estimatedTime}`}
                    </Text>

                    <Text style={styles.taskTimeWorked}>
                      {`Tiempo trabajado: ${task.timeWorked}`}
                    </Text>
                  </View>
                </View>

                <View style={styles.taskBody}>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent
          visible={isOpenAddTaskModal}
          onRequestCloses={() => console.log('HIDE MODAL: add new task')}
        >
          <View style={styles.addTaskModal}>
            <View style={styles.addTaskModalWrapper}>
              <Title style={styles.addTaskModalTitle}>Crear nueva tarea</Title>

              <ScrollView style={styles.addTaskModalScroll}>
                <View style={styles.addTaskModalScrollFrom}>
                  {taskConfig.map((task, key) => (
                    <TextInput
                      keyboardType={task.inputType}
                      label={task.label}
                      placeholder={`${task.placeholder}`}
                      key={`modal-form-add-new-task-input:${key + 1}`}
                      value={form.addTask[task.nameState]}
                      onChangeText={value => this.setState(state => ({
                        ...state,
                        form: {
                          ...state.form,
                          addTask: {
                            ...state.form.addTask,
                            [task.nameState]: value,
                          },
                        },
                      }))}
                      style={[styles.addTaskModalInput, styles.addTaskModalInputName]}
                    />
                  ))}
                </View>
              </ScrollView>

              <View style={styles.addTaskModalButtonGroup}>
                <Button
                  icon="close"
                  style={styles.addTaskModalButton}
                  color="hsla(10, 100%, 41%, 1)"
                  mode="contained"
                  onPress={this.handleChangeIsOpenAddTaskModal}
                >
                  Cancelar
                </Button>

                <Button
                  icon="add"
                  style={styles.addTaskModalButton}
                  color="hsla(192, 100%, 41%, 1)"
                  mode="contained"
                  onPress={() => {
                    const tasksValidation = [];

                    for (const key in form.addTask) {
                      if (form.addTask.hasOwnProperty(key)) {
                        const value = form.addTask[key];
                        tasksValidation.push({key, value});
                      }
                    }

                    let task = tasksValidation.reduce((acc, task) => {
                      acc[task.key] = task.value;

                      return acc;
                    }, {});
                    let isValid = tasksValidation.every(task => task.value);

                    task.id = tasks.length;

                    if (isValid) {
                      addNewTask(task);
                      this.handleChangeIsOpenAddTaskModal();
                    }
                  }}
                >
                  Añadir tarea
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent
          visible={isOpenEditTaskModal}
          onRequestCloses={() => console.log('HIDE MODAL: edit task')}
        >
          <View style={styles.editTaskModal}>
            <View style={styles.editTaskModalWrapper}>
              <Title style={styles.editTaskModalTitle}>{`Editar tarea ${currentTask.title}`}</Title>

              <Subheading
                style={[styles.editTaskModalSubTitle, styles.editTaskModalSubTitleMarginButton(5)]}>{`Tiempo estimado: ${currentTask.estimatedTime}`}</Subheading>
              <Subheading
                style={[styles.editTaskModalSubTitle, styles.editTaskModalSubTitleMarginButton(10)]}>{`Tiempo trabajado: ${currentTask.timeWorked}`}</Subheading>

              <ScrollView style={styles.editTaskModalScroll}>
                <View style={styles.editTaskModalScrollFrom}>
                  {editTaskConfig.map((task, key) => (
                    <TextInput
                      keyboardType={task.inputType}
                      label={task.label}
                      placeholder={`${currentTask[task.nameState]}`}
                      key={`modal-form-add-new-task-input:${key + 1}`}
                      value={form.editTask[task.nameState]}
                      onChangeText={value => this.setState(state => ({
                        ...state,
                        form: {
                          ...state.form,
                          editTask: {
                            ...state.form.editTask,
                            [task.nameState]: value,
                          },
                        },
                      }))}
                      style={[styles.addTaskModalInput, styles.addTaskModalInputName]}
                    />
                  ))}
                </View>
              </ScrollView>

              <View style={styles.editTaskModalButtonGroup}>
                <Button
                  icon="close"
                  style={styles.editTaskModalButton}
                  color="hsla(10, 100%, 41%, 1)"
                  mode="contained"
                  onPress={this.handleChangeIsOpenEditTaskModal}
                >
                  Cancelar
                </Button>

                <Button
                  icon="edit"
                  style={styles.editTaskModalButton}
                  color="hsla(135, 100%, 40%, 1)"
                  mode="contained"
                  onPress={() => {
                    const tasksValidation = [];

                    for (const key in form.editTask) {
                      if (form.editTask.hasOwnProperty(key)) {
                        const value = form.editTask[key];
                        tasksValidation.push({key, value});
                      }
                    }

                    let task = tasksValidation.reduce((acc, task) => {
                      acc[task.key] = task.value;

                      return acc;
                    }, {});

                    let isValid = tasksValidation.every(task => task.value);

                    if (isValid) {
                      this.sumTimeWorkedTask(task.timeWorked);
                      this.handleChangeIsOpenEditTaskModal();
                    }
                  }}
                >
                  Editar
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
