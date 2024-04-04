<template>
    <div class="prepR-back">
        <div class="prepR-box">
            <img crossorigin="anonymous" @click="closeDeleteBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <h2 class="get-box-title">Refuser la demande de préparation</h2>
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
                <p v-if="getPrepRequest.immat">Immatriculation / N° de série : <span class="info-bold input-immat">{{getPrepRequest.immat}}</span></p>
                <p v-if="!getPrepRequest.immat">Immatriculation / N° de série : Non renseigné</p>
                <p v-if="getPrepRequest.kilometer">KM : <span class="info-bold">{{getPrepRequest.kilometer}}</span></p>
                <p v-if="!getPrepRequest.kilometer">KM : Non renseigné</p>
                <p v-if="getPrepRequest.steps">Préstations souhaitées : <span class="info-bold">{{getPrepRequest.steps}}</span></p>
                <p v-if="!getPrepRequest.steps">Préstations souhaitées : Non renseigné</p>
                <p v-if="getPrepRequest.observationsCustomer">Observations client : <span class="info-bold">{{getPrepRequest.observationsCustomer}}</span></p>
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