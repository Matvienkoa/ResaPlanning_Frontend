<template>
  <div class="delete-back">
    <div class="delete-box">
        <h2 class="add-box-title">Supprimer ce compte d'accès client?</h2>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="box-choice-button">
            <button class="valid-button" @click="deleteAccount()">Oui</button>
            <button class="delete-button" @click="closeDeleteBox()">Non</button>
        </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axios';

export default {
  name: 'AdminDeleteAccountCustomer',
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
                this.$store.commit('DELETE_ACCOUNT_CUSTOMER', this.id)
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