<template>
  <div class="site-content">
    <NavBar />
    <div class="user">
      <div class="profile-container">
        <div class="user-info-container">
          <div class="user-photo"></div>
          <div class="user-details">
            <p><strong>Name: <br />{{ user.name }}</strong></p>
            <p style="font-size: 22px"></p>
            <p><strong>Email: <br />{{ user.email }}</strong></p>
            <p style="font-size: 22px"></p>
            <div class="button-container">
              <button class="logout-button btn btn-danger" @click="logout">Logout</button>
               <button class="logout-button btn btn-danger" @click="deleteAccount">Delete </button>
            </div>
          </div>
        </div>
      </div>
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
    FooterView,
    NavBar,
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        img: '',
      },
    };
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const userToken = Cookies.get('userToken');
        if (!userToken) {
          this.$router.push('/login');
        }

        const response = await axios.get('http://localhost:3001/user/profile', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        this.user = response.data.user;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    async logout() {
      try {
        // const userToken = Cookies.get('userToken');
        // if (!userToken) {
        //   this.$router.push('/login');
        // }

        // await axios.post('http://localhost:3001/auth/logout', null, {
        //   headers: {
        //     Authorization: `Bearer ${userToken}`,
        //   },
        // });

        Cookies.remove('userToken');
        this.$router.replace('/login'); // Use replace instead of push
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
    async deleteAccount() {
      try {
        const userToken = Cookies.get('userToken');
        if (!userToken) {
          this.$router.push('/login');
        }

        await axios.delete('http://localhost:3001/user/delete', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        Cookies.remove('userToken');
        this.$router.replace('/login'); // Use replace instead of push
      } catch (error) {
        console.error('Error during account deletion:', error);
      }
    },
  },
};
</script>

<style scoped>
.user {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: url("https://img.freepik.com/premium-photo/product-presentation-wooden-table-with-background-empty-bookshelf-library_172251-444.jpg");
  background-size: cover;
}

.site-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.profile-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  margin: 100px;
}

.user-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
}

.user-photo {
  background: url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  background-size: contain ;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 15%;
  height: 65%;
  margin: 100px;
  transition: all 0.8s; /* Add a transition for a smooth effect */
}

.user-photo img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.user-photo:hover {
  width: 17%;
  height: 75%;
}

.user-details {
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  justify-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  margin: 100px;
  height: 90%;
  width: 40%;
  color: black;
  font-size: 22px;
}

.user-details p {
  margin: 5px 0;
  transition: all 0.8s; /* Add a transition for a smooth effect */
}

.user-details p:hover {
  font-size: 35px;
}

.logout-button {
  margin-top: 10px;
  margin-right: 30px;
  margin-left: 30px;
}

.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px; /* Adjust as needed */
}
</style>
