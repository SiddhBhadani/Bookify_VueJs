<template>
  <div class="books">
    <NavBar/>
    <div class="container d-flex align-items-center justify-content-center mt-4">
      <div class="row">
        <!-- Search Bar -->
        <div class="col-md-8 mb-5"> <!-- Increased width to col-md-8 -->
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search..." />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">Search</button>
            </div>
          </div>
        </div>
        <!-- Filter Dropdown Menu -->
        <div class="col-md-4 mb-3"> <!-- Adjusted width for filter dropdown -->
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="filterDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filter
            </button>
            <div class="dropdown-menu" aria-labelledby="filterDropdown">
              <a class="dropdown-item" href="#">Title</a>
              <a class="dropdown-item" href="#">Author</a>
              <a class="dropdown-item" href="#">Year</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="books">

      <div class="row justify-content-center">
        <!-- Displaying the "Create" container -->
        <div class="container book col-md-2 mb-6 d-flex justify-content-center align-items-center" style="flex: 0.2">
          <router-link to="/create">
            <i class="bi bi-plus" style="font-size: 150px; color: black;"></i>
          </router-link>
        </div>
        <!-- Loop through books -->
        <div v-for="(book) in books" :key="book._id" class="col-md-2 mb-4" style="flex: 0.2">
          <div class="book">
            <!-- Content of your book -->
            <h5 class="text-center"><b>{{ book.title }}</b></h5>
            <img v-if="book.img" :src="'https://covers.openlibrary.org/b/id/' + book.cover_i + '-L.jpg'" class="card-img-top" alt="Book Cover">
            <img v-else src="../assets/cover_not_found.jpg" class="card-img-top" alt="Default Cover">
            <div class="card-body text-center">
              <p class="card-text"><b>Author: <span>{{ book.author }}</span></b></p>
              <p class="card-text"><b>Year: <span>{{ book.year }}</span></b></p>
              <p class="card-text"><b>Editions: <span>{{ book.edition }}</span></b></p>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <router-link @click="editBook(book)" :to="{ name: 'update', params: { bookId: book._id, title: book.title, author: book.author, year: book.year, edition: book.edition, places: book.places, subject: book.subject, description: book.description, img: book.img } }">
                    <i class="bi bi-pencil-fill" style="font-size: 30px; color: black"></i>
                  </router-link>
                </div>
                <div class="col-md-4 mb-3">
                  <p @click="deleteBook(book._id)"><i class="bi bi-trash-fill" style="font-size: 30px"></i></p>
                </div>
                <div class="col-md-4 mb-3">
                  <p @click="addToBookmarks(book._id)" class="text-center"><i class="bi bi-bookmark-fill" style="font-size: 30px"></i></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 mt-3" v-if="bookmarkMessage">
        <div class="alert alert-success">{{ bookmarkMessage }}</div>
      </div>
      <!-- New: Display delete message -->
      <div class="col-md-12 mt-3" v-if="deleteMessage">
        <div class="alert alert-success">{{ deleteMessage }}</div>
      </div>
      <div class="col-md-12 mt-3" v-if="successMessage">
        <div class="alert alert-success">{{ successMessage }}</div>
      </div>
    </section>


    <FooterView/>
  </div>
</template>


<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBar from "@/components/NavBar.vue";
import FooterView from "@/components/FooterView.vue";

export default {
  modules: {},
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
      deleteMessage: null, 
    bookmarkMessage: null, 
      successMessage:'',
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
    async deleteBook(bookId) {
      try {
        await axios.delete(`http://localhost:3001/books/${bookId}`);
        this.books = this.books.filter((book) => book._id !== bookId);

        // Set the delete message
        this.deleteMessage = 'Book deleted successfully';

        // Clear the delete message after a few seconds (adjust as needed)
        setTimeout(() => {
          this.deleteMessage = '';
        }, 5000);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    },
    async addToBookmarks(bookId) {
      const userToken = await Cookies.get('userToken');
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

          // Set the bookmark message
          this.bookmarkMessage = 'Book added to bookmarks successfully';
          
          // Clear the bookmark message after a few seconds (adjust as needed)
          setTimeout(() => {
            this.$router.push('/home');
            this.bookmarkMessage = '';
          }, 2000);

          // Refresh bookmarks after adding
          this.fetchBookmarks();
        })
        .catch((error) => {
          console.error('Error adding to bookmarks:', error);
        });
    },
    // Pass the book information to the editBook method
    editBook(book) {
      // Set the state in your local component (remove Vuex usage)
      this.$data.isEditing = true;
      this.$data.editingBookId = book._id;
      this.$data.bookForm = { ...book }; // Use a copy to avoid modifying the original book
    },
  },
};
</script>

<style scoped>
.books{
  background-image: url("../assets/Book-background-image.png");
  background-size: cover;
}

/* Style individual books */
.book {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7); /* Add shadow effect */
  transition: transform 1.5s ease; /* Add hover effect */
  color: black;
}

.book img {
  width: 100%;
  height: 300px;
  border-radius: 5px; /* Rounded corners for the book cover */
}

/* Apply hover effect to the books */
.book:hover {
  transform: scale(1.05); /* Enlarge the book on hover */
}
</style>
