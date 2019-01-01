<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Select Size</label>
      <select id="size" name="size" class="form-control"
              type="text" v-model="size">
        <option value="null" selected disabled hidden>Choose Size</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    </div>
    <div class="form-group" :class="{ 'form-group--error': $v.amount.$error }">
    <label class="form-control-label" name="amount">Amount (Enter a number between 1 and 9999)</label>
    <input data-test-amount class="form__input" type="decimal" v-model.trim="amount"/>
  </div>
    <div class="error" v-if="!$v.amount.between">Amount must be between 1 and 9999</div>
    <div class="form-group" :class="{ 'form-group--error': $v.prize.$error }">
      <label class="form-control-label" name="prize">Prize (Enter a number between 1 and 999999)</label>
      <input data-test-amount class="form__input" type="decimal" v-model.trim="prize"/>
    </div>
    <div class="error" v-if="!$v.prize.between">Prize must be between 1 and 999999</div>
    <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
      <label data-test-Name class="form__label">Name</label>
      <input class="form__input" placeholder="enter product name here" v-model.trim="$v.name.$model"/>
    </div>
    <div class="error" v-if="!$v.name.required">Name is Required</div>
    <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
    <div class="form-group" :class="{ 'form-group--error': $v.color.$error }">
      <label data-test-Color class="form__label">Color</label>
      <input class="form__input" placeholder="enter product color here" v-model.trim="$v.color.$model"/>
    </div>
    <div class="error" v-if="!$v.color.required">Color is Required</div>
    <div class="error" v-if="!$v.color.minLength">Color must have at least {{$v.color.$params.minLength.min}} letters.</div>
    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ productBtnTitle }}</button>
    </p>
    <p>
      <a data-test-manageProducts href="#/products" class="btn btn-primary btn1" role="button">Manage Products</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Showing!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Showing...</p>
  </form>
</template>
<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, minLength, between } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'FormData',
  props: ['productBtnTitle', 'product'],
  data () {
    return {
      messagetitle: ' show ',
      name: this.product.name,
      color: this.product.color,
      size: this.product.size,
      amount: this.product.amount,
      prize: this.product.prize,
      upvotes: 0,
      submitStatus: null
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(5)
    },
    color: {
      required,
      minLength: minLength(3)
    },
    amount: {
      required,
      between: between(1, 9999)
    },
    prize: {
      required,
      between: between(1, 999999)
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var product = {
            size: this.size,
            amount: this.amount,
            upvotes: this.upvotes,
            name: this.name,
            prize: this.prize,
            color: this.color
          }
          this.product = product
          console.log('Submitting in ProductForm : ' +
            JSON.stringify(this.product, null, 5))
          this.$emit('product-is-created-updated', this.product)
        }, 500)
      }
    }
  }
}

</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .donate-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
