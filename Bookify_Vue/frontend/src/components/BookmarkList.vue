<template>
  <div>
    <NavBar />
    <div class="home">
      <header class="Header">
        <div class="Content">
          <h1 class="Header-Title">Welcome to Bookify - Where Words Come to Life!</h1><br />
          <p class="Header-Text"><b>"Are you ready to embark on a literary journey like no other? Look no further than Bookify, your gateway to a world of captivating stories, literary adventures, and the joy of discovering your next favorite book."</b></p>
        </div>
      </header>

      <section class="bookmark">
        <h1><i class="bi bi-bookmark-fill mr-2" style="font-size: 50px;"></i><b style="color: white">Your Favorites:</b></h1>
        <div class="row justify-content-center">
          <div v-for="book in bookmarks" :key="book._id" class="col-md-4 mb-4" style="flex: 0.2">
            <div class="book">
              <img v-if="book.img" :src="'https://covers.openlibrary.org/b/id/' + book.cover_i + '-L.jpg'" class="card-img-top" alt="Book Cover">
              <img v-else src="../assets/cover_not_found.jpg" class="card-img-top" alt="Default Cover">
              <div class="card-body text-center">
                <h5 class="card-title"><b>Title: <span>{{ book.title }}</span></b></h5>
                <p class="card-text"><b>Author: <span>{{ book.author }}</span></b></p>
                <p class="card-text"><b>Year: <span>{{ book.year }}</span></b></p>
                <p class="card-text"><b>Editions: <span>{{ book.edition }}</span></b></p>
                <button @click="removeFromBookmarks(book._id)" class="btn btn-danger">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div v-if="removalMessage" class="alert alert-success">{{ removalMessage }}</div>
    </div>
    <FooterView />
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBar from "@/components/NavBar.vue";
import FooterView from "@/components/FooterView.vue";

export default {
  components: {
    NavBar,
    FooterView,
  },
  data() {
    return {
      bookmarks: [],
      removalMessage: '',
    };
  },
  mounted() {
    this.fetchBookmarks();
  },
  methods: {
    async fetchBookmarks() {
      try {
        const userToken = Cookies.get('userToken');
        if (!userToken) {
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
          return;
        }
        const response = await axios.get('http://localhost:3001/bookmarks', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
        });
        this.bookmarks = response.data.bookmarkedBooks;
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    },
    async removeFromBookmarks(bookId) {
  try {
    const userToken = Cookies.get('userToken');
    if (!userToken) {
      setTimeout(() => {
        this.$router.push('/login');
      }, 2000);
      return;
    }
    await axios.delete(`http://localhost:3001/bookmarks/${bookId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log('Book removed from bookmarks successfully');
    await this.fetchBookmarks();

    // Set the removal message
    this.removalMessage = 'Book removed from bookmarks successfully';

    // Clear the removal message after a few seconds (adjust as needed)
    setTimeout(() => {
      this.removalMessage = '';
    }, 5000);

    // Focus on the removal message
    this.$refs.removalMessage.$el.focus();
  } catch (error) {
    console.error('Error removing from bookmarks:', error);
  }
},
  }
}

</script>

<style scoped>
/* Reset some default styles */
.home {
  margin: 0;
  padding: 0;
  background: url('../assets/Home-background.png') no-repeat center center fixed;
  background-size: cover;
  backdrop-filter: blur(100);
  text-align: center;
}

/* Style the header */
.Header {
  color: white; /* Text color */
  text-align: center;
  padding: 25px 0; /* Adjust padding as needed */
}

/* Style the content */
.Content {
  margin: 0 auto; /* Center the content horizontally */
  max-width: 700px; /* Set a maximum width for the content */
}

.Header-Title {
  font-size: 40px;
  margin-bottom: 10px;
}

.Header-Text {
  font-size: 25px;
}

.bookmark {
  background-color: rgba(255, 255, 255, 0.0); /* Semi-transparent white background */
  padding: 25px;
  border-radius: 10px;
}

.bookmark h1 {
  text-align: left;
  font-size: 50px;
  color: darkgrey;
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
