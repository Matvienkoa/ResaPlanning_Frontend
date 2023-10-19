<template>
    <div class="prepR-back">
        <div class="prepR-box">
            <img crossorigin="anonymous" @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <h2 class="get-box-title">Nouvelle demande de créneau</h2>
            <div class="prepR-customer-box">
                <p>Client : <span class="info-bold">{{getSlotRequest.company}} {{getSlotRequest.firstName}} {{getSlotRequest.lastName}}</span></p>
                <p>Adresse : <span class="info-bold">{{getSlotRequest.adress}} {{getSlotRequest.adress2}} {{getSlotRequest.zipCode}} {{getSlotRequest.city}}</span></p>
                <p>Contact : <span class="info-bold">{{getSlotRequest.phone}} {{getSlotRequest.mail}}</span></p>
            </div>
            <div class="prepR-infos-box">
                <p>Date souhaitée : <span class="info-bold">{{moment(getSlotRequest.date).format('LL')}}</span></p>
                <p>Lieux de la prestation : <span class="info-bold">{{getSlotRequest.place}}</span></p>
                <p>Durée de l'intervention : <span class="info-bold">{{checkDuration(getSlotRequest.duration)}}</span></p>
                <p v-if="getSlotRequest.observationsCustomer">Observations client : <span class="info-bold">{{getSlotRequest.observationsCustomer}}</span></p>
                <p v-if="!getSlotRequest.observationsCustomer">Observations client : non renseigné</p>
            </div>
            <div class="add-preparation-form">
                <label class="form-label" for="preparation-form-duration">Durée de l'intervention<span class="star">*</span></label>
                <select class="form-input required" @change="cancelError()" v-model="duration" name="preparation-form-duration" id="preparation-form-duration">
                    <option value="half">Demi-Journée</option>
                    <option value="day">Journée</option>
                </select>
                <label class="form-label">Date de début<span class="star">*</span></label>
                <VueDatePicker class="picker" v-model="startDate" locale="fr" :format="formatStart" :enable-time-picker="false" auto-apply month-name-format="long" select-text="Valider" cancel-text="Annuler" teleport-center input-class-name="required datepicker" @update:model-value="cancelError()" />
                <!-- <input class="form-input required" v-model="startDate" @input="cancelError()" type="date" name="preparation-form-startDate" id="preparation-form-startDate"> -->
                <label class="form-label">Date de fin<span class="star">*</span></label>
                <VueDatePicker class="picker" v-model="endDate" locale="fr" :format="formatEnd" :enable-time-picker="false" auto-apply month-name-format="long" select-text="Valider" cancel-text="Annuler" teleport-center input-class-name="required datepicker" @update:model-value="cancelError()" />
                <!-- <input class="form-input required" v-model="endDate" @input="cancelError()" type="date" name="preparation-form-endDate" id="preparation-form-endDate"> -->
                <label class="form-label">Heure de début<span class="star">*</span></label>
                <VueDatePicker class="picker" v-model="startTime" timePicker teleport-center select-text="Valider" cancel-text="Annuler" input-class-name="required datepicker" @update:model-value="cancelError()" />
                <!-- <input class="form-input required" v-model="startTime" @input="cancelError()" type="time" name="preparation-form-startTime" id="preparation-form-startTime"> -->
                <label class="form-label">Heure de fin</label>
                <VueDatePicker class="picker" v-model="endTime" timePicker teleport-center select-text="Valider" cancel-text="Annuler" input-class-name="datepicker" />
                <!-- <input class="form-input" v-model="endTime" @input="cancelError()" type="time" name="preparation-form-endTime" id="preparation-form-endTime"> -->
                <label class="form-label" for="vehicle-form-observations">Observations</label>
                <input class="form-input" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
                <label class="form-label" for="vehicle-form-maker">Créneau attribué à :</label>
                <input class="form-input" v-model="maker" type="text" name="vehicle-form-maker" id="vehicle-form-maker">
                <div v-if="error" class="error">{{ error.message }}</div>
                <button class="add-button" @click="addSlot()">Créer le créneau</button>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'AdminGetSlotRequest',
    props: ['id'],
    components: { 
        VueDatePicker 
    },
    setup() {
        const startDate = ref(null);
        const formatStart = (startDate) => {
            return moment(startDate).format('DD/MM/YYYY')
        }
        const endDate = ref(null);
        const formatEnd = (endDate) => {
            return moment(endDate).format('DD/MM/YYYY')
        }
        return {
            startDate,
            endDate,
            startTime: ref({
                hours: "9",
                minutes: "0"
            }),
            endTime: ref(null),
            formatStart,
            formatEnd
        }
    },
    data() {
        return {
            moment: moment,
            error: "",
            observationsDepot: "",
            maker: "",
            duration: ""
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
        closeEditBox() {
            this.$store.state.editBox = "closed"
        },
        addSlot() {
            instance.post('/slot/', {
                observationsDepot: this.observationsDepot,
                observationsCustomer: this.getSlotRequest.observationsCustomer,
                customerId: this.getSlotRequest.customerId,
                startDate: moment(this.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.endDate).format('YYYY-MM-DD'),
                startTime: this.startTime,
                endTime: this.endTime,
                place: this.getSlotRequest.place,
                maker: this.maker,
                duration: this.duration
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$store.commit('ADD_SLOT_TO_EVENTS_PLANNING', res.data)
                    instance.put(`/slotrequest/validate/${this.id}`)
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
        this.$store.dispatch('getSlotRequest', this.id)
        .then((res) => {
            this.startDate = moment(res.data.date).format('YYYY-MM-DD')
            this.endDate = moment(res.data.date).format('YYYY-MM-DD')
            this.duration = res.data.duration
        })
    },
}
</script>