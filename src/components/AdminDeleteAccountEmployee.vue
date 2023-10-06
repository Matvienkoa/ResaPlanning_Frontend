<template>
  <div class="delete-back">
    <div class="delete-box">
        <h2 class="add-box-title">Supprimer ce compte d'accès collaborateur?</h2>
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
.delete-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.808);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
}
.delete-box{
  position: relative;
  width: 70%;
  max-width: 500px;
  min-height: 40%;
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
.box-choice-button{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 20px;
}
.valid-button{
  font-family: 'catamaran', sans-serif;
  margin: 0 10px;
  min-width: 70px;
  padding: 0 10px;
  height: 35px;
  border-radius: 30px;
  background: #09c407;
  color: white;
  font-size: 1.1em;
  border: solid 2px #09c407;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.delete-button{
  font-family: 'catamaran', sans-serif;
  margin: 0 10px;
  width: 70px;
  height: 35px;
  border-radius: 30px;
  background: #c90200;
  color: white;
  font-size: 1.1em;
  border: solid 2px #c90200;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
@media (max-width: 480px) {
  .delete-box{
    width: 90%;
    min-height: 40%;
    max-height: 50%;
  }
}
</style>