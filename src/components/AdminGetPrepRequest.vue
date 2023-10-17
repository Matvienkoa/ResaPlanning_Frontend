<template>
    <div class="prepR-back">
        <div class="prepR-box">
            <img crossorigin="anonymous" @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <h2 class="get-box-title">Nouvelle demande de préparation</h2>
            <div class="prepR-customer-box">
                <p>Client : <span class="info-bold">{{getPrepRequest.company}} {{getPrepRequest.firstName}} {{getPrepRequest.lastName}}</span></p>
                <p>Adresse : <span class="info-bold">{{getPrepRequest.adress}} {{getPrepRequest.adress2}} {{getPrepRequest.zipCode}} {{getPrepRequest.city}}</span></p>
                <p>Contact : <span class="info-bold">{{getPrepRequest.phone}} {{getPrepRequest.mail}}</span></p>
            </div>
            <div class="prepR-infos-box">
                <p>Date de livraison souhaitée : <span class="info-bold">{{moment(getPrepRequest.deliveryDate).format('LL')}}</span></p>
                <p v-if="getPrepRequest.brand">Marque : <span class="info-bold">{{getPrepRequest.brand}}</span></p>
                <p v-if="!getPrepRequest.brand">Marque : Non renseigné</p>
                <p v-if="getPrepRequest.model">Modèle : <span class="info-bold">{{getPrepRequest.model}}</span></p>
                <p v-if="!getPrepRequest.model">Modèle : Non renseigné</p>
                <p v-if="getPrepRequest.year">Année : <span class="info-bold">{{getPrepRequest.year}}</span></p>
                <p v-if="!getPrepRequest.year">Année : Non renseigné</p>
                <p v-if="getPrepRequest.condition">Etat : <span class="info-bold">{{getPrepRequest.condition}}</span></p>
                <p v-if="!getPrepRequest.condition">Etat : Non renseigné</p>
                <p v-if="getPrepRequest.immat">Immatriculation / N° de série : <span class="info-bold">{{getPrepRequest.immat}}</span></p>
                <p v-if="!getPrepRequest.immat">Immatriculation / N° de série : Non renseigné</p>
                <p v-if="getPrepRequest.kilometer">KM : <span class="info-bold">{{getPrepRequest.kilometer}}</span></p>
                <p v-if="!getPrepRequest.kilometer">KM : Non renseigné</p>
                <p v-if="getPrepRequest.steps">Prestations souhaitées : <span class="info-bold">{{getPrepRequest.steps}}</span></p>
                <p v-if="!getPrepRequest.steps">Prestations souhaitées : Non renseigné</p>
                <p v-if="getPrepRequest.observationsCustomer">Observations client : <span class="info-bold">{{getPrepRequest.observationsCustomer}}</span></p>
                <p v-if="!getPrepRequest.observationsCustomer">Observations client : Non renseigné</p>
            </div>
            <div v-if="getPrepRequest.photo" class="prepR-photo-box">
                <img crossorigin="anonymous" :src="getPrepRequest.photo" alt="" class="prepR-photo">
            </div>
            <div class="add-preparation-form">
                <label class="form-label" for="preparation-form-startDate">Date de début<span class="star">*</span></label>
                <input class="form-input required" v-model="startDate" @input="cancelError()" type="date" name="preparation-form-startDate" id="preparation-form-startDate">
                <label class="form-label" for="preparation-form-endDate">Date de fin<span class="star">*</span></label>
                <input class="form-input required" v-model="endDate" @input="cancelError()" type="date" name="preparation-form-endDate" id="preparation-form-endDate">
                <label class="form-label" for="preparation-form-startTime">Heure de début<span class="star">*</span></label>
                <input class="form-input required" v-model="startTime" @input="cancelError()" type="time" name="preparation-form-startTime" id="preparation-form-startTime">
                <label class="form-label" for="preparation-form-endTime">Heure de fin</label>
                <input class="form-input" v-model="endTime" @input="cancelError()" type="time" name="preparation-form-endTime" id="preparation-form-endTime">
                <label class="form-label" for="preparation-form-brand">Marque<span class="star">*</span></label>
                <input class="form-input required" v-model="brand" @input="cancelError()" type="text" name="preparation-form-brand" id="preparation-form-brand">
                <label class="form-label" for="preparation-form-model">Modèle<span class="star">*</span></label>
                <input class="form-input required" v-model="model" @input="cancelError()" type="text" name="preparation-form-model" id="preparation-form-model">
                <label class="form-label" for="preparation-form-immat">Immatriculation<span class="star">*</span></label>
                <p class="form-password-infos">Ou numéro de série du véhicule</p>
                <input class="form-input required" v-model="immat" @input="cancelError()" type="text" name="preparation-form-immat" id="preparation-form-immat">
                <label class="form-label" for="preparation-form-year">Année<span class="star">*</span></label>
                <input class="form-input required" v-model="year" @input="cancelError()" type="text" name="preparation-form-year" id="preparation-form-year">
                <label class="form-label" for="preparation-form-kilometers">Km<span class="star">*</span></label>
                <input class="form-input required" v-model="kilometer" @input="cancelError()" type="text" name="preparation-form-kilometers" id="preparation-form-kilometers">
                <label class="form-label" for="preparation-form-condition">Etat du véhicule<span class="star">*</span></label>
                <input class="form-input required" v-model="condition" @input="cancelError()" type="text" name="preparation-form-condition" id="preparation-form-condition">
                <label class="form-label" for="vehicle-form-observations">Observations</label>
                <input class="form-input" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
                <label class="form-label" for="vehicle-form-steps">Ajouter une prestation</label>
                <input class="form-input" @input="cancelErrorPrestation()" v-model="prestation" type="text" name="vehicle-form-steps" id="vehicle-form-steps">
                <div v-if="errorPrestation" class="error error-step">{{ errorPrestation }}</div>
                <button class="add-presta-button" @click="addStep()">Ajouter la prestation</button>
                <div class="prestas-box">
                    <div class="presta-box" v-for="step in steps" :key="step">
                        {{step}}
                        <img crossorigin="anonymous" class="presta-icon" src="../assets/Icons/presta.svg" @click="deleteStep(step)" alt=""/>
                    </div>
                </div>
                <label class="form-label" for="vehicle-form-maker">Préparation attribuée à :</label>
                <input class="form-input" v-model="maker" type="text" name="vehicle-form-maker" id="vehicle-form-maker">
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
            startTime: "09:00",
            endTime: "",
            observationsDepot: "",
            prestation: "",
            steps: [],
            brand: "",
            model: "",
            immat: "",
            year: "",
            kilometer: "",
            condition: "",
            maker: ""
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
                brand: this.brand,
                model: this.model,
                year: this.year,
                immat: this.immat,
                kilometer: this.kilometer,
                condition: this.condition,
                observationsCustomer: this.getPrepRequest.observationsCustomer,
                observationsDepot: this.observationsDepot,
                customerId: this.getPrepRequest.customerId,
                startDate: this.startDate,
                endDate: this.endDate,
                startTime: this.startTime,
                endTime: this.endTime,
                steps: this.steps,
                maker: this.maker
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
        .then((res) => {
            this.brand = res.data.brand
            this.model = res.data.model
            this.immat = res.data.immat
            this.year = res.data.year
            this.condition = res.data.condition
            this.kilometer = res.data.kilometer
        })
    },
}
</script>

<style>
.prepR-back{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.prepR-box{
  position: relative;
  width: 95%;
  max-width: 800px;
  min-height: 30%;
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
    font-family: 'catamaran', sans-serif;
    font-size: 1.2em;
    line-height: 1.2em;
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: rgb(245, 245, 245);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    padding: 0.4em 0;
    border-radius: 10px;
    margin-bottom: 20px;
}
.prepR-customer-box p{
  margin-left: 10px;
  margin-right: 10px;
}
.prepR-infos-box{
    font-family: 'catamaran', sans-serif;
    font-size: 1.2em;
    line-height: 1.2em;
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: rgb(245, 245, 245);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    padding: 0.4em 0;
    border-radius: 10px;
    margin-bottom: 20px;
}
.prepR-infos-box p{
  margin-left: 10px;
  margin-right: 10px;
}
.info-bold{
    font-weight: 600;
}
.prepR-photo-box{
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4em 0;
    border-radius: 10px;
    margin-bottom: 20px;
}
.prepR-photo{
    width: 80%;
    height: 80%;
    object-fit: contain;
    border-radius: 10px;
}
.add-preparation-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>

<style scoped>
.prestas-box{
    margin-bottom: 20px;
}
</style>