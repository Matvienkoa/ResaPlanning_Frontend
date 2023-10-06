<template>
    <div class="add-back">
        <div class="add-box">
            <h2 class="add-box-title">Déplacer ce créneau?</h2>
            <div class="drop-actual">Date actuelle : du {{moment(start).format('LLLL')}} au {{moment(end).format('LLLL')}}</div>
            <div class="drop-new">Nouvelle date : du {{newStart}} au {{newEnd}}</div>
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
                <button class="valid-button" @click="dropSlot()">Oui</button>
                <button class="delete-button" @click="closeDropBox()">Non</button>
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
    name: 'AdminDropSlot',
    props: ['id', 'deltaD', 'deltaM'],
    data() {
        return {
            moment: moment,
            error: "",
            start: "",
            end: "",
            slot: ""
        }
    },
    computed: {
        ...mapGetters(['getDropBox', 'getSlot']),
        newStart() {
            let newStart = moment(this.start).add(this.deltaD, 'days').add(this.deltaM, 'milliseconds').format('LLLL')
            return newStart
        },
        newEnd() {
            let newEnd = moment(this.end).add(this.deltaD, 'days').add(this.deltaM, 'milliseconds').format('LLLL')
            return newEnd
        }
    },
    methods: {
        closeDropBox() {
            this.$store.commit('EDIT_SLOT_TO_EVENTS_PLANNING', this.slot)
            this.$store.state.dropBox = "closed"
        },
        dropSlot() {
            instance.put(`/slot/drop/${this.id}`, {
                deltaD: this.deltaD,
                deltaM: this.deltaM
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$store.commit('EDIT_SLOT_TO_EVENTS_PLANNING', res.data)
                    this.$store.state.dropBox = "closed"
                }
            })
            .catch((error) => {
                this.error = error.response.data;
            })
        }
    },
    created: function () {
        this.$store.dispatch('getSlot', this.id)
        .then((res) => {
            this.slot = res.data
            this.start = res.data.start
            this.end = res.data.end
        })
    },
}
</script>

<style scoped>
.add-box{
  position: relative;
  width: 95%;
  max-width: 600px;
  min-height: 50%;
  max-height: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 7;
  border-radius: 10px;
}
</style>