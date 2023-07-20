<template>
  <Header />
  <BackButton url="/admin/customers" />
  <div class="admin-customer-page">
    <div class="admin-customer-box">
      <div class="admin-customer-title-box">
        <h2 class="admin-customer-title">{{getCustomer.company}}</h2>
      </div>
      <div class="admin-customer">
        
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import BackButton from '@/components/BackButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminCustomer',
  components: {
    Header,
    BackButton
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['getCustomer'])
  },
  methods: {
    
  },
  created: function () {
    this.$store.dispatch('getCustomer', this.$route.params.id);
  }
}
</script>

<style scoped>
.admin-customer-page{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1em;
}
.admin-customer-box{
  width: 95%;
  display: flex;
  flex-direction: column;
}
.admin-customer-title-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}

.admin-customer{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
</style>