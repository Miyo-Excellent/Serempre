import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasks: {
    width: '100%',
    backgroundColor: 'hsla(0, 0%, 90%, 1)',
    flex: 1,
    zIndex: 5,
  },
  wrapper: {
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 5,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    position: 'relative',
  },

  task: {
    width: width - 20,
    backgroundColor: 'hsla(0, 0%, 95%, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 10,
  },

  taskEdit: {
    position: 'absolute',
    top: -5,
    right: -9,
    width: 25,
    height: 25,
    borderRadius: 25,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(32, 88%, 57%, 1)',
    elevation: 5,
  },
  taskEditText: {
    fontSize: 15,
    color: 'hsla(0, 0%, 95%, 1)',
  },

  dropTask: {
    position: 'absolute',
    top: 23,
    right: -9,
    width: 25,
    height: 25,
    borderRadius: 25,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 80%, 50%, 1)',
    elevation: 5,
  },
  dropTaskText: {
    fontSize: 15,
    color: 'hsla(0, 0%, 95%, 1)',
  },

  taskHeader: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: 'hsla(192, 100%, 11%, 1)',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  taskHeaderTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
    width: '100%',
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  taskHeaderMeta: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  taskEstimatedTime: {
    fontSize: 14,
    color: 'white',
  },
  taskTimeWorked: {
    fontSize: 14,
    color: 'white',
  },

  taskBody: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  taskDescription: {
    width: '100%',
  },

  floatButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(192, 100%, 31%, 1)',
    zIndex: 10,
  },
  floatButtonIcon: {
    color: 'hsla(0, 0%, 100%, 1)',
    fontSize: 25,
  },

  addTaskModal: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 0%, 0.4)',
  },

  addTaskModalWrapper: {
    height: 375,
    width: parseInt(width - 20),
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 100%, 1)',
    padding: 10,
    elevation: 10,
    borderRadius: 5,
  },

  addTaskModalScroll: {
    flex: 1,
    width: '100%',
  },

  addTaskModalScrollFrom: {
    flex: 1,
    width: '100%',
  },

  addTaskModalButtonGroup: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
  },
  addTaskModalButton: {},

  addTaskModalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  addTaskModalInput: {
    marginBottom: 10,
    height: 50,
    width: '100%',
  },
  addTaskModalInputName: {},

  editTaskModal: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 0%, 0.4)',
  },

  editTaskModalWrapper: {
    height: 255,
    width: parseInt(width - 20),
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 100%, 1)',
    padding: 10,
    elevation: 10,
    borderRadius: 5,
  },

  editTaskModalScroll: {
    flex: 1,
    width: '100%',
  },

  editTaskModalScrollFrom: {
    flex: 1,
    width: '100%',
  },

  editTaskModalButtonGroup: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
  },
  editTaskModalButton: {},

  editTaskModalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editTaskModalSubTitle: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
  },
  editTaskModalSubTitleMarginButton: marginBottom => ({marginBottom}),

  editTaskModalInput: {
    marginBottom: 10,
    height: 50,
    width: '100%',
  },
  editTaskModalInputName: {},
});
