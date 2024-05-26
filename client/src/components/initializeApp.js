import store from '../redux/store';

export default function InitializeApp () {
  const userData = JSON.parse(localStorage.getItem('user'));
  const storedUserData = userData ? userData.user : null;
  if (storedUserData) {
    store.dispatch({ type: 'SET_USER_INFO', payload: storedUserData });
  }
};