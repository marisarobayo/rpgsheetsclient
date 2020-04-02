<template>
  <div class = "columns">
    <div class = "column">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EditCharacterSheet'
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.full {
  flex:1
}
</style>
