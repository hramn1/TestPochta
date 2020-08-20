import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {connect} from "react-redux";
import {Operations} from "../../reducer/reducer";

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.inputRef = React.createRef();
    this.selectRef = React.createRef();
  }
  onSubmit(evt){
    const {editUser, postUser, userId} = this.props;
    evt.preventDefault();
    const userData = {
      id: Number(userId),
      name: this.inputRef.current.value,
      role: this.selectRef.current.value
    }
    if(Number(userId) !==0) {
      editUser(userData, userId)
    } else {
      userData.id = (10 + Math.random() * (100 - 10)).toFixed(0);
      postUser(userData);
    }
  }
  render() {
    const {users, userId} = this.props;
    let currentUser = ``
    if(userId !== 0) {
      currentUser = users[userId-1];
    }
    return(
        <React.Fragment>
        <form className="form-user" method="post" onSubmit={this.onSubmit}>
          <input disabled type="text" value={currentUser ? currentUser.name : `Новый пользователь` } />
          <input ref={this.inputRef} defaultValue={currentUser ? currentUser.name : `` } type="text"/>
          <select ref={this.selectRef} >
            <option value="admin">admin</option>
            <option value="user">user</option>
            <option value="guest">guest</option>
          </select>
          <button type="submit" >Сохранить</button>
        </form>
        </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => ({
  users: state.users
});
const mapDispatchToProps = (dispatch) => ({
  editUser(userData, userId) {
    dispatch(Operations.editUsers(userId, userData))
  },
  postUser(userData) {
    dispatch(Operations.postUsers(userData))
  },

})
Form.propTypes = {
  editUser: propTypes.func.isRequired,
  postUser: propTypes.func.isRequired,
  userId:propTypes.oneOfType([
    propTypes.number.isRequired,
    propTypes.string.isRequired,
  ]),
  users: propTypes.array.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(Form);
