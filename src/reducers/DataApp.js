import * as types from '../constants/ActionType';



let todos = [];

const DataApp = (state = todos, action) => {
    switch (action.type) {
        case types.TODO_LIST_VIEW_GET:
            console.log(5);
            state = action.toDoList;
            todos = [...state];
            return [...state];
        case types.ADD_DATA_CLIENT:
            return [...state,{id: action.payload.idFake,title: action.payload.value,status: false}]
        case types.ADD_DATA:
            let listNews;
            if (action.checkErorr.erorrs === false){
                listNews = state.forEach(item => {
                    if(item.id === action.imformation.idFake){
                       item.id = action.imformation.data.id;
                       item.title = action.imformation.data.title;
                       item.status = action.imformation.data.status;
                    }
                });
            } else{
                listNews = state.filter(item => item.id !== action.idFake)
            }
            
            return [...listNews];
        case types.DELETE_ITEM:
            const idDelete = action.id;
            const newTodo = state.filter(item => item.id !== idDelete);
            return newTodo;
        case types.CHECK_ACTIVE:
            const idActive = action.id;
            state.forEach(element => {
                if(element.id === idActive) {
                    element.status= !element.status;
                }         
            });
            return [...state];
        
        case types.EDIT_TODO: 
            const idUpDateTodo=action.dataEdit.payload.item.id ;
            const valueUpDateTodo = action.dataEdit.payload.item.value ;
            state.forEach(item => {
                if (item.id === idUpDateTodo){
                    item.title = valueUpDateTodo;
                }
            })
            return [...state];

        case types.CHECK_ACTIVE_ALL:
            const statusActiveAll = action.status;
            
            state.forEach(item => {
                if(statusActiveAll ){
                    item.status= true;
                }else{
                    item.status= false;
                }
            })
            return [...state];
        
        case types.DELETE_ACTIVE:
            
            
            
            return [...state.filter((item) => !item.status)];
        default:
            return [...state];
    }
}

export default DataApp;