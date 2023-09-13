<template>
  <div class="add-back">
    <div class="add-box">
        <img @click="closeDeleteBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Supprimer ce client?</h2>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="box-choice-button">
            <button class="valid-button" @click="deleteCustomer()">Oui</button>
            <button class="delete-button" @click="closeDeleteBox()">Non</button>
        </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axios';

export default {
    name: 'AdminDeleteCustomer',
    props: ["id"],
    data() {
        return {
            error: "",
        }
    },
    methods: {
        closeDeleteBox() {
            this.$store.state.deleteBox = "closed"
        },
        deleteCustomer() {
            instance.delete(`/customer/${this.id}`)
            .then((res) => {
                if(res.status === 200) {
                    this.$store.dispatch('getCustomers');
                    this.closeDeleteBox()
                }
            })
            .catch(() => {
                this.error = "Une erreur est survenue"
            })
        }
    },
}
</script>