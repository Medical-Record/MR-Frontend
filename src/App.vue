<script>
import HeaderContent from "./common/components/header-content.component.vue";
import SideBar from "./common/components/sidebar.component.vue";
import { sidebarWidth } from "./common/services/state.js";
import { ref } from 'vue';

export default {
  name: 'App',
  components: { SideBar, HeaderContent },
  data() {
    return {
      sidebarVisible: true,
      sidebarCollapsed: false,
    };
  },
  methods: {
    toggleSidebar(collapsed) {
      this.sidebarCollapsed = collapsed;
    }
  }
}
</script>

<template>
  <div :class="['app-container', { 'sidebar-collapsed': sidebarCollapsed }]">
    <pv-menubar class="pb-0 pt-0 w-full">
      <template #start>
        <div class="flex inline-block justify-content-between align-items-center">
          <header-content></header-content>
        </div>
      </template>
    </pv-menubar>

    <side-bar v-model:visible="sidebarVisible" @toggle="toggleSidebar"></side-bar>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.sidebar-collapsed .content {
  margin-left: 53px; /* Ancho del sidebar cuando está contraído */
}
*{
  background-color: white;
  color: black;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.app-container {
  height: 100vh;
}
sidebar-collapsed .content {
  margin-left: 53px; /* Ancho del sidebar cuando está contraído */
}

.content {
  flex-grow: 1;
  margin-left: 180px; /* Ancho del sidebar cuando está expandido */
  transition: margin-left 0.3s;
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
  }
}
</style>