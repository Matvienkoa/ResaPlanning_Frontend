<template>
    <div class="prepR-back">
        <div class="prepR-box">
            <img crossorigin="anonymous" @click="closeDeleteBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <h2 class="get-box-title">Refuser la demande de créneau</h2>
            <div class="prepR-customer-box">
                <p>Client : <span class="info-bold">{{getSlotRequest.company}} {{getSlotRequest.firstName}} {{getSlotRequest.lastName}}</span></p>
                <p>Adresse : <span class="info-bold">{{getSlotRequest.adress}} {{getSlotRequest.adress2}} {{getSlotRequest.zipCode}} {{getSlotRequest.city}}</span></p>
                <p>Contact : <span class="info-bold">{{getSlotRequest.phone}} {{getSlotRequest.mail}}</span></p>
            </div>
            <div class="prepR-infos-box">
                <p>Date souhaitée : <span class="info-bold">{{moment(getSlotRequest.date).format('LL')}}</span></p>
                <p>Lieux de la prestation : <span class="info-bold">{{getSlotRequest.place}}</span></p>
                <p>Durée de l'intervention : <span class="info-bold">{{checkDuration(getSlotRequest.duration)}}</span></p>
                <p>Observations client : <span class="info-bold">{{getSlotRequest.observationsCustomer}}</span></p>
            </div>
            <div class="add-preparation-form">
                <label class="form-label" for="vehicle-form-observations">Motifs du refus<span class="star">*</span></label>
                <input class="form-input required" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
                <div v-if="error" class="error">{{ error.message }}</div>
                <button class="add-button" @click="refuseSlotRequest()">Refuser la demande</button>
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
    name: 'AdminRefuseSlotRequest',
    props: ['id'],
    data() {
        return {
            moment: moment,
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
        this.$store.dispatch('getSlotRequest', this.id)
    },
}
</script>

<style>

</style>