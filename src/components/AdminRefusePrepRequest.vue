<template>
    <div class="prepR-back">
        <div class="prepR-box">
            <img @click="closeDeleteBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <h2 class="get-box-title">Refuser la demande de préparation</h2>
            <div class="prepR-infos-box">
                <p>Société : {{getPrepRequest.company}}</p>
                <p>Prénom : {{getPrepRequest.firstName}}</p>
                <p>Nom : {{getPrepRequest.lastName}}</p>
                <p>Adresse : {{getPrepRequest.adress}} {{getPrepRequest.adress2}} {{getPrepRequest.zipCode}} {{getPrepRequest.city}}</p>
                <p>Contact : {{getPrepRequest.phone}} {{getPrepRequest.mail}}</p>

                <p>Marque : {{getPrepRequest.brand}}</p>
                <p>Modèle : {{getPrepRequest.model}}</p>
                <p>Année : {{getPrepRequest.year}}</p>
                <p>Etat : {{getPrepRequest.condition}}</p>
                <p>Immatriculation : {{getPrepRequest.immat}}</p>
                <p>KM : {{getPrepRequest.kilomter}}</p>
                <p>Observations client : {{getPrepRequest.observationsCustomer}}</p>
                <p>Date de livraison souhaitée : {{getPrepRequest.deliveryDate}}</p>
                <p>Préparations souhaitées : {{getPrepRequest.steps}}</p>
            </div>
            <div class="add-preparation-form">
                <label class="form-label" for="vehicle-form-observations">Motifs du refus</label>
                <input class="form-input" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
                <div v-if="error" class="error">{{ error.message }}</div>
                <button class="add-button" @click="refusePrepRequest()">Refuser la demande</button>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
    name: 'AdminRefusePrepRequest',
    props: ['id'],
    data() {
        return {
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
        }
    },
    created: function () {
        this.$store.dispatch('getPrepRequest', this.id)
    },
}
</script>

<style>

</style>