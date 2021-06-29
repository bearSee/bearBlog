<template>
  <div id="app">
    <transition
      name="main-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated zoomOutDown">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
html{
  overflow: hidden;
}
html,body{
  height: 100%;
  background-color: #f9fbff;
  padding: 0 !important;
}
textarea {
  font-family: inherit;
}
a {
  text-decoration:none;
  color: inherit;
}
#app {
  height: 100%;
}
</style>
