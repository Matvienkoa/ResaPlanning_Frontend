<template>
    <div class="prepR-back">
        <div class="prepR-box">
            <img crossorigin="anonymous" @click="closeDeleteBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <h2 class="get-box-title">Refuser la demande de préparation</h2>
            <div class="prepR-customer-box">
                <p>Client : {{getPrepRequest.company}} {{getPrepRequest.firstName}} {{getPrepRequest.lastName}}</p>
                <p>Adresse : {{getPrepRequest.adress}} {{getPrepRequest.adress2}} {{getPrepRequest.zipCode}} {{getPrepRequest.city}}</p>
                <p>Contact : {{getPrepRequest.phone}} {{getPrepRequest.mail}}</p>
            </div>
            <div class="prepR-infos-box">
                <p>Date de livraison souhaitée : {{moment(getPrepRequest.deliveryDate).format('LL')}}</p>
                <p v-if="getPrepRequest.brand">Marque : {{getPrepRequest.brand}}</p>
                <p v-if="!getPrepRequest.brand">Marque : Non renseigné</p>
                <p v-if="getPrepRequest.model">Modèle : {{getPrepRequest.model}}</p>
                <p v-if="!getPrepRequest.model">Modèle : Non renseigné</p>
                <p v-if="getPrepRequest.year">Année : {{getPrepRequest.year}}</p>
                <p v-if="!getPrepRequest.year">Année : Non renseigné</p>
                <p v-if="getPrepRequest.condition">Etat : {{getPrepRequest.condition}}</p>
                <p v-if="!getPrepRequest.condition">Etat : Non renseigné</p>
                <p v-if="getPrepRequest.immat">Immatriculation / N° de série : {{getPrepRequest.immat}}</p>
                <p v-if="!getPrepRequest.immat">Immatriculation / N° de série : Non renseigné</p>
                <p v-if="getPrepRequest.kilometer">KM : {{getPrepRequest.kilometer}}</p>
                <p v-if="!getPrepRequest.kilometer">KM : Non renseigné</p>
                <p v-if="getPrepRequest.steps">Préparations souhaitées : {{getPrepRequest.steps}}</p>
                <p v-if="!getPrepRequest.steps">Préparations souhaitées : Non renseigné</p>
                <p v-if="getPrepRequest.observationsCustomer">Observations client : {{getPrepRequest.observationsCustomer}}</p>
                <p v-if="!getPrepRequest.observationsCustomer">Observations client : Non renseigné</p>
            </div>
            <div v-if="getPrepRequest.photo" class="prepR-photo-box">
                <img crossorigin="anonymous" :src="getPrepRequest.photo" alt="" class="prepR-photo">
            </div>
            <div class="add-preparation-form">
                <label class="form-label" for="vehicle-form-observations">Motifs du refus<span class="star">*</span></label>
                <input class="form-input required" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
                <div v-if="error" class="error">{{ error.message }}</div>
                <button class="add-button" @click="refusePrepRequest()">Refuser la demande</button>
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
    name: 'AdminRefusePrepRequest',
    props: ['id'],
    data() {
        return {
            moment: moment,
            error: "",
            observationsDepot: ""
        }
    },
    computed: {
        ...mapGetters(['getPrepRequest'])
    },
    methods: {
        closeDeleteBox() {
            this.$store.state.deleteBox = "closed"
        },
        refusePrepRequest() {
            instance.put(`/preprequest/refuse/${this.id}`, {
                observationsDepot: this.observationsDepot
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$store.dispatch('getRequestsPending')
                    this.closeDeleteBox()
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
        }
    },
    created: function () {
        this.$store.dispatch('getPrepRequest', this.id)
    },
}
</script>

<style>

</style>