<template>
    <div class="add-back">
        <div class="add-box">
            <img crossorigin="anonymous" @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <h2 class="add-box-title">Modifier le client</h2>
            <div class="add-customer-form">
                <label class="form-label" for="customer-form-company">Société<span class="star">*</span></label>
                <input class="form-input required" v-model="company" @input="cancelError()" type="text" name="customer-form-company" id="customer-form-company">
                <label class="form-label" for="customer-form-lastName">Nom</label>
                <input class="form-input" v-model="firstName" type="text" name="customer-form-lastName" id="customer-form-lastName">
                <label class="form-label" for="customer-form-firstName">Prénom</label>
                <input class="form-input" v-model="lastName" type="text" name="customer-form-firstName" id="customer-form-firstName">
                <label class="form-label" for="customer-form-adress">Adresse<span class="star">*</span></label>
                <input class="form-input required" v-model="adress" type="text" name="customer-form-adress" id="customer-form-adress">
                <label class="form-label" for="customer-form-adress-2">Adresse (suite)</label>
                <input class="form-input" v-model="adress2" type="text" name="customer-form-adress-2" id="customer-form-adress-2">
                <label class="form-label" for="customer-form-zipCode">Code Postal<span class="star">*</span></label>
                <input class="form-input required" v-model="zipCode" type="text" name="customer-form-zipCode" id="customer-form-zipCode">
                <label class="form-label" for="customer-form-city">Ville<span class="star">*</span></label>
                <input class="form-input required" v-model="city" type="text" name="customer-form-city" id="customer-form-city">
                <label class="form-label" for="customer-form-phone">Téléphone<span class="star">*</span></label>
                <input class="form-input required" v-model="phone" @input="cancelError()" type="text" name="customer-form-phone" id="customer-form-phone">
                <label class="form-label" for="customer-form-mail">Mail<span class="star">*</span></label>
                <input class="form-input required" v-model="mail" @input="cancelError()" type="text" name="customer-form-mail" id="customer-form-mail">
                <div v-if="error" class="error">{{ error.message }}</div>
                <button class="add-button" @click="editCustomer()">Modifier</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
    name: 'AdminEditCustomer',
    props: ['id'],
    data() {
        return {
            error: "",
            company: "",
            lastName: "",
            firstName: "",
            adress: "",
            adress2: "",
            zipCode: "",
            city: "",
            phone: "",
            mail: "",
        }
    },
    computed: {
        ...mapGetters(['getCustomer'])
    },
    methods: {
        closeEditBox() {
            this.$store.state.editBox = "closed"
        },
        editCustomer() {
            instance.put(`/customer/${this.id}`, {
                company: this.company,
                lastName: this.lastName,
                firstName: this.firstName,
                adress: this.adress,
                adress2: this.adress2,
                zipCode: this.zipCode,
                city: this.city,
                phone: this.phone,
                mail: this.mail
            })
            .then((res) => {
                if(res.status === 201) {
                this.$store.dispatch('getCustomers');
                this.$store.state.editBox = "closed";
                }
            })
            .catch((error) => {
                this.error = error.response.data;
                const emptyInput = document.querySelectorAll('.required');
                emptyInput.forEach(input => {
                    if(input.value === "") {
                        input.classList.add('empty')
                    }
                })
            })
        },
        cancelError() {
            const emptyInput = document.querySelectorAll('.required');
            emptyInput.forEach(input => {
                if(input.value !== "") {
                    input.classList.remove('empty')
                }
            })
            this.error = ''
        },
    },
    created: function () {
        this.$store.dispatch('getCustomer', this.id)
        .then((customer) => {
            this.company = customer.data.company
            this.lastName = customer.data.lastName
            this.firstName = customer.data.firstName
            this.adress = customer.data.adress
            this.adress2 = customer.data.adress2
            this.zipCode = customer.data.zipCode
            this.city = customer.data.city
            this.phone = customer.data.phone
            this.mail = customer.data.mail
        })
    },
}
</script>

<style scoped>
.add-customer-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>