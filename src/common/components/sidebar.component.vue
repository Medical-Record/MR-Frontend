<script>
import SidebarLink from './sidebar-Link.component.vue'
import { collapsed, toggleSidebar, sidebarWidth } from '../services/state.js'
import Avatar from 'primevue/avatar';
export default {
  components: { SidebarLink, Avatar },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  },
  methods: {
    toggleSidebar() {
      toggleSidebar();
      this.$emit('toggle', collapsed.value);
    }
  }
}
</script>

<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
      <div class="avatar-container">
        <Avatar
            image="../public/avatar.jpg"
        shape="circle"
        class="custom-avatar"
        />
      </div>


        <SidebarLink to="/" icon="fas fa-home">Inicio</SidebarLink>
        <SidebarLink to="/personal-data" icon="fas fa-users">Pacientes</SidebarLink>
        <SidebarLink to="/payment" icon="fas fa-file">Historias clínicas</SidebarLink>
        <SidebarLink to="/notification" icon="fas fa-calendar">Citas</SidebarLink>
        <SidebarLink to="/sign-out" icon="fas fa-right-from-bracket">Sign out</SidebarLink>

        <span
                class="collapse-icon"
                :class="{ 'rotate-180': collapsed }"
                @click="toggleSidebar"
        >
      <i class="fas fa-angle-double-left" />
    </span>
    </div>
</template>

<style>
:root {
    --sidebar-bg-color: #0099AD;
    --sidebar-item-hover: #38a169;
    --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
}
.avatar-container {
  margin-top: 2em;
  margin-bottom: 2em;
  width: 100%;
  display: flex;
  justify-content: center;
}
.custom-avatar {
  width: 100px;
  height: 100px;
}
.sidebar h1 {
    height: 2.5em;
}
.sidebar a {
  margin-top: 1em; /* Espacio adicional entre los enlaces */
  display: block;
  width: 100%;
}
.collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;

    color: rgba(255, 255, 255, 0.7);

    transition: 0.2s linear;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
}
</style>