import React from "react";
import { connect } from "react-redux";
import * as styles from '../actions'

// style 
import './style/Todo.css';

function Footer(props) {
    const {listTodo, showTodo, showTodoList,clearActive} = props;

    // dem so item chua duoc active
    const countNoneActive = () => {
        let count = 0;
        listTodo.forEach(item => {
            if(item.status === false){
                count++;
            }
        });
        return count;
    }

    // xoa tat ca phan tu da duoc active
    const onClearActive = () => {
        clearActive(listTodo)
    };

    const showTodos = (text) => {
        showTodo(text);
    };

    return(
            <div className='footer'>
                <p>{countNoneActive()} item</p>
                <button onClick={() => showTodos('all')} className={showTodoList === 'all' ? 'showActive': 'button'}>All</button>
                <button onClick={() => showTodos('active')} className={showTodoList === 'active' ? 'showActive': 'button'}>Active</button>
                <button onClick={() => showTodos('completed')} className={showTodoList === 'completed' ? 'showActive': 'button'}>Completed</button>            
                <button onClick={()=> onClearActive()}>Clear active</button>
            </div>
    )
}
const mapStateToProps = (state) => {
    return {
        listTodo: state.toDo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return{
        clearActive : (listTodo) => {
            dispatch(styles.ON_DELETE_ACTIVE_SAGA(listTodo));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Footer);