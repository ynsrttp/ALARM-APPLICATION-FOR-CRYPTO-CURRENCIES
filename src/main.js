import { createApp } from 'vue'

import App from './App.vue'
import myCoins from './components/myCoins.vue'
import portfolio from './components/Portfoliox.vue'
import HomePage from './components/HomePage.vue'
import sideBar from './components/sideBar.vue'
import alerts from './components/alerts.vue'
import onchain from './components/onchain.vue'
import axios from 'axios';


const app = createApp(App);
app.component('myCoins', myCoins);
app.component('sideBar', sideBar);
app.component('portfolio', portfolio);
app.component('alerts', alerts);
app.component('onchain', onchain);


app.mount('#app');
