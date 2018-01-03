import Fetch from '../utils/fetch';

const TaskService = {
  fetchTasks() {
    return Fetch.get('/api/tasks');
  }
};

export default TaskService;
