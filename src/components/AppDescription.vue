<template>
  <div>
    <section class="section is-size-4">
      RPGSheets is a platform that allows you to create <strong>tabletop RPG character sheets</strong>. 
    </section>
    <router-link to="/register" class="button is-link is-large"> Get started now! </router-link>
    <section class="section columns">
      <div class="column">
        <div class="card">
          <div class = "card-content">
            <h3 class="title"> Share Character Sheets </h3>
            <section>
            RPGSheets offers you the possibility of creating character sheets and sharing them to other users. 
            You can even create a link for other unregistered users to see them!
            </section>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class = "card-content">
            <h3 class="title"> All together </h3>
            <section>
            Tired of sharing and having to be careful not to use an outdated version of your sheet? 
            With RPGSheets your character will be always updated, since all viewers share the same version!
            </section>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class = "card-content">
            <h3 class="title"> Ease of use </h3>
            <section>
            With our simple forms you will be able to create characters quickly!
            </section>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'AppDescription'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
