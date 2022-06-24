<template>
  <div id="bear">
    <transition
      name="main-classes-transition"
      enter-active-class="animated fadeIn">
      <router-view />
    </transition>
  </div>
</template>
