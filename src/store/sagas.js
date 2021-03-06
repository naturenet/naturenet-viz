import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
function* foo(action){
  console.log('foo', action)
  // const data = yield new Promise((resolve) => {
  //   setTimeout(() => {
  //     //dispatch(increment(getState().counter))
  //     resolve([1,2,3,4,5])
  //   }, 200)
  // })

  const activities = yield firebase.database()
        .ref('activities')
        .once('value')
        .then(snapshot => {
          return snapshot.val()
        })

  const observations = yield firebase.database()
        .ref('observations')
        .once('value')
        .then(snapshot => {
          return snapshot.val()
        })

  const data = {
    observations,
    activities
  }

  yield put({type: 'LOAD.DATA.SUCCESS', payload: data})
  console.log('got data', data)
}

export default function* rootSagas() {
  // console.log('saga is running')
  yield call(foo)//[put({type: 'LOAD.DATA'}), takeEvery("LOAD.DATA", foo)]
}
