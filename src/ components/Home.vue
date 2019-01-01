<template>
  <div class="hero">
    <h1 class="vue-title">Trend direction !!</h1>
    <button @click="logout">Logout</button>
    <table align="center">
      <tr>
        <td>
          <p data-test-title class="lead"><b><i>It is a show time !!</i></b>
          <p data-test-content >Just click <a href ="#/show">here</a> to go to</p>
          <p>the Product page </p>
        </td>
        <td>
          <img data-test-image src="../assets/boxlogo.png" alt="description here" />abc
        </td>
      </tr>
    </table>

    <p></p>
    <p class="lead">This is the homepage of your <b>MEVN</b> Web app</p>
  </div>

</template>
<script>
import firebase from 'firebase'
// @ is an alias to /src
import Home from '@/components/Home'
export default {
  name: 'home',
  components: {
    Home
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style>
  .hero {
    height: 100vh;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
  }
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    font-size: 70pt;
    margin-bottom: 10px;
  }
</style>
