import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { URL, CLEAR_TIME, ERROR_TODO_MESSAGE } from '../constants';
import {
  addNewToDo,
  fetchToDoList,
  deteleItem,
  updateStatusItem,
  editItem,
  searchNameInToDoList,
} from '../actions/todoActions';

class Todo extends Component {
	constructor(props){
    super(props);
    this.state = {
      additional: false,
      status: false,
      emptyInputStatus: false,
      name: '',
      description: '',
      limit: 5,
      page: 1,
      sort: 'desc',
      showEdit: false,
      editId: '',
      editName: '',
      editDescription: '',
    };
  }
  
  componentWillMount() {
		if (!this.props.auth) {
			this.props.history.push(URL.login_url);
		}
	}

	componentWillUpdate(nextProps) {
		if (!nextProps.auth) {
			this.props.history.push(URL.login_url);
		}
  }

  componentDidMount(){
    if(this.props.auth){
      setTimeout(() => {
        this.props.fetchToDoList(this.state.page, this.state.limit, this.state.sort);
      }, 1000);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.todo.clearData){
      this.setState({name: '', description: '', showEdit: false, additional: false});
    }
  }

  openAdditional = () => {
    this.setState({additional: !this.state.additional, description: ''});
  }

  initName = (event) => {
    this.setState({name: event.target.value});
  }

  initDescripton = (event) => {
    this.setState({description: event.target.value});
  }

  initEditName = (event) => {
    this.setState({editName: event.target.value});
  }

  initEditDescripton = (event) => {
    this.setState({editDescription: event.target.value});
  }

  addNewToDo = () => {
    this.props.addNewToDo(
      this.state.name.trim(),
      this.state.description.trim(),
      new Date().getTime(),
      this.state.status,
      this.state.page,
      this.state.limit,
      this.state.sort
    );
  }

  initPagination = () => {
    
    let pagination = Math.ceil(this.props.todo.toDoList.length / this.state.limit);
    let currentPage = this.state.page;

    let li = [];
    for (let i = 1; i <= pagination; i++) {
      li.push(
        <li key={i}
          onClick={currentPage === i ? null : this.fetchPaginationToDoList.bind(this, i)}
          className={currentPage === i ? 'active' : 'waves-effect'}><a>{i}</a>
        </li>
      );
    }
    return (
      <div>
        {pagination > 1 &&
          <ul className="pagination"> 
            {currentPage === 1 &&
                <li
                  className="disabled">
                  <a><i className="material-icons">chevron_left</i></a>
                </li>
            }
            {currentPage > 1 &&
              <li
                onClick={this.fetchArrowPaginationTodoList.bind(this, false)}
                className="waves-effect">
                <a><i className="material-icons">chevron_left</i></a>
              </li>
            }
            {li}
            {currentPage === pagination &&
              <li
                className="disabled">
                <a><i className="material-icons">chevron_right</i></a>
              </li>
            }
            {currentPage <  pagination &&
              <li
                onClick={this.fetchArrowPaginationTodoList.bind(this, true)}
                className="waves-effect">
                <a><i className="material-icons">chevron_right</i></a>
              </li>
            }
          </ul>
        }
      </div>
    );
  }

  fetchPaginationToDoList(i) {
    this.setState({page: i});
    this.props.fetchToDoList(i, this.state.limit, this.state.sort);
  }

  fetchArrowPaginationTodoList(v){
    if(v){
      this.setState({page: this.state.page + 1});
      this.props.fetchToDoList(this.state.page, this.state.limit, this.state.sort);
      
    }else{
      this.setState({page: this.state.page - 1});
      this.props.fetchToDoList(this.state.page, this.state.limit, this.state.sort);
    }
  }

  deleteItem(id){
    confirmAlert({
      title: 'Delete todo item ?',                        
      message: 'Are you sure to do this.',                    
      confirmLabel: 'Confirm',                          
      cancelLabel: 'Cancel',                            
      onConfirm: () => this.props.deteleItem(id, this.state.page, this.state.limit, this.state.sort),    
    });
  }

  updateStatusItem(id, status){
    this.props.updateStatusItem(id, status, this.state.page, this.state.limit, this.state.sort);
  }

  editItem(id, name, description){
    this.setState({
      editName: name,
      editDescription: description,
      editId: id,
      showEdit: true,
    });
  }

  editItemWithState(){
    this.props.editItem(this.state.editId, this.state.editName, this.state.editDescription, this.state.page, this.state.limit, this.state.sort)
  }

  searchNameInToDoList = (event) => {
    let search = event.target.value;
    this.props.searchNameInToDoList(search, this.state.page, this.state.limit, this.state.sort);
  }

  sortItem(sort){
    this.setState({sort});
    this.props.fetchToDoList(this.state.page, this.state.limit, sort);
  }

  render() {

    const todo = this.props.todo;
    return (
      <div>

        {this.state.showEdit &&
          <div id="edit-popup-container">
            <div>
            <input onChange={this.initEditName} type="text"  placeholder="Name" value={this.state.editName}/>
            <textarea
                className="materialize-textarea"
                onChange={this.initEditDescripton}
                placeholder="Description"
                value={this.state.editDescription}
              >
              </textarea>
              <hr />
              <a onClick={this.editItemWithState.bind(this)} className="waves-effect waves-light green btn">Save</a>
              <a onClick={() => {this.setState({showEdit: false, editId: '', editName: '', editDescription: ''})}} className="waves-effect waves-light red btn">Cancel edit</a>
            </div>
          </div>
        }

        <h1 style={{fontSize: '2.2em'}}>Todo App - Aleksandra Weber</h1>
        <div className="row">
					<br />
					<div className="col s6">
						<input onChange={this.initName} type="text"  placeholder="Name" value={this.state.name}/>
            <p>Additional</p>
            <div className="switch">
              <label>
                Off
                <input checked={this.state.additional} type="checkbox" onChange={this.openAdditional}/>
                <span className="lever"></span>
                On
              </label>
            </div>
            {this.state.additional &&
              <textarea
                className="materialize-textarea"
                onChange={this.initDescripton}
                placeholder="Description"
                value={this.state.descripton}
              >
              </textarea>
            }
            <br />
					</div>
					<div className="col s6">
            <button
              onClick={this.addNewToDo}
              className="btn waves-effect waves-light"
            >
              Add
            </button>
					</div>
          <div className="col s12">
            <hr />
          </div>
          <div className="col s12">
            {todo.error &&
              <div className="card-panel">
                <span className="red-text text-darken-2">{todo.error}</span>
              </div>
            }
            {todo.success &&
              <div className="card-panel">
                <span className="green-text text-darken-2">{todo.success}</span>
              </div>
            }
          </div>
				</div>
        {todo.toDoList.length > 0 &&
          <div className="row">
            <div className="col s6">
              <label>Search: todo list name</label>
              <input type="text" onChange={this.searchNameInToDoList} placeholder="Search"/>
            </div>
            <div className="col s6">
              <label>Filter: {this.state.sort === 'desc' ? 'Newest date todo items to oldest date': 'Oldest date todo items to newest date'}</label>
              <div className="clearfix"></div>
              {this.state.sort === 'desc' &&
                <a onClick={this.sortItem.bind(this, 'asc')} className="waves-effect waves-light btn-large"><i className="material-icons left">arrow_downward</i>OLD to NEW</a>
              }
              {this.state.sort !== 'desc' &&
                <a onClick={this.sortItem.bind(this, 'desc')} className="waves-effect waves-light btn-large"><i className="material-icons left">arrow_upward</i>NEW to OLD</a>
              }
            </div>
              <div className="col s12">
                <div className="responsive-table">
                <table className="bordered striped highlight">
                  <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                  {todo.toDoList.result.map(item => {
                    return (
                    <tr key={item.id}>
                      <td>
                        {new Date(item.createdAt).getDate()}/
                        {new Date(item.createdAt).getMonth() + 1}/
                        {new Date(item.createdAt).getFullYear()}&nbsp;|&nbsp;
                        {new Date(item.createdAt).getHours()}:
                        {new Date(item.createdAt).getMinutes()}
                        
                      </td>
                      <td>
                        {item.name}
                      </td>
                      <td>{item.description}</td>
                      <td>
                      {item.status && 
                        <span className="new badge green">Complete</span>
                      }
                      {!item.status && 
                        <span className="new badge amber">Uncomplete</span>
                      }
                      </td>
                      <td className="actions-button">
                        {item.status && 
                          <a onClick={this.updateStatusItem.bind(this, item.id, false)} className="waves-effect waves-light amber btn">Uncomplete</a>
                        }
                        {!item.status && 
                          <a onClick={this.updateStatusItem.bind(this, item.id, true)} className="waves-effect waves-light green btn">Complete</a>
                        }
                        <a onClick={this.editItem.bind(this, item.id, item.name, item.description)} className="waves-effect waves-light light-blue btn">Edit</a>
                        <a onClick={this.deleteItem.bind(this, item.id)} className="waves-effect waves-light red btn">Delete</a>
                        </td>
                    </tr>
                    );
                  })} 

                  </tbody>
                </table>
                </div>
                {this.initPagination()}
              </div>
          </div>
        }
        {todo.toDoList.length === 0 &&
          <div className="row">
              <div className="col s12">
                <p>Empty TODO LIST</p>
              </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
    auth: state.auth.status,
    todo: state.todo,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNewToDo: (name, description, createdAt, status, page, limit, sort) => {
      dispatch(addNewToDo(name, description, createdAt, status, page, limit, sort))
    },
    fetchToDoList: (page, limit, sort) => {dispatch(fetchToDoList(page, limit, sort))},
    deteleItem: (id, page, limit, sort) => {dispatch(deteleItem(id, page, limit, sort))},
    updateStatusItem: (id, status, page, limit, sort) => {dispatch(updateStatusItem(id, status, page, limit, sort))},
    editItem: (id, name, description, page, limit, sort) => {dispatch(editItem(id, name, description, page, limit, sort))},
    searchNameInToDoList: (search, page, limit, sort) => {dispatch(searchNameInToDoList(search, page, limit, sort))}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
