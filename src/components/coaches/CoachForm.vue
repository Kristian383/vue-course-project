<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="name">First Name</label>
      <input type="text" id="name" v-model="firstName"/>
    </div>
    <div class="form-control">
      <label for="last">Last Name</label>
      <input type="text" id="last" v-model="lastName"/>
    </div>
    <div class="form-control">
      <label for="desc">Description</label>
      <input type="text" id="desc" v-model="desc"/>
    </div>
    <div class="form-control">
      <label for="number">Rate</label>
      <input type="number" id="number" v-model="rate"/>
    </div>
    <div class="form-control">
      <h3>Areas of expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas"/>
        <label for="frontend">Frontened Develop</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas"/>
        <label for="backend">backend Develop</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas"/>
        <label for="career">career</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
    data(){
        return {
            firstName:""
            ,lastName:""
            ,rate:0,
            desc:"",
            areas:[]

        }
    },
    methods:{
        submitForm(){
            const formData={
                first:this.firstName,
                last:this.lastName,
                rate:this.rate,
                desc:this.desc,
                areas:this.areas
            }
            console.log(formData);
            this.$emit("save-data",formData);
        }
    },
    emits:["save-data"]
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