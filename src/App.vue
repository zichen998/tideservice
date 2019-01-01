<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/h8.png" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">Fashionable costume Web App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item data-test-showbtn to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item data-test-showbtn2 to="/products"><i class="fa fa-list" style="padding: 5px"> Manage Products</i></b-nav-item>
          <b-nav-item data-test-showbtn3 to="/show"><i class="fa fa-money" style="padding: 5px"> Show</i></b-nav-item>
          <b-nav-item to="/map"><i class="fa fa-global" style="padding: 5px"> Map</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about"><i class="fa fa-info" style="padding: 5px"> About Us</i></b-nav-item>
          <b-nav-item to="/contact"><i class="fa fa-comment" style="padding: 5px"> Contact Us</i></b-nav-item>
          <b-nav-item to="/create"><i class="fa fa-comment" style="padding: 5px"> Create</i></b-nav-item>
          <b-nav-item to="/login"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item to="/sign-up"><i class="fa fa-sign-up" style="padding: 5px"> SignUp </i></b-nav-item>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>
<audio autoplay="autoplay" controls="controls"loop="loop" preload="auto"
       src="http://demo.mimvp.com/html5/take_you_fly.mp3">

</audio>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px;
  background: url("./assets/back2.png") repeat center top;
}
.VueTables__sortable {
  cursor: pointer;
}
</style>
