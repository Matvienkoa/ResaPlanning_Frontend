<template>
    <div class="prepR-back">
        <div class="prepR-box">
            <img crossorigin="anonymous" @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <h2 class="get-box-title">Nouvelle demande de préparation</h2>
            <div class="prepR-customer-box">
                <p>Client : {{getPrepRequest.company}} {{getPrepRequest.firstName}} {{getPrepRequest.lastName}}</p>
                <p>Adresse : {{getPrepRequest.adress}} {{getPrepRequest.adress2}} {{getPrepRequest.zipCode}} {{getPrepRequest.city}}</p>
                <p>Contact : {{getPrepRequest.phone}} {{getPrepRequest.mail}}</p>
            </div>
            <div class="prepR-infos-box">
                <p>Date de livraison souhaitée : {{moment(getPrepRequest.deliveryDate).format('LL')}}</p>
                <p>Marque : {{getPrepRequest.brand}}</p>
                <p>Modèle : {{getPrepRequest.model}}</p>
                <p>Année : {{getPrepRequest.year}}</p>
                <p>Etat : {{getPrepRequest.condition}}</p>
                <p>Immatriculation : {{getPrepRequest.immat}}</p>
                <p>KM : {{getPrepRequest.kilomter}}</p>
                <p>Préparations souhaitées : {{getPrepRequest.steps}}</p>
                <p>Observations client : {{getPrepRequest.observationsCustomer}}</p>
            </div>
            <div class="add-preparation-form">
                <label class="form-label" for="preparation-form-startDate">Date de début<span class="star">*</span></label>
                <input class="form-input required" v-model="startDate" @input="cancelError()" type="date" name="preparation-form-startDate" id="preparation-form-startDate">
                <label class="form-label" for="preparation-form-endDate">Date de fin<span class="star">*</span></label>
                <input class="form-input required" v-model="endDate" @input="cancelError()" type="date" name="preparation-form-endDate" id="preparation-form-endDate">
                <label class="form-label" for="preparation-form-startTime">Heure de début<span class="star">*</span></label>
                <input class="form-input required" v-model="startTime" @input="cancelError()" type="time" name="preparation-form-startTime" id="preparation-form-startTime">
                <label class="form-label" for="preparation-form-endTime">Heure de fin<span class="star">*</span></label>
                <input class="form-input required" v-model="endTime" @input="cancelError()" type="time" name="preparation-form-endTime" id="preparation-form-endTime">
                <label class="form-label" for="vehicle-form-observations">Observations</label>
                <input class="form-input" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
                <label class="form-label" for="vehicle-form-steps">Ajouter une étape de préparation</label>
                <input class="form-input" @input="cancelErrorPrestation()" v-model="prestation" type="text" name="vehicle-form-steps" id="vehicle-form-steps">
                <div v-if="errorPrestation" class="error">{{ errorPrestation }}</div>
                <button class="add-presta-button" @click="addStep()">Ajouter la prestation</button>
                <div class="prestas-box">
                    <div class="presta-box" v-for="step in steps" :key="step">
                        {{step}}
                        <img crossorigin="anonymous" class="presta-icon" src="../assets/Icons/presta.svg" @click="deleteStep(step)" alt=""/>
                    </div>
                </div>
                <div v-if="error" class="error">{{ error.message }}</div>
                <button class="add-button" @click="addPreparation()">Créer la préparation</button>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'AdminGetPrepRequest',
    props: ['id'],
    data() {
        return {
            moment: moment,
            error: "",
            errorPrestation: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            observationsDepot: "",
            prestation: "",
            steps: [],
        }
    },
    computed: {
        ...mapGetters(['getPrepRequest'])
    },
    methods: {
        closeEditBox() {
            this.$store.state.editBox = "closed"
        },
        addStep() {
            if(this.prestation !== "") {
                const index = this.steps.findIndex(s => s === this.prestation)
                if(index === -1) {
                this.steps.push(this.prestation);
                this.prestation = "";
                } else {
                this.errorPrestation = "Cette prestation est déjà présente";
                }
            } else {
                this.errorPrestation = "Merci d'ajouter une prestation";
                const prestationInput = document.getElementById('vehicle-form-steps');
                prestationInput.classList.add('empty');
            }
        },
        deleteStep(step) {
            const index = this.steps.findIndex(s => s === step)
            if(index !== -1) {
                this.steps.splice(index, 1)
            }
        },
        addPreparation() {
            instance.post('/preparation/', {
                brand: this.getPrepRequest.brand,
                model: this.getPrepRequest.model,
                year: this.getPrepRequest.year,
                immat: this.getPrepRequest.immat,
                kilometer: this.getPrepRequest.kilometer,
                condition: this.getPrepRequest.condition,
                observationsCustomer: this.getPrepRequest.observationsCustomer,
                observationsDepot: this.observationsDepot,
                customerId: this.getPrepRequest.customerId,
                startDate: this.startDate,
                endDate: this.endDate,
                startTime: this.startTime,
                endTime: this.endTime,
                steps: this.steps
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$store.commit('ADD_PREPARATION_TO_EVENTS_PLANNING', res.data)
                    instance.put(`/preprequest/validate/${this.id}`)
                    .then((res) => {
                        if(res.status === 201) {
                            this.$store.dispatch('getRequestsPending')
                            this.closeEditBox()
                        }
                    })
                }
            })
            .catch((error) => {
                this.error = error.response.data;
                const emptyInput = document.querySelectorAll('.required');
                emptyInput.forEach(input => {
                    if(input.value === "") {
                        input.classList.add('empty')
                    }
                })
            })
        },
        cancelErrorPrestation() {
            const prestationInput = document.getElementById('vehicle-form-steps')
            if(prestationInput.value !== "") {
                prestationInput.classList.remove('empty')
            }
            this.errorPrestation = ''
        },
        cancelError() {
            const emptyInput = document.querySelectorAll('.required');
            emptyInput.forEach(input => {
                if(input.value !== "") {
                    input.classList.remove('empty')
                }
            })
            this.error = ''
        },
    },
    created: function () {
        this.$store.dispatch('getPrepRequest', this.id)
    },
}
</script>

<style>
.prepR-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.prepR-box{
  position: relative;
  width: 100%;
  max-width: 600px;
  min-height: 90%;
  max-height: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  z-index: 10;
  border-radius: 10px;
}
.prepR-customer-box{
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: rgb(236, 236, 236);
  padding: 0.4em 0;
  border-radius: 10px;
  margin-bottom: 20px;
}
.prepR-customer-box p{
  margin-left: 10px;
  margin-right: 10px;
}
.prepR-infos-box{
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: rgb(240, 240, 240);
    padding: 0.4em 0;
    border-radius: 10px;
    margin-bottom: 20px;
}
.prepR-infos-box p{
  margin-left: 10px;
  margin-right: 10px;
}
.add-preparation-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>

<style scoped>
.get-box-title{
  text-align: start;
  width: 90%;
  border-bottom: 3px solid #c0c0c0;
  padding-bottom: 5px;
}
</style>