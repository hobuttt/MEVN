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
          <v-icon @click="openEditForm(post._id)">edit</v-icon>
          <v-icon color="error" @click="deletePost(post._id)">delete</v-icon>
        </p>
        <v-row v-show="isEdit&&post._id===selectedPostId">
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
                class="mt-6" @click="editPost"
                :disabled="model.text === '' || model.title === ''"
              >
                Edit post
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-show="!isEdit">
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
      selectedPostId: '',
      isEdit: false,
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
      this.model = {};
    },
    openEditForm(postId) {
      this.isEdit = !this.isEdit;
      this.selectedPostId = postId;
      this.model = {};
    },
    async editPost() {
      this.model.id = this.selectedPostId;
      await PostService.editPost(this.model);
      console.log('Edited');
    },
    async deletePost(postId) {
      await PostService.deletePost(postId);
      console.log('Deleted');
    },
  },
};
</script>
