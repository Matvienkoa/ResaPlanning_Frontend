<template>
  <div class="add-back">
    <div class="add-box">
        <img @click="closeDeleteBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Supprimer ce compte collaborateur?</h2>
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
.box-choice-button{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 20px;
}
.valid-button{
  margin: 0 10px;
  width: 70px;
  height: 35px;
  border-radius: 30px;
  background: rgb(198,238,0);
  color: white;
  font-size: 1.1em;
  border: solid 2px rgb(198,238,0);
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.delete-button{
  margin: 0 10px;
  width: 70px;
  height: 35px;
  border-radius: 30px;
  background: red;
  color: white;
  font-size: 1.1em;
  border: solid 2px red;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>