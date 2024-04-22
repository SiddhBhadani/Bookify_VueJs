<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div class="card p-4">
      <div class="text-center mb-4">
        <img src="../assets/logo.png" alt="Bookify Logo" class="navbar-brand" height="150px" width="150px" />
        <h1 class="navbar-brand" style="font-size: 55px"><b>Bookify</b></h1>
      </div>

      <h2 class="mt-4 text-center">Login</h2>

      <form @submit.prevent="login" class="mt-4">
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input v-model="email" type="email" class="form-control" required>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input v-model="password" type="password" class="form-control" required>
        </div>

        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary">Login</button>
          <router-link to="/register" class="btn btn-secondary ml-2">Register</router-link>
        </div>
      </form>
      <div v-if="loginSuccess === false" class="alert alert-danger mt-3">
          Invalid Credentials...
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      email: '',
      password: '',
      loginSuccess : true
    };
  },
  methods: {
    async login() {
      try {
        // Make an HTTP request to your backend for login
        const response = await axios.post('http://localhost:3001/user/login', {
          
          email: this.email,
          password: this.password,
        });

        console.log(response.data); // Handle the response as needed

        if (response.data?.user) {
          // Assume your backend sends a success message for a successful login
          console.log('Login successful');
          Cookies.set('userToken', response.data.user.token);
          // Redirect to home after a delay (e.g., 2 seconds)
            this.$router.push('/home');
        } else {
          this.loginSuccess = false;
          console.log('Login failed');
          // Handle login failure (display error message, etc.)
        }
      } catch (error) {
        this.loginSuccess = false;
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;

}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 500px;
}
</style>
