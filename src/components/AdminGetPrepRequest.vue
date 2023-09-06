<template>
    <div class="prepR-back">
        <div class="prepR-box">
            <div @click="closeEditBox()" class="close-edit">X</div>
            <div>{{getPrepRequest.customerId}} {{getPrepRequest.brand}} {{getPrepRequest.model}} {{getPrepRequest.year}}
                {{getPrepRequest.immat}} {{getPrepRequest.kilometer}} {{getPrepRequest.observationsCustomer}} {{getPrepRequest.deliveryDate}}
            </div>
            <div>{{getPrepRequest.steps}}</div>
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
                <label for="vehicle-form-steps">Ajouter une étape de préparation</label>
                <input @input="cancelErrorPrestation()" v-model="prestation" type="text" name="vehicle-form-steps" id="vehicle-form-steps">
                <div v-if="errorPrestation" class="error">{{ errorPrestation }}</div>
                <button @click="addStep()">Ajouter la prestation</button>
                <div>
                <div v-for="step in steps" :key="step">{{step}}<div @click="deleteStep(step)">X</div></div>
                </div>
                <div v-if="error" class="error">{{ error.message }}</div>
                <button @click="addPreparation()">Créer la préparation</button>
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
            console.log(res)
        })
    },
}
</script>

<style>
.prepR-back{
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
.prepR-box{
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