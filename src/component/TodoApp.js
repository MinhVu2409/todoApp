import React from "react";
import { connect } from "react-redux";
import * as actions  from '../actions';

// component
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

// style 
import './style/Todo.css';

const TodoApp = ({ listTodo , getList}) => {
    
    const [todoView,setTodoView] = React.useState([])
    const [showTodoList, setShowTodoList] = React.useState('all');

    

    React.useEffect(() => {
        getList()
    }, []);
    
    React.useEffect(() => {
        switch(showTodoList) {
            case 'all':
                setTodoView(listTodo);
                break;
            case 'active':
                const showActive = listTodo.filter(item => item.status === true);
                setTodoView(showActive);
                break;
            case 'completed':
                const showCompleled = listTodo.filter(item => item.status === false);
                setTodoView(showCompleled)
        }

    },[showTodoList, listTodo])



    const showTodo = (text) => {
        setShowTodoList(text)
    };

    return(
        <>
        <h1>Todo-App</h1>
        <div className="todoapp">
            <Header />
            <Content 
                todoView={todoView} 
            />
            <Footer
                setTodoView={setTodoView}
                showTodo={showTodo}
                showTodoList={showTodoList}
            />
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        listTodo: state.toDo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        getList: () => {
        console.log(1);
        dispatch(actions.ON_TODO_LIST_VIEW_ALL_SAGA());
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);