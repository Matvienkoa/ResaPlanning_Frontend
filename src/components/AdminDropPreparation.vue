<template>
    <div class="add-back">
        <div class="add-box">
            <h2 class="add-box-title">Voulez vous vraiment déplacer cette préparation?</h2>
            <div class="drop-actual">Créneau actuel : du {{moment(start).format('LLLL')}} au {{moment(end).format('LLLL')}}</div>
            <div class="drop-new">Nouveau créneau : du {{newStart}} au {{newEnd}}</div>
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
                <button class="valid-button" @click="dropPreparation()">Oui</button>
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
    name: 'AdminDropPreparation',
    props: ['id', 'deltaD', 'deltaM'],
    data() {
        return {
            moment: moment,
            error: "",
            start: "",
            end: ""
        }
    },
    computed: {
        ...mapGetters(['getDropBox', 'getPreparation']),
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
            this.$store.state.dropBox = "closed"
        },
        dropPreparation() {
            instance.put(`/preparation/drop/${this.id}`, {
                deltaD: this.deltaD,
                deltaM: this.deltaM
            })
            .then((res) => {
                if(res.status === 201) {
                    this.closeDropBox()
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
            console.log(res.data)
            this.start = res.data.start
            this.end = res.data.end
        })
    },
}
</script>

<style>
.drop-actual, .drop-new{
    width: 90%;
    margin-bottom: 10px;
}
</style>