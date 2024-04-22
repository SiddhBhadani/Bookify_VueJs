<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div class="card p-4">
      <div class="text-center mb-4">
        <img src="../assets/logo.png" alt="Bookify Logo" class="navbar-brand" height="150px" width="150px" />
        <h1 class="navbar-brand" style="font-size: 55px"><b>Bookify</b></h1>
      </div>

      <h2 class="text-center">Register</h2>

      <form @submit.prevent="register" class="mt-4 needs-validation" novalidate>
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input v-model="name" type="text" class="form-control" required>
          <div class="invalid-feedback" v-if="name && name.length < 3">Name should be at least 3 characters long.</div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input v-model="email" type="email" class="form-control" required>
          <div class="invalid-feedback" v-if="email && !isValidEmail(email)">Invalid email format.</div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input v-model="password" type="password" class="form-control" required>
          <div class="invalid-feedback" v-if="password && !isValidPassword(password)">
            Password should be at least 6 characters long and contain at least one digit.
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary">Register</button>
          <router-link to="/login" class="btn btn-secondary ml-2">Login</router-link>
        </div>

        <div v-if="registrationStatus === 'success'" class="alert alert-success mt-3">
          Registration successful! Redirecting to login...
        </div>
        <div v-if="registrationStatus === 'error'" class="alert alert-danger mt-3">
          Registration failed. Please try again.
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      registrationStatus: null,
    };
  },
  methods: {
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    isValidPassword(password) {
      const passwordRegex = /^(?=.*\d).{6,}$/;
      return passwordRegex.test(password);
    },
    async register() {
      try {
        const response = await axios.post('http://localhost:3001/user/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        console.log(response.data); // Handle the response as needed

        // Assuming your backend returns a success message
        if (response?.data?.user) {
          this.registrationStatus = 'success';

          // Redirect to login after a delay (e.g., 2 seconds)
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        } else {
          this.registrationStatus = 'error';
        }
      } catch (error) {
        console.error(error);
        this.registrationStatus = 'error';
      }
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles here */
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 500px;
}

form {
  margin-top: 20px;
}
</style>
