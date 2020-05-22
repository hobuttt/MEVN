<template>
  <div class="posts">
    <v-row class="text-center">
      <v-col sm="6" offset="3">
        <router-link to="/">home</router-link>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col sm="6" offset="3" v-for="(post, index) in posts" :key="index">
        <p @click="getPost(post._id)">
          <span>{{post.title}}: </span>
          <span>{{post.text}}</span>
        </p>
        <p>
          <v-icon @click="editPost">edit</v-icon>
          <v-icon color="error" @click="deletePost(post._id)">delete</v-icon>
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-sm-center">
        <v-form >
          <v-text-field
            label="Post title"
            :rules="[v => !!v || 'Required.']"
            hide-details="auto"
            style="width: 300px; margin: 0 auto"
            v-model="model.title"
          />
          <v-text-field
            label="Post text"
            :rules="[v => !!v || 'Required.']"
            hide-details="auto"
            style="width: 300px; margin: 20px auto"
            v-model="model.text"
          />
          <v-btn
            class="mt-6" @click="addPost"
            :disabled="model.text === '' || model.title === ''"
          >
            add post
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <p>{{selectedPost.title}} </p>
        <p> {{selectedPost.text}}</p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import PostService from '../services/PostService';

export default {
  data() {
    return {
      posts: [],
      model: { title: '', text: '' },
      selectedPost: {},
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await PostService.fetchPosts();
      this.posts = response.data;
    },
    async getPost(postId) {
      const response = await PostService.getPost(postId);
      this.selectedPost = response.data;
    },
    async addPost() {
      await PostService.addPost(this.model);
    },
    async editPost() {
      // await PostService.editPost(this.model);
      console.log('Edited');
    },
    async deletePost(postId) {
      await PostService.deletePost(postId);
      console.log('Deleted');
    },
  },
};
</script>
