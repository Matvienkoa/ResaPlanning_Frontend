<template>
    <div class="add-back">
        <div class="add-box">
            <h2 class="add-box-title">Modifier les horaires de préparation?</h2>
            <div class="drop-actual">Horaires actuels : du {{moment(start).format('LLLL')}} au {{moment(end).format('LLLL')}}</div>
            <div class="drop-new">Nouveaux horaires : du {{moment(start).format('LLLL')}} au {{newEnd}}</div>
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
                <button class="valid-button" @click="sizePreparation()">Oui</button>
                <button class="delete-button" @click="closeSizeBox()">Non</button>
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
    name: 'AdminSizePreparation',
    props: ['id', 'deltaD', 'deltaM'],
    data() {
        return {
            moment: moment,
            error: "",
            start: "",
            end: "",
            preparation: ""
        }
    },
    computed: {
        ...mapGetters(['getSizeBox', 'getPreparation']),
        newEnd() {
            let newEnd = moment(this.end).add(this.deltaD, 'days').add(this.deltaM, 'milliseconds').format('LLLL')
            return newEnd
        }
    },
    methods: {
        closeSizeBox() {
            this.$store.commit('EDIT_PREPARATION_TO_EVENTS_PLANNING', this.preparation)
            this.$store.state.sizeBox = "closed"
        },
        sizePreparation() {
            instance.put(`/preparation/size/${this.id}`, {
                deltaD: this.deltaD,
                deltaM: this.deltaM
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$store.commit('EDIT_PREPARATION_TO_EVENTS_PLANNING', res.data)
                    this.$store.state.sizeBox = "closed"
                }
            })
            .catch((error) => {
                this.error = error.response.data;
            })
        }
    },
    created: function () {
        this.$store.dispatch('getPreparation', this.id)
        .then((res) => {
            this.preparation = res.data
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