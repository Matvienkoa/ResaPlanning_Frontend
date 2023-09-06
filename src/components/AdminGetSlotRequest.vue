<template>
    <div class="slotR-back">
        <div class="slotR-box">
            <div @click="closeEditBox()" class="close-edit">X</div>
            <div>{{getSlotRequest.customerId}} {{getSlotRequest.observationsCustomer}}
                 {{getSlotRequest.date}} {{getSlotRequest.place}} {{getSlotRequest.duration}} 
            </div>
            <div class="add-preparation-box">
                <label for="preparation-form-startDate">Date de début</label>
                <input v-model="startDate" @input="cancelError()" type="date" name="preparation-form-startDate" id="preparation-form-startDate" class="required">
                <label for="preparation-form-endDate">Date de fin</label>
                <input v-model="endDate" @input="cancelError()" type="date" name="preparation-form-endDate" id="preparation-form-endDate" class="required">
                <label for="preparation-form-startTime">Heure de début</label>
                <input v-model="startTime" @input="cancelError()" type="time" name="preparation-form-startTime" id="preparation-form-startTime" class="required">
                <label for="preparation-form-endTime">Heure de fin</label>
                <input v-model="endTime" @input="cancelError()" type="time" name="preparation-form-endTime" id="preparation-form-endTime" class="required">
                <label for="vehicle-form-observations">Observations</label>
                <input v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
                <div v-if="error" class="error">{{ error.message }}</div>
                <button @click="addSlot()">Créer le créneaux</button>
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
    name: 'AdminGetSlotRequest',
    props: ['id'],
    data() {
        return {
            moment: moment,
            error: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            observationsDepot: ""
        }
    },
    computed: {
        ...mapGetters(['getSlotRequest'])
    },
    methods: {
        closeEditBox() {
            this.$store.state.editBox = "closed"
        },
        addSlot() {
            instance.post('/slot/', {
                observationsDepot: this.observationsDepot,
                customerId: this.getSlotRequest.customerId,
                startDate: this.startDate,
                endDate: this.endDate,
                startTime: this.startTime,
                endTime: this.endTime,
                place: this.getSlotRequest.place
            })
            .then((res) => {
                if(res.status === 201) {
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
            console.log(res)
        })
    },
}
</script>

<style>
.slotR-back{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}
.slotR-box{
  position: relative;
  width: 100%;
  min-height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  z-index: 6;
}
.close-edit{
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}

.add-preparation-box{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>