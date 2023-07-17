<template>
  <div class="add-back">
    <div class="add-box">
        <div @click="closeDeleteBox()" class="close-add">X</div>
        <h2>Supprimer ce compte collaborateur?</h2>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="">
            <button @click="deleteAccount()">Oui</button>
            <button @click="closeDeleteBox()">Non</button>
        </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axios';

export default {
  name: 'AdminDeleteAccountEmployee',
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
    deleteAccount() {
        instance.delete(`/account/${this.id}`)
        .then((res) => {
            if(res.status === 200) {
                this.$store.commit('DELETE_ACCOUNT_EMPLOYEE', this.id)
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


<style>

</style>

<style scoped>

</style>