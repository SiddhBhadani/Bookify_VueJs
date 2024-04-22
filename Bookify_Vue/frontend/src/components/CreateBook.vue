<template>
  <div>
    <NavBar />
    <div class="container mt-4 d-flex justify-content-center align-items-center">
      <!-- Book Form Card -->
      <div class="card" style="width: 400px;">
        <div class="card-body">
          <form @submit.prevent="addOrUpdateBook" class="needs-validation" novalidate>
            <div class="form-group">
              <label for="title">Title:</label>
              <input v-model="bookForm.title" type="text" class="form-control" required>
            </div>

            <div class="form-group">
              <label for="author">Author:</label>
              <input v-model="bookForm.author" type="text" class="form-control" required>
            </div>

            <div class="form-group">
              <label for="year">Year:</label>
              <input v-model="bookForm.year" type="number" class="form-control" required>
            </div>

            <div class="form-group">
              <label for="edition">Edition:</label>
              <input v-model="bookForm.edition" type="number" class="form-control" required>
            </div>

            <div class="form-group">
              <label for="places">Places:</label>
              <input v-model="bookForm.places" type="text" class="form-control">
            </div>

            <div class="form-group">
              <label for="subject">Subject:</label>
              <input v-model="bookForm.subject" type="text" class="form-control" required>
            </div>

            <div class="form-group">
              <label for="description">Description:</label>
              <textarea v-model="bookForm.description" class="form-control"></textarea>
            </div>

            <div class="form-group">
              <label for="img">Image URL:</label>
              <input v-model="bookForm.img" type="text" class="form-control">
            </div>

            <div class="form-group mt-3 justify-content-center row ">
              <button type="submit" class="btn btn-primary btn-block col-md-4 mb-3">{{ isEditing ? 'Update Book' : 'Add Book' }}</button>
              <button type="button" class="btn btn-secondary btn-block col-md-4 mb-3" @click="resetForm">Clear</button>
            </div>

          </form>
        </div>
      </div>
    </div>
    <br>
    <FooterView />
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBar from "@/components/NavBar.vue";
import FooterView from "@/components/FooterView.vue";
export default {
  components: {FooterView, NavBar},
  data() {
    return {
      books: [],
      bookForm: {
        title: '',
        author: '',
        year: null,
        edition: null,
        places: '',
        subject: '',
        description: '',
        img: '',
      },
      isEditing: false,
      editingBookId: null,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3001/books');
        this.books = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    async addOrUpdateBook() {
      try {
        await axios.post('http://localhost:3001/book', this.bookForm).then((res)=>{
          console.log(res.data);
          window.location.href = "/home"
        }).catch(err => console.log(err) ); 

        this.resetForm();
        await this.fetchBooks();
      } catch (error) {
        console.error('Error adding/updating book:', error);
      }
    },
    async deleteBook(bookId) {
      try {
        await axios.delete(`http://localhost:3001/books/${bookId}`);
        this.books = this.books.filter((book) => book._id !== bookId);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    },
    addToBookmarks(bookId) {
      const userToken = Cookies.get('userToken');
      if (!userToken) {
        // Handle the case when the token is not present (e.g., redirect to login)
        this.$router.push('/login');
        return;
      }

      axios
          .post(`http://localhost:3001/bookmarks/${bookId}`, null, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then(() => {
            console.log('Book added to bookmarks successfully');
            // Refresh bookmarks after adding
            this.fetchBookmarks();
          })
          .catch((error) => {
            console.error('Error adding to bookmarks:', error);
          });
    },
  },
};
</script>

<style scoped>
.container{

}
</style>