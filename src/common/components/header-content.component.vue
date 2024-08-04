<template>
  <div :class="['header-container', { 'sidebar-collapsed': sidebarCollapsed }]">
    <pv-toolbar class="bg-white pb-0 pt-0 justify-content-between">
      <template #start>
        <img class="logo" src="../../assets/images/LOGO_WEB.jpg" alt="">
      </template>
      <template #end>
        <div class="header-options">
          <router-link
              v-for="item in items"
              :key="item.label"
              :to="item.to"
              custom
              v-slot="{ navigate, href }">
            <pv-button class="header-button p-button-text  text-white justify-content-right"
                       :href="href"
                       @click="navigate">
              <span class="material-icons">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </pv-button>
          </router-link>
        </div>
      </template>
    </pv-toolbar>
  </div>
</template>


<script>
import { computed } from 'vue';
import { collapsed } from '../services/state.js';
export default {
  name: "header-content",
  data() {
    return {
      items: [
        { label: 'Inicio', icon: 'home', to: '/home' },
        { label: 'Pacientes', icon: 'groups', to: '/home' },
        { label: 'Citas', icon: 'calendar_today', to: '/home' },
        { label: 'Notifications', icon: 'notifications_active', to: '/home' },
        { label: 'User', icon: 'person', to: '/user' }
      ]
    };
  },
  computed: {
    sidebarCollapsed() {
      return collapsed.value;
    }
  }
};
</script>

<style scoped>
.header-container {
  transition: margin-left 0.3s;
}

.header-container.sidebar-collapsed {
  margin-left: 53px; /* Ancho del sidebar cuando está contraído */
}

.header-container:not(.sidebar-collapsed) {
  margin-left: 180px; /* Ancho del sidebar cuando está expandido */
}
.pv-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-options {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px; /* Espacio entre botones */
  flex: 1;
}

.header-button {
  justify-content: center;
  align-items: center;
  flex: 1;
  text-align: center;
  min-width: 100px; /* Ancho mínimo para los botones */
}

h3{
    color:black;
    font-size: 20px;
}

span{
    color: grey;
    font-size: 12px;
}

span.space{
    color:white;
}

.material-icons{
    font-size: 30px;
}

img.logo{
    width:80px;
    height: auto;
}



</style>