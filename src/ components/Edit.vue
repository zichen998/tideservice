<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
          <product-form :product="product" productBtnTitle="Update product"
                         @product-is-created-updated="updateProduct"></product-form>
          </template>
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
      product: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: ' Update Product '
    }
  },
  components: {
    'product-form': ProductForm
  },
  created () {
    this.getProduct()
  },
  methods: {
    getProduct: function () {
      ProductService.fetchProduct(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.product = this.temp[0]
          this.childDataLoaded = true
          console.log('Getting Product in Edit: ' + JSON.stringify(this.product, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateProduct: function (product) {
      console.log('Before PUT ' + JSON.stringify(product, null, 5))
      ProductService.putProduct(this.$router.params, product)
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(product, null, 5))
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
