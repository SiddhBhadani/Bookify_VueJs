// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import RegisterForm from '../components/RegisterForm.vue';
import LoginForm from '../components/LoginForm.vue';
import BookList from '../components/BookList.vue';
import BookmarkList from '../components/BookmarkList.vue';
import UserProfile from '../components/UserProfile.vue';
import CreateBook from "@/components/CreateBook.vue";
import UpdateBook from "@/components/UpdateBook.vue";

const routes = [
  { path: '/register', component: RegisterForm },
  { path: '/login', component: LoginForm },
  { path: '/books', component: BookList },
  { path: '/home', component: BookmarkList },
  { path: '/profile', component: UserProfile },
  {path: '/create',component: CreateBook},
  {path: '/update/:bookId', component: UpdateBook,name: 'update'},
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
