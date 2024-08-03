<template>
  <div>
    <div class="card">
      <!-- Toolbar Section -->
      <pv-toolbar class="mb-4">
        <template #start>
          <pv-button label="Crear historia" icon="pi pi-plus"
                     class="p-button-success mr-2"
                     @click="openNew"></pv-button>
          <pv-button label="Eliminar" icon="pi pi-trash"
                     class="p-button-danger"
                     @click="confirmDeleteSelected"
                     :disabled="!selectedPatients || !selectedPatients.length"></pv-button>
        </template>
        <template #end>
          <pv-button label="Export" icon="pi pi-download"
                     class="p-button-help"
                     @click="exportToCsv($event)"></pv-button>
        </template>
      </pv-toolbar>

      <!-- Data Table Section -->
      <pv-data-table ref="dt" :value="patients"
                     v-model:selection="selectedPatients"
                     dataKey="id"
                     :paginator="true"
                     :rows="10"
                     :filters="filters"
                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                     :rowsPerPageOptions="[5, 10, 25]"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tutorials"
                     responsiveLayout="scroll">
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Manage Inventory</h5>
            <span class="p-input-icon-left">
                          <i class="pi pi-search"></i>
                          <pv-input-text v-model="filters['global'].value"
                                         placeholder="Search..."></pv-input-text>
                      </span>
          </div>
        </template>

        <pv-column selectionMode="multiple" style="width: 3rem" :exportable="false"></pv-column>
        <pv-column field="id" header="Id" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="code" header="Número de historia" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="firstname" header="Nombres" :sortable="true" style="min-width: 12rem"></pv-column>
        <pv-column field="lastname" header="Apellidos" :sortable="true" style="min-width: 12rem"></pv-column>
        <pv-column field="gender" header="Género" :sortable="true" style="min-width: 8rem" ></pv-column>
        <pv-column field="description" header="Descripción" :sortable="true"
                   style="min-width: 16rem"></pv-column>
        <pv-column field="phone" header="Teléfono" :sortable="true" style="min-width: 12rem"></pv-column>
        <pv-column field="email" header="Correo" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="birthdate" header="Fecha de nacimiento" :sortable="true" style="min-width: 12rem"></pv-column>
        <pv-column field="appointment" header="Cita" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="record" header="Historia" :sortable="true" style="min-width: 12rem">
          <template #body="slotProps">
            <pv-tag v-if="slotProps.data.status === 'Published'"
                    severity="success">{{ slotProps.data.status }}
            </pv-tag>
            <pv-tag v-else severity="info">{{ slotProps.data.status }}</pv-tag>
          </template>
        </pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button icon="pi pi-pencil" class="p-button-text p-button-rounded"
                       @click="editProduct(slotProps.data)"></pv-button>
            <pv-button icon="pi pi-trash" class="p-button-text p-button-rounded"
                       @click="confirmDeleteProduct(slotProps.data)"></pv-button>
          </template>
        </pv-column>
      </pv-data-table>

      <!-- Add/Edit Products Dialog -->
      <pv-dialog v-model:visible="patientDialog"
                 :style="{width: '450px'}"
                 header="Información del pacienten"
                 :modal="true"
                 class="p-fluid">

        <div class="field">
                  <span class="p-float-label">
                      <pv-input-text type="text"
                                     v-model.trim="product.code"
                                     required="true"
                                     rows="2" cols="20"/>
                      <label for="code">Code</label>
                  </span>
        </div>
        <div class="field mt-3">
                  <span class="p-float-label">
                      <pv-input-text type="text"
                                     v-model.trim="product.title"
                                     required="true"
                                     autofocus
                                     :class="{'p-invalid': submitted && !product.title}"/>
                      <label for="title">Title</label>
                      <small class="p-error" v-if="submitted && !product.title">Title is required.</small></span>
        </div>

        <div class="field">
                  <span class="p-float-label">
                      <pv-input-text type="text"
                                     v-model.trim="product.gender"
                                     required="true"
                                     rows="2" cols="20"/>
                      <label for="gender">Gender</label>
                  </span>
        </div>

        <div class="field">
                  <span class="p-float-label">
                      <pv-input-text type="text"
                                     v-model.trim="product.description"
                                     required="true"
                                     rows="2" cols="20"/>
                      <label for="description">Description</label>
                  </span>
        </div>

        <div class="field">
                  <span class="p-float-label">
                      <pv-input-text type="text"
                                     v-model.trim="product.material"
                                     required="true"
                                     rows="2" cols="20"/>
                      <label for="material">Material</label>
                  </span>
        </div>

        <div class="field">
                  <span class="p-float-label">
                      <pv-input-text type="text"
                                     v-model.trim="product.price"
                                     required="true"
                                     rows="2" cols="20"/>
                      <label for="price">Price</label>
                  </span>
        </div>

        <div class="field">
                  <span class="p-float-label">
                      <pv-input-text type="text"
                                     v-model.trim="product.color"
                                     required="true"
                                     rows="2" cols="20"/>
                      <label for="color">Color</label>
                  </span>
        </div>

        <div class="field">
                  <span class="p-float-label">
                      <pv-input-text type="text"
                                     v-model.trim="product.quantity"
                                     required="true"
                                     rows="2" cols="20"/>
                      <label for="quantity">Quantity</label>
                  </span>
        </div>

        <div class="field">
                  <span class="p-float-label">
                      <pv-input-text type="text"
                                     v-model.trim="product.stock"
                                     required="true"
                                     rows="2" cols="20"/>
                      <label for="stock">Stock</label>
                  </span>
        </div>

        <div class="field">
                  <span class="p-float-label">
                      <pv-input-text type="text"
                                     v-model.trim="product.inventoryStatus"
                                     required="true"
                                     rows="2" cols="20"/>
                      <label for="inventoryStatus">Status</label>
                  </span>
        </div>



        <div class="field">
          <pv-dropdown id="published"
                       v-model="product.status"
                       :options="statuses"
                       optionLabel="label"
                       placeholder="Select an Status">
            <template #value="slotProps">
              <div v-if="slotProps.value && !slotProps.value.value">
                                <span :class="'product-badge status-' + slotProps.value.toLowerCase()">
                                    {{ slotProps.value.label }}
                                </span>
              </div>
              <div v-else-if="slotProps.value && !slotProps.value.value">
                                <span :class="'product-badge status-' + slotProps.value.toLowerCase()">
                                    {{ slotProps.value }}
                                </span>
              </div>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
          </pv-dropdown>
        </div>
        <template #footer>
          <pv-button :label="'Cancel'.toUpperCase()" icon="pi pi-times"
                     class="p-button-text"
                     @click="hideDialog"/>
          <pv-button :label="'Save'.toUpperCase()" icon="pi pi-check"
                     class="p-button-text"
                     @click="saveTutorial"/>
        </template>
      </pv-dialog>
      <!-- Delete Tutorial Confirmation Dialog -->
      <pv-dialog v-model:visible="deleteProductDialog"
                 header="Confirm"
                 :modal="true"
                 :style="{width: '450px'}">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem"/>
          <span v-if="product">Are you sure you want to delete <b>{{ product.title }}</b>?</span>
        </div>

        <template #footer>
          <pv-button :label="'No'.toUpperCase()" icon="pi pi-times"
                     class="p-button-text"
                     @click="deleteProductDialog = false"/>
          <pv-button :label="'Yes'.toUpperCase()" icon="pi pi-check"
                     class="p-button-text"
                     @click="deleteProduct"/>
        </template>
      </pv-dialog>

      <!-- Delete Selected Products Confirmation Dialog -->
      <pv-dialog v-model:visible="deleteProductsDialog"
                 header="Confirm"
                 :modal="true"
                 :style="{width: '450px'}">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem"/>
          <span v-if="selectedProducts">Are you sure you want to delete the selected products?</span>
        </div>

        <template #footer>
          <pv-button :label="'No'.toUpperCase()" icon="pi pi-times"
                     class="p-button-text"
                     @click="deleteProductsDialog = false"/>
          <pv-button :label="'Yes'.toUpperCase()" icon="pi pi-check"
                     class="p-button-text"
                     @click="deleteSelectedProducts"/>
        </template>
      </pv-dialog>


    </div>
  </div>
</template>

<script>
import {PatientsApiService} from "../services/patients-api.service.js";
import {FilterMatchMode} from "primevue/api";

export default {
  name: "patient-list",
  title: "Patients",
  data() {
    return {
      patients: [],
      patientDialog: false,
      deletePatientDialog: false,
      deletePatientsDialog: false,
      patient: {},
      selectedPatients: null,
      filters: {},
      submitted: false,
      statuses: [
        {label: "Published", value: "published"},
        {label: "Unpublished", value: "unpublished"},
      ],
      patientsService: null,
    };

  },
  created() {
    this.patientsService = new PatientsApiService();
    this.initFilters();
    this.patientsService.getAll().then((response) => {
      this.patients = response.data.map((patient) =>
          this.getDisplayablePatient(patient));
      console.log(response);
    });
    console.log(this.patients);
    this.initFilters();
  },

  methods: {
    getDisplayablePatient(patient) {
      patient.status = patient.published
          ? this.statuses[0].label
          : this.statuses[1].label;
      return patient;
    },
    getStorablePatient(displayablePatient) {
      return {
        id: displayablePatient.id,
        code: displayablePatient.code,
        firstname: displayablePatient.title,
        lastname: displayablePatient.title,
        gender: displayablePatient.gender,
        description: displayablePatient.description,
        phone: displayablePatient.phone,
        email: displayablePatient.email,
        birthdate: displayablePatient.birthdate,
        appointment: displayablePatient.appointment,
        record: displayablePatient.record,
      }
    },
    openNew() {
      this.patient = {};
      this.submitted = false;
      this.patientDialog = true;
    },
    hideDialog() {
      this.patientDialog = false;
      this.submitted = false;
    },
    findIndexById(id) {
      console.log(`current id is ${id}`);
      return this.patients
          .findIndex((patient) => patient.id === id);
    },
    saveTutorial() {
      this.submitted = true;
      if (this.patient.title.trim()) {
        if (this.patient.id) {
          console.log(this.patient);
          this.patient = this.getStorablePatient(this.patient);
          this.patientsService
              .update(this.patient.id, this.patient)
              .then((response) => {
                console.log(response.data.id);
                this.patient[this.findIndexById(response.data.id)] =
                    this.getDisplayablePatient(response.data);
                this.$toast.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Patient Updated",
                  life: 3000,
                });
                console.log(response);
              });
        } else {
          this.patient.id = 0;
          this.patient = this.getStorablePatient(this.patient);
          this.patientsService.create(this.patient).then((response) => {
            this.patient = this.getDisplayablePatient(response.data);
            this.patients.push(this.getDisplayablePatient(this.patient));
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Patient Created",
              life: 3000,
            });
            console.log(response);
          });
        }
        this.patientDialog = false;
        this.patient = {};
      }

    },
    editPatient(patient) {
      console.log(patient);
      this.patient = {...patient};
      console.log(this.patient);
      this.patientDialog = true;
    },
    confirmDeletePatient(patient) {
      this.patient = patient;
      this.deletePatientDialog = true;
    },

    deletePatient() {
      this.patientsService.delete(this.patient.id)
          .then((response) => {
            this.patients = this.patient.filter(
                (t) => t.id !== this.patient.id
            );
            this.deletePatientDialog = false;
            this.patient = {};
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Patient Deleted",
              life: 3000,
            });
            console.log(response);
          });
    },

    exportToCsv() {
      this.$refs.dt.exportToCsv();
    },

    confirmDeleteSelected() {
      this.deletePatientDialog = true;
    },

    deleteSelectedPatients() {
      this.selectedPatients.forEach((patient) => {
        this.patientsService.delete(patient.id).then((response) => {
          this.patients = this.patient.filter((t) => t.id !== this.patient.id);
          console.log(response);
        });
      });
      this.deletePatientDialog = false;
    },

    initFilters() {
      this.filters = {global: {value: null, matchMode: FilterMatchMode.CONTAINS}};
    }

  }
}
</script>

<style scoped>

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 960px) {
  :deep(.p-toolbar) {
    flex-wrap: wrap;

  }

}
</style>