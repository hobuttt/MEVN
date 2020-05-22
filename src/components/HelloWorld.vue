<template>
  <v-container>
    <v-row class="text-center">
      <v-col sm="6" offset="3">
        <router-link to="/posts">posts</router-link>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
};
</script>
