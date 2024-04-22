<template>
  <div class="site-content">
    <NavBar/>
    <div>
      <h1>Books</h1>

      <!-- Add Book Form -->
      <form @submit.prevent="addOrUpdateBook">
        <label for="title">Title:</label>
        <input v-model="bookForm.title" type="text" required>

        <label for="author">Author:</label>
        <input v-model="bookForm.author" type="text" required>

        <label for="year">Year:</label>
        <input v-model="bookForm.year" type="number" required>

        <label for="edition">Edition:</label>
        <input v-model="bookForm.edition" type="number" required>

        <label for="places">Places:</label>
        <input v-model="bookForm.places" type="text">

        <label for="subject">Subject:</label>
        <input v-model="bookForm.subject" type="text" required>

        <label for="description">Description:</label>
        <textarea v-model="bookForm.description"></textarea>

        <label for="img">Image URL:</label>
        <input v-model="bookForm.img" type="text">

        <button type="submit">{{ isEditing ? 'Update Book' : 'Add Book' }}</button>
      </form>

      <!-- Display Books -->
      <ul>
        <li v-for="book in books" :key="book._id">
          {{ book.title }} by {{ book.author }}
          <button @click="editBook(book)">Edit</button>
          <button @click="deleteBook(book._id)">Delete</button>
          <button @click="addToBookmarks(book._id)">Add to Bookmarks</button>
        </li>
      </ul>
    </div>
    <FooterView/>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBar from "@/components/NavBar.vue";
import FooterView from "@/components/FooterView.vue";
// const userToken = Cookies.get('userToken');
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
        if (this.isEditing) {
          await axios.patch(`http://localhost:3001/books/${this.editingBookId}`, this.bookForm);
        } else {
          const response = await axios.post('http://localhost:3001/book', this.bookForm);
          this.books.push(response.data);
        }

        this.resetForm();
        await this.fetchBooks();
      } catch (error) {
        console.error('Error adding/updating book:', error);
      }
    },
    async editBook(book) {
      this.isEditing = true;
      this.editingBookId = book._id;
      // Populate the form with the book's details for editing
      this.bookForm = { ...book };
      await this.fetchBooks();
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

    resetForm() {
      this.isEditing = false;
      this.editingBookId = null;
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
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
