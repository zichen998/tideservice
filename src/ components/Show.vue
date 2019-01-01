<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <product-form :product="product" productBtnTitle="Show Product"
                         @product-is-created-updated="submitProduct"></product-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
import ProductForm from '@/components/ProductForm'

export default {
  data () {
    return {
      product: {name: '', amount: 0.0, message: ''},
      messagetitle: ' Show Product '
    }
  },
  components: {
    'product-form': ProductForm
  },
  methods: {
    submitProduct: function (product) {
      ProductService.postProduct(product)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
