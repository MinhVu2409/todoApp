import { put, take ,call} from "redux-saga/effects";
import CallApi from '../API/CallApi';
import * as types from "../constants/ActionType";
import * as ConFig from "../API/Config";



//------------ watcher ------------
export function* watcherGetListTodo() {
  while (true) {
    
    yield take(types.TODO_LIST_VIEW_SAGA);
    console.log(3);
    yield call(wokerGetListTodo)
    
}
}
export function* watcherAddItem() {
    while (true) {
      const data = yield take(types.ADD_DATA_SAGA);
      
      yield call(wokerAddItem, data);
    }
  }



export function* watcherEditTodo() {
    while (true) {
      const dataEdit = yield take(types.EDIT_TODO_SAGA);
      
      yield call(workerEditTodo, dataEdit)
    }
}  

export function* watcherDeleteItem() {
  while(true){
    const idItem = yield take(types.DELETE_ITEM_SAGA);
    const id = idItem.payload.id
    yield call(workerDeleteItem, id);
  }
}

export function* watcherCheckActive() {
  while(true){
    const item = yield take(types.CHECK_ACTIVE_SAGA);
    
    yield call(workerCheckActive, item)
  }
}

export function* watcherCheckActiveAll() {
  while(true){
    const dataCheckAll = yield take(types.CHECK_ACTIVE_ALL_SAGA);
    yield call(workerCheckActiveAll, dataCheckAll);
  }
}

export function* watcherDeleteActive() {
  while(true){
    const deleteActive = yield take(types.DELETE_ACTIVE_SAGA);
    yield call(workerDeleteActive,deleteActive);
  }
}
// //----------- woker ----------------
export function* wokerGetListTodo() {
  const response = yield CallApi().catch((error) => {
    console.log("Loi: ", error);
  });
  if (response.status === 200) {
    console.log(4);
    yield put({ type: types.TODO_LIST_VIEW_GET, toDoList: response.data});
  }
}

export function* wokerAddItem(data) {
    const value = data.payload.value;
    const idFake = data.payload.idFake;
    const statusFake = data.payload.status;
    try {
      const response = yield CallApi ("post", `${ConFig.API_URL}`, {
        title: value,
        status: statusFake,
      });
      const data = response.data;
      const imformation = { data, idFake};
      if(response.status === 201 && idFake){
        const checkErorr = { erorrs : false }
        yield put({type: types.ADD_DATA, imformation, checkErorr})
      }
    } catch (error) {
      const checkErorr = { erorrs : true }
      yield put({type: types.ADD_DATA, idFake, checkErorr})
    }
  }
export function* workerEditTodo(dataEdit) {
    
    const idEdit = dataEdit.payload.item.id;
    const valueEdit = dataEdit.payload.item.value;
    CallApi("put", `${ConFig.API_URL}/${idEdit}`,{title: valueEdit}).catch(
      (error)=> {
        console.log("Lỗi Sửa !!!",error);
      });
    yield put({type: types.EDIT_TODO,dataEdit})
}

export function* workerDeleteItem(id){
    
    CallApi("delete", `${ConFig.API_URL}/${id}`).catch((error) => {
      console.log("Xóa thất bại !", error);
    });
    yield put({ type: types.DELETE_ITEM, id });
  
}

export function* workerCheckActive(item){
    yield wokerGetListTodo();
    const id = item.payload.item.id;
    CallApi("put", `${ConFig.API_URL}/${item.payload.item.id}`,{
      status: item.payload.item.status === true ? !item.payload.item.status : true,
    }).catch((error) => {
      console.log("Check thất bại !", error);
    });
    yield put({ type: types.CHECK_ACTIVE, id})
}

export function* workerCheckActiveAll(dataCheckAll){
    
    const id = dataCheckAll.payload.data.id;
    
    const status = dataCheckAll.payload.data.status;
    CallApi("put", `${ConFig.API_URL}/${id}`,{status: status}).catch((error) => {
      console.log("Check thất bại !", error);
    });
    yield put({type: types.CHECK_ACTIVE_ALL,status})
}

export function* workerDeleteActive(deleteActive){
  const todo = deleteActive.payload.listTodo;
  todo.forEach((item) => {
    if (item.status === true) {
      CallApi("delete", `${ConFig.API_URL}/${item.id}`).catch((error) => {
        console.log("Loi: ", error);
      });
    }
  });
  yield put({type: types.DELETE_ACTIVE})
}