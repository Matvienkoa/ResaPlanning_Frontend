<template>
    <div class="slotR-back">
        <div class="slotR-box">
            <div>{{getSlotRequest.customerId}} {{getSlotRequest.observationsCustomer}}
                 {{getSlotRequest.date}} {{getSlotRequest.place}} {{getSlotRequest.duration}} 
            </div>
            <p>Refuser la demande?</p>
            <label for="vehicle-form-observations">Motifs du refus</label>
            <input v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
            <button @click="refuseSlotRequest()">Refuser la demande</button>
            <button @click="closeDeleteBox()">Annuler</button>
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
.close-delete{
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}


</style>