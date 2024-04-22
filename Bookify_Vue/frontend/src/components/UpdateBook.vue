<template>
  <div>
    <!-- Include NavBar and FooterView components -->
    <NavBar />
    <div class="container mt-4 d-flex justify-content-center align-items-center">
      <!-- Book Form Card -->
      <div class="card" style="width: 400px;">
        <div class="card-body">
          <!-- Form with validation -->
          <form @submit.prevent="updateBook" class="needs-validation" novalidate>
            <!-- Title Input -->
            <div class="form-group">
              <label for="title">Title:</label>
              <input v-model="bookForm.title" type="text" class="form-control" required>
              <div class="invalid-feedback">Title is required.</div>
            </div>

            <!-- Author Input -->
            <div class="form-group">
              <label for="author">Author:</label>
              <input v-model="bookForm.author" type="text" class="form-control" required>
              <div class="invalid-feedback">Author is required.</div>
            </div>

            <!-- Year Input -->
            <div class="form-group">
              <label for="year">Year:</label>
              <input v-model="bookForm.year" type="number" class="form-control" required>
              <div class="invalid-feedback">Year is required.</div>
            </div>

            <!-- Edition Input -->
            <div class="form-group">
              <label for="edition">Edition:</label>
              <input v-model="bookForm.edition" type="number" class="form-control" required>
              <div class="invalid-feedback">Edition is required.</div>
            </div>

            <!-- Places Input -->
            <div class="form-group">
              <label for="places">Places:</label>
              <input v-model="bookForm.places" type="text" class="form-control">
            </div>

            <!-- Subject Input -->
            <div class="form-group">
              <label for="subject">Subject:</label>
              <input v-model="bookForm.subject" type="text" class="form-control" required>
              <div class="invalid-feedback">Subject is required.</div>
            </div>

            <!-- Description Input -->
            <div class="form-group">
              <label for="description">Description:</label>
              <textarea v-model="bookForm.description" class="form-control"></textarea>
            </div>

            <!-- Image URL Input -->
            <div class="form-group">
              <label for="img">Image URL:</label>
              <input v-model="bookForm.img" type="text" class="form-control">
            </div>

            <!-- Buttons for Update and Clear -->
            <div class="form-group mt-3 justify-content-center row ">
              <button type="submit" class="btn btn-primary btn-block col-md-4 mb-3">Update</button>
              <button type="button" class="btn btn-secondary btn-block col-md-4 mb-3" @click="resetForm">Clear</button>
            </div>
          </form>

          <!-- Display success message after update -->
          <div v-if="updateSuccess === true" class="alert alert-success mt-3">
            Book Updated successfully.
          </div>
        </div>
      </div>
    </div>
    <br>
    <!-- Include FooterView component -->
    <FooterView />
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from "@/components/NavBar.vue";
import FooterView from "@/components/FooterView.vue";

export default {
  components: { FooterView, NavBar },
  data() {
    return {
      bookForm: {
        title: '',
        author: '',
        year: null,
        edition: null,
        places: '',
        subject: '',
        description: '',
        img: '',
        updateSuccess: false
      },
      isEditing: false,
      editingBookId: null,
    };
  },
  mounted() {
    this.preFillForm();
  },
  methods: {
    preFillForm() {
      // Retrieve route parameters and pre-fill the form
      this.bookForm = {
        title: this.title || '',
        author: this.$route.params.author || '',
        year: this.$route.params.year || null,
        edition: this.$route.params.edition || null,
        places: this.$route.params.places || '',
        subject: this.$route.params.subject || '',
        description: this.$route.params.description || '',
        img: this.$route.params.img || '',
      };

      // Set the editingBookId
      this.editingBookId = this.$route.params.bookId;
      this.isEditing = true;
    },
    async updateBook() {
      try {
        await axios.patch(`http://localhost:3001/books/${this.editingBookId}`, this.bookForm);
        this.resetForm();
        this.updateSuccess = true;
        // Optionally, you can navigate back to the books list or another route
        setTimeout(() => {
          this.$router.push('/books');
        }, 1000);
      } catch (error) {
        console.error('Error updating book:', error);
      }
    },
    resetForm() {
      // Reset the form fields
      this.bookForm = {
        title: '',
        author: '',
        year: null,
        edition: null,
        places: '',
        subject: '',
        description: '',
        img: '',
      };
      this.isEditing = false;
      this.editingBookId = null;
      this.updateSuccess = false; // Reset the success message
    },
  },
};
</script>

<style scoped>
.container {
  /* Add any additional styling for the container here */
}
</style>
