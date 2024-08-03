import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from "./router/index.js";

import '@fortawesome/fontawesome-free/js/all'

//Prime Vue Material Design Theme
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Avatar from 'primevue/avatar';
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Dialog from "primevue/dialog";
import Dropdown from 'primevue/dropdown';
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import Tag from "primevue/tag";
import Toolbar from "primevue/toolbar";

const app = createApp(App)

app.use(router);
app.use(PrimeVue, { ripple: true });
app.component('pv-avatar', Avatar);
app.component('pv-button', Button);
app.component("pv-column", Column);
app.component('pv-data-table', DataTable);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('pv-dialog', Dialog);
app.component('pv-dropdown', Dropdown);
app.component('pv-input-text', InputText);
app.component('pv-menubar', Menubar);
app.component('pv-tag', Tag);
app.component('pv-toolbar', Toolbar);

app.mount('#app');
