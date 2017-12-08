import * as React from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { login } from '../../actions';

import './style.less';

interface LoginProps {
  dispatch;
}

interface LoginState {
  username: string;
  password: string;
}

class Login extends React.PureComponent<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  @autobind
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.username, this.state.password));
  }

  @autobind
  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <div key="login" className="app-login">
        <div className="banner" />
        <div className="main">
          <form name="loginForm" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input required className="form-control" type="text" placeholder="Username" onChange={(event) => { this.onChange('username', event.target.value); }} />
            </div>
            <div className="form-group">
              <input required className="form-control" type="password" placeholder="Password" onChange={(event) => { this.onChange('password', event.target.value); }} />
            </div>
            <div className="form-group">
              <input type="submit" className="btn-line-green" value="Sign In" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
