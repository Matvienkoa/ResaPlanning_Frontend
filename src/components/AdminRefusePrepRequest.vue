<template>
    <div class="prepR-back">
        <div class="prepR-box">
            <div>{{getPrepRequest.customerId}} {{getPrepRequest.brand}} {{getPrepRequest.model}} {{getPrepRequest.year}}
                {{getPrepRequest.immat}} {{getPrepRequest.kilometer}} {{getPrepRequest.observationsCustomer}} {{getPrepRequest.deliveryDate}}
            </div>
            <div>{{getPrepRequest.steps}}</div>
            <p>Refuser la demande?</p>
            <label for="vehicle-form-observations">Motifs du refus</label>
            <input v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
            <button @click="refusePrepRequest()">Refuser la demande</button>
            <button @click="closeDeleteBox()">Annuler</button>
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
.close-delete{
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}


</style>