import * as React from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { fetchTasks } from '../../actions';
import Loader from '../../components/Loader';

interface TaskProps {
  dispatch;
  tasks;
}

export class Task extends React.PureComponent<TaskProps, {}> {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchTasks());
  }

  @autobind
  handleClick(event) {
    event.preventDefault();
    console.log('clicked');
  }

  render() {
    const { tasks } = this.props;
    const output = {
      html: null,
      loader: (<Loader />)
    };

    if (tasks.isReady) {
      output.html = (
        <div className="app-private-tasks">
          {
            tasks.items.map((task) => {
              return (
                <div className="task" key={task.id} onClick={this.handleClick}>{task.title}</div>
              );
            })
          }
        </div>
      );
      output.loader = null;
    }

    return (
      <div key="Private" className="app-private">
        <div className="app-container">
          <h2>TASKS</h2>
          {output.loader}
          {output.html}
        </div>
      </div>
    );
  }
}

function mapStateToState(state) {
  return {
    tasks: state.tasks
  };
}

export default connect(mapStateToState)(Task);
