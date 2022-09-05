import * as types from '../constants/ActionType';


export const ON_TODO_LIST_VIEW_GET_ALL = (toDoList) => {
    return {
      type: types.TODO_LIST_VIEW_GET,
      toDoList,
    };
  };

export const ON_ADD_DATA = (imformation, checkErorr) => {
    return {
        type: types.ADD_DATA,
        payload: {imformation,checkErorr}
    }
}
export const ON_ADD_DATA_CLIENT = data => {
  return{
    type: types.ADD_DATA_CLIENT,
    payload: data
  }
}

export const ON_DELETE_ITEM = id => {
    return{
        type : types.DELETE_ITEM,
        payload: id
    }
}

export const ON_CHECK_ACTIVE = (id) => {
    return {
        type: types.CHECK_ACTIVE,
        payload: id
    }

}


export const ON_EDIT_TODO = (dataEdit) => {
    return {
        type: types.EDIT_TODO,
        payload: {
            dataEdit
        }
    }
}

export const ON_CHECK_ACTIVE_ALL = status => {
    return {
        type: types.CHECK_ACTIVE_ALL,
        payload: status
    }
}

export const ON_DELETE_ACTIVE = () => {
    return {
      type: types.DELETE_ACTIVE,
    }
}

//--------------------- SAGA --------------------
export const ON_TODO_LIST_VIEW_ALL_SAGA = () => {
  console.log(2);
  return {
    type: types.TODO_LIST_VIEW_SAGA,
  };
};

export const ON_ADD_DATA_SAGA = (data) => {
    return {
      type: types.ADD_DATA_SAGA,
      payload: data
    };
  };


export const ON_EDIT_TODO_SAGA = (item) => {
  return {
      type: types.EDIT_TODO_SAGA,
      payload: {
          item
      }
  }
}

export const ON_DELETE_DATA_SAGA = (id) => {
    return {
      type: types.DELETE_ITEM_SAGA,
      payload: {id},
    };
  };  
  
export const ON_CHECK_ACTIVE_SAGA = (item) => {
    return {
      type: types.CHECK_ACTIVE_SAGA,
      payload: {item},
    };
  };

export const ON_CHECK_ACTIVE_ALL_SAGA = (data) => {
    return {
      type: types.CHECK_ACTIVE_ALL_SAGA,
      payload: {data}
    }
};

export const ON_DELETE_ACTIVE_SAGA = (listTodo) => {
  return {
    type: types.DELETE_ACTIVE_SAGA,
    payload: {listTodo}
  }
}
 
