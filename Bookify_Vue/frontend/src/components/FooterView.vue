<template>
  <footer class="footer bg-dark text-white">
    <div class="container">
      <div class="row">
        <div class="col-md-4 text-center">
          <h2 style="color: white;">Bookify</h2>
          <p>Your Gateway to a World of Captivating Stories</p>
          <p>&copy; 2023 Bookify</p>
        </div>

        <div class="col-md-4 text-center">
          <div class="footer-nav">
            <h3 style="color: white;">Navigation</h3>
            <ul class="list-unstyled">
              <li><router-link to="/" style="color: white;">Home</router-link></li>
              <li><router-link to="/books" style="color: white;">Books</router-link></li>
              <li><router-link to="/profile" style="color: white;">Profile</router-link></li>
            </ul>
          </div>
        </div>

        <div class="col-md-4 text-center">
          <div class="contact-info">
            <h3 style="color: white;">Contact Us</h3>
            <p><a :href="'tel:' + phoneNumber" style="color: white;">Phone: {{ phoneNumber }}</a></p>
            <p><a :href="'mailto:' + emailAddress" style="color: white;">Email: {{ emailAddress }}</a></p>
            <p style="color: white;">Address: {{ address }}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const phoneNumber = '+1 (555) 123-4567';
const emailAddress = 'info@bookify.com';
const address = '1234 Book Street, Readingville, Bookland';
</script>

<style scoped>
/* Add any custom styling for your footer if needed */
</style>
