<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="products" :options="options">
        <a slot="upvote" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="upvote(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editProduct(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteProduct(props.row._id)"></a>
        <a slot="Avatar" slot-scope="props">
          <img src="../../static/resources/boxlogo1.jpg">
        </a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Products',
  data () {
    return {
      messagetitle: ' Products List ',
      products: [],
      props: ['_id'],
      errors: [],
      columns: ['Avatar', '_id', 'name', 'color', 'prize', 'size', 'amount', 'upvotes', 'upvote', 'edit', 'remove'],
      options: {
        perPage: 10,
        filterable: ['name', 'amount', 'color', 'prize', 'size', 'upvotes'],
        sortable: ['upvotes'],
        headings: {
          _id: 'ID',
          name: 'Name',
          color: 'Color',
          size: 'Size',
          prize: 'Prize',
          amount: 'Amount',
          upvotes: 'Upvotes'
        }
      }
    }
  },
  // Fetches Donations when the component is created.
  created () {
    this.loadProducts()
  },
  methods: {
    loadProducts: function () {
      ProductService.fetchProducts()
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(typeof (response))
          console.log(typeof (response))
          console.log(typeof (response))
          console.log(typeof (response))
          console.log(typeof (response))
          console.log(typeof (response))
          console.log(typeof (response))
          console.log(typeof (response))
          console.log(typeof (response))
          console.log(typeof (response))
          this.products = response.data
          console.log(this.products)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    upvote: function (id) {
      ProductService.upvoteProduct(id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.loadProducts()
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    editProduct: function (id) {
      this.$router.params = id
      this.$router.push('edit')
    },
    deleteProduct: function (id) {
      this.$swal({
        title: 'Are you totaly sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          ProductService.deleteProduct(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadProducts()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Product ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'Your Product still Counts!', 'info')
        }
      })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
