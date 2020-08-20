import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {connect} from "react-redux";
import Form from "../form/form.jsx";
import {ActionCreator, Operations} from "../../reducer/reducer";
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.handleBtnNew = this.handleBtnNew.bind(this);
    this.handleBtnDelete = this.handleBtnDelete.bind(this);
  }
  handleBtnNew(evt){
  const {isForm} = this.props;
    isForm(evt.target.dataset.user)
  }
  handleBtnDelete(evt){
    const {deleteUser} = this.props;
    deleteUser(evt.target.dataset.user)
  }
  render() {
    const {users, isLoadForm, userId} = this.props;
    return(
        <React.Fragment>
          <section className="main">
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Роль</th>
                  <th>Удалить польвателя</th>
                  <th>Редактировать польвателя</th>
                </tr>
              </thead>
              <tbody>
              {users.map((it)=>{
                return (
                  <tr key={it.id}>
                    <td>{it.name}</td>
                    <td>{it.role}</td>
                    <td>
                      <button data-user={it.id} onClick={this.handleBtnDelete}>-</button>
                    </td>
                    <td>
                      <button data-user={it.id} onClick={this.handleBtnNew}>+</button>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          <button className="btn-new" data-user="0"
            onClick={this.handleBtnNew}
            >Добавить пользователя</button>
            {isLoadForm ?
              <Form
                userId={userId}
              /> : null
            }
          </section>
        </React.Fragment>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  isForm(user) {
    dispatch(ActionCreator.loadForm(user))
  },
  deleteUser(userId) {
    dispatch(Operations.deleteUser(userId))
  }

})
const mapStateToProps = (state) => ({
  users: state.users,
  isLoadForm: state.isLoadForm,
  userId: state.userId,
});
App.propTypes = {
  deleteUser: propTypes.func.isRequired,
  isForm: propTypes.func.isRequired,
  users: propTypes.array.isRequired,
  isLoadForm: propTypes.bool.isRequired,
  userId: propTypes.oneOfType([
    propTypes.number.isRequired,
    propTypes.string.isRequired,
  ]),
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
