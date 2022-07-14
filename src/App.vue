<template>
<nav class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="/">
    <img src="./assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
    Coronanumbers.org
  </a>
</nav>
  <div>
    <CovidCasesComponent></CovidCasesComponent>
  </div>

</template>
<script>
import CovidCasesComponent from './components/CovidCases.component.vue'

export default {
    name: 'app',
    components: { CovidCasesComponent }
}
</script>


<style>
nav {
  margin-bottom: 2rem;
}
a {
  padding: 1rem;
}
</style>
