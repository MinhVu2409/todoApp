import { all } from "redux-saga/effects";

import {
    watcherGetListTodo,
    watcherAddItem,
    watcherEditTodo,
    watcherDeleteItem,
    watcherCheckActive,
    watcherCheckActiveAll,
    watcherDeleteActive
} from "./SagaTodos";

export default function* mySaga() {
    yield all([
        watcherGetListTodo(),
        watcherAddItem(),
        watcherEditTodo(),
        watcherDeleteItem(),
        watcherCheckActive(),
        watcherCheckActiveAll(),
        watcherDeleteActive()
    ]);
}