import React from "react";

// redux
import { connect } from 'react-redux';
import * as actions  from '../actions';
// style 
import './style/Todo.css';

// img
import check from '../img/check.png';
import delItem from '../img/x.png';
import notCheck from '../img/notCheck.png'


function Content({ idDelete , idCheckActive, valueEditTodo, todoView}) {

    
    const [idEdit, setIdEdit] = React.useState();

    const [value, setValue] = React.useState('');
    

    //Edit Todo
    const onClickEditTodos = (id, title) => {
        setIdEdit(id);
        setValue(title);
    };

    const onChangeInputContent = (event) => {
        const text = event.target.value;
        setValue(text)
    }


    const updateTodoContent = (event, id) => {
        if (event.key === 'Enter' ) {
                if(value && value.trim()) {
                    const item = {id,value}
                    valueEditTodo(item);
        }
        setIdEdit('');
    }
    };

    // click check
    const onClickCheck = (item) => {
          idCheckActive(item);
    };


    // delete todolist
    const onClickDeleteTodo = (id) => {
        idDelete(id);
    };

    return(
        <div className='content'>
            {
                 todoView.length > 0 && todoView.map((item,index) => (
                    <div 
                        className='todo-item'
                        key={index} 
                        
                    >
                        <img 
                            className="check-active" 
                            src={item.status === true ? check : notCheck} 
                            alt='check' 
                            onClick={() => onClickCheck(item)}
                        />                    
                        {
                        idEdit === item.id ? (
                                <input 
                                    value={value}
                                    onChange={onChangeInputContent}
                                    onKeyDown={(event) => updateTodoContent(event, item.id)}
                                />
                            ) : (
                                <p className={item.status ? "titleActive" : "title"}
                                   onDoubleClick={() => onClickEditTodos(item.id, item.title)}
                                >
                                    {item.title}
                                </p>
                            )
                        }
                        <img 
                            className="del-item" 
                            alt='delete item'
                            src={delItem} 
                            onClick={() => onClickDeleteTodo(item.id)} 
                        />
                    </div>
                ))
            }
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        listTodo: state.toDo,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        
        idDelete : id => { 
            dispatch(actions.ON_DELETE_DATA_SAGA(id));
        },
        idCheckActive : item => {
            dispatch(actions.ON_CHECK_ACTIVE_SAGA(item));
        },

        valueEditTodo : (item) => {
            dispatch(actions.ON_EDIT_TODO_SAGA(item))
            
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);