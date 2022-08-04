import { all, fork } from "redux-saga/effects";
import {bookingSaga} from "./bookingSaga";

export default function* rootSaga() {
  yield all([fork(bookingSaga)]);
}
