<template>
    <div class="prepR-back">
        <div class="prepR-box">
            <img @click="closeDeleteBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <h2 class="get-box-title">Refuser la demande de créneau</h2>
            <div class="prepR-infos-box">
                <p>Société : {{getSlotRequest.company}}</p>
                <p>Prénom : {{getSlotRequest.firstName}}</p>
                <p>Nom : {{getSlotRequest.lastName}}</p>
                <p>Adresse : {{getSlotRequest.adress}} {{getSlotRequest.adress2}} {{getSlotRequest.zipCode}} {{getSlotRequest.city}}</p>
                <p>Contact : {{getSlotRequest.phone}} {{getSlotRequest.mail}}</p>

                <p>Date souhaitée : {{getSlotRequest.date}}</p>
                <p>Durée de l'intervention : {{checkDuration(getSlotRequest.duration)}}</p>
                <p>Lieux : {{getSlotRequest.place}}</p>
                <p>Observations client : {{getSlotRequest.observationsCustomer}}</p>
            </div>
            <div class="add-preparation-form">
                <label class="form-label" for="vehicle-form-observations">Motifs du refus</label>
                <input class="form-input" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
                <div v-if="error" class="error">{{ error.message }}</div>
                <button class="add-button" @click="refuseSlotRequest()">Refuser la demande</button>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
    name: 'AdminRefuseSlotRequest',
    props: ['id'],
    data() {
        return {
            error: "",
            observationsDepot: ""
        }
    },
    computed: {
        ...mapGetters(['getSlotRequest'])
    },
    methods: {
        checkDuration(duration) {
            let dur = "";
            if(duration === "half") {
                dur = '1/2 Journée'
            } else {
                dur = 'Journée entière'
            }
            return dur
        },
        closeDeleteBox() {
            this.$store.state.deleteBox = "closed"
        },
        refuseSlotRequest() {
            instance.put(`/slotrequest/refuse/${this.id}`, {
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
        this.$store.dispatch('getSlotRequest', this.id)
    },
}
</script>

<style>

</style>