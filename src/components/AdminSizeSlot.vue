<template>
    <div class="add-back">
        <div class="add-box">
            <h2 class="add-box-title">Voulez vous vraiment modifier ce créneau?</h2>
            <div class="drop-actual">Créneau actuel : du {{moment(start).format('LLLL')}} au {{moment(end).format('LLLL')}}</div>
            <div class="drop-new">Nouveau créneau : du {{moment(start).format('LLLL')}} au {{newEnd}}</div>
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
                <button class="valid-button" @click="sizeSlot()">Oui</button>
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
    name: 'AdminSizeSlot',
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
        ...mapGetters(['getSizeBox', 'getSlot']),
        newEnd() {
            let newEnd = moment(this.end).add(this.deltaD, 'days').add(this.deltaM, 'milliseconds').format('LLLL')
            return newEnd
        }
    },
    methods: {
        closeSizeBox() {
            this.$store.commit('EDIT_SLOT_TO_EVENTS_PLANNING', this.slot)
            this.$store.state.sizeBox = "closed"
        },
        sizeSlot() {
            instance.put(`/slot/size/${this.id}`, {
                deltaD: this.deltaD,
                deltaM: this.deltaM
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$store.commit('EDIT_SLOT_TO_EVENTS_PLANNING', res.data)
                    this.$store.state.sizeBox = "closed"
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
            console.log(res.data)
            this.slot = res.data
            this.start = res.data.start
            this.end = res.data.end
        })
    },
}
</script>