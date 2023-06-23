<template>
  <div class="add-account-back">
    <div class="add-account-box">
        <div @click="closeAddAccountBox()" class="close-add-account">X</div>
        <h2>Créer un compte {{ type }}</h2>
        <div class="add-account-form">
            <label for="">Login</label>
            <input type="text" name="" id="">
            <label for="">Mot de passe</label>
            <input type="password" name="" id="">
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdminAddAccount',
  props: ["type"],
  computed: {
    ...mapGetters(['getAddAccountBox'])
  },
  methods: {
    closeAddAccountBox() {
      this.$store.state.addAccountBox = "closed"
    }
  },
}
</script>


<style scoped>
.add-account-back{
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.671);
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-account-box{
    position: relative;
    width: 60%;
    min-height: 50%;
    background: white;
}

.close-add-account{
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}
</style>