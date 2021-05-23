<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid:!firstName.isValid}">
      <label for="name">First Name</label>
      <input type="text" id="name" v-model="firstName.val" @blur="clearValidity('firstName')"/>
      <p v-if="!firstName.isValid">First name must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid:!lastName.isValid}">
      <label for="last">Last Name</label>
      <input type="text" id="last" v-model="lastName.val" @blur="clearValidity('lastName')"/>
      <p v-if="!lastName.isValid">Last name must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid:!desc.isValid}">
      <label for="desc">Description</label>
      <input type="text" id="desc" v-model="desc.val" @blur="clearValidity('desc')"/>
      <p v-if="!desc.isValid">Desc must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid:!rate.isValid}">
      <label for="number">Rate</label>
      <input type="number" id="number" v-model="rate.val" @blur="clearValidity('rate')"/>
      <p v-if="!rate.isValid">Rate must be greater than 0</p>
    </div>
    <div class="form-control" :class="{invalid:!areas.isValid}">
      <h3>Areas of expertise</h3>
      <div>
        <input  @blur="clearValidity('areas')"
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
        />
        <label for="frontend">Frontened Develop</label>
      </div>
      <div>
        <input @blur="clearValidity('areas')"
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
        />
        <label for="backend">backend Develop</label>
      </div>
      <div>
        <input @blur="clearValidity('areas')" type="checkbox" id="career" value="career" v-model="areas.val" />
        <label for="career">career</label>
      </div>
      <p v-if="!areas.isValid">Choose at least 1 option for expertise</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors!</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      desc: {
        val: '',
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input){
      this[input].isValid=true;
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        rate: this.rate.val,
        desc: this.desc.val,
        areas: this.areas.val,
      };
      
      // console.log(formData);
      this.$emit('save-data', formData);
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val.trim() === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val.trim() === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.desc.val.trim() === '') {
        this.desc.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
  },
  emits: ['save-data'],
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>