import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {

};

const instance = firebase.initializeApp(config);

const auth = instance.auth();

export default ({ Vue }) => {
  Vue.prototype.$auth = auth;
  Vue.use(VueFire);
};
