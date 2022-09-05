import React from "react";

// import connect
import { connect } from "react-redux";
import * as actions  from '../actions'

// style 
import './style/Todo.css';

// id
import { v4 as uuidv4 } from 'uuid';

// img
import arrowDown from '../img/arrowDown.png';

function Header ({addDataServer,addDataClient, checkActiveAll,listTodo, getList }) {
    const [textInput, setTextInput] = React.useState('');
    
    // check active
    const [status, setStatus] = React.useState(false);

    // set active all 
    const onClickActiveAll = () => {
        listTodo.forEach(item => {
            let id = item.id;
            const data ={id, status}
            checkActiveAll(data);
            
        });
        setStatus(!status)
    };

    // onchange input
    const onChangeInputHeader = (e) => {
        const text = e.target.value;
        setTextInput(text);
    };

    // add todolist
    const onEnter =(event) => {
        if (event.key === "Enter" && textInput && textInput.trim()){
            const value = textInput;
            const idFake = uuidv4();
            const status = false;
            const data = {idFake,value,status}
            addDataClient(data);
            addDataServer(data);
            setTextInput('');
        }
    };

    return(
        <div className="header">
            <img 
                onClick={onClickActiveAll}
                className='activeAll'
                alt='active all' 
                src={arrowDown} 
            />
            <input 
                title="text" 
                placeholder="Add a new item!" 
                value={textInput}
                onChange={onChangeInputHeader}
                onKeyDown={onEnter} 
            /> 
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        listTodo: state.toDo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        addDataServer : (data)=>{
            dispatch(actions.ON_ADD_DATA_SAGA(data));
        },

        addDataClient : (data)=>{
            dispatch(actions.ON_ADD_DATA_CLIENT(data));
            
        },
        
        checkActiveAll: data => {
            dispatch(actions.ON_CHECK_ACTIVE_ALL_SAGA(data));
        },
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Header);