<template>
  <div class="dashboard p-fluid">
    <main id="Home-page">
      <h1>Dashboard</h1>
    </main>

    <div class="profile-completion">
      <div class="profile-card p-shadow-2">
        <div class="profile-info">
          <h3>Completa tu perfil</h3>
          <p>Agrega tu información personal de médico.</p>
        </div>
        <pv-button class="complete-profile-button" label="Completar perfil" icon="pi pi-user-edit" ></pv-button>
      </div>
    </div>

    <h2>Accesos</h2>

    <div class="grid">
      <div class="col-4 col-md-3" v-for="(access, index) in accesses" :key="index">
        <div class="access-item">
          <i :class="['pi', access.icon, 'access-icon']"></i>
          <p>{{ access.label }}</p>
        </div>
      </div>
    </div>

    <h2>Notificaciones</h2>

    <div class="text-white font-bold  align-items-center justify-content-left p-4 border-round">
      <p v-for="notification in notifications" :key="notification" class="notification-item">
        {{ notification }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const accesses = ref([
  { label: 'Pacientes', icon: 'pi pi-users' },
  { label: 'Historial Médico', icon: 'pi pi-file' },
  { label: 'Citas', icon: 'pi pi-calendar' },
  { label: 'Laboratorio', icon: 'pi pi-chart-scatter' },
  { label: 'Disponibilidad', icon: 'pi pi-clock' },
  { label: 'Estadísticas', icon: 'pi pi-chart-line' },
  { label: 'Configuración', icon: 'pi pi-cog' }
]);

const notifications = ref([
  'Cita paciente 1',
  'Cita paciente 2',
  'Cita paciente 3',
  'Laboratorio'
]);

const refreshData = () => {
  console.log('Data refreshed');
};

onMounted(() => {
  console.log('Dashboard mounted');
});
</script>

<script>
export default {
  name: "HomeComponent"
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.profile-completion {
  display: flex;
  justify-content: center;
  width: 100%; /* Ajustar el ancho al 100% */
  margin-bottom: 40px;
}

.profile-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  width: 100%; /* Ajustar el ancho al 100% */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.complete-profile-button {
  margin-right: 20px; /* Ajusta la separación entre el botón y el texto */
  max-width: 150px;
  width: auto; /* Ajusta el ancho del botón */
  padding: 0.5em 1em;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: left;
}

h3 {
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  text-align: left;
}

p {
  margin: 10px 0;
  font-size: 14px;
  color: #666;
  margin-left: 20px;
  text-align: left;
}

.grid {
  margin-bottom: 40px;
  text-align: center;
}

.col-4 {
  padding: 10px;
}

.access-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  text-align: left;
}

.access-icon {
  font-size: 24px;
  margin-right: 10px;
  color: #000;
}

.access-item p {
  margin: 0;
  font-size: 16px;
  color: #000;
}

.notifications {
  margin-top: 20px;
}

.notification-item {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}
</style>
