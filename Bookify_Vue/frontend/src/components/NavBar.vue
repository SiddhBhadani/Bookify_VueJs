<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <img
            src="../assets/logo.png"
            alt="Bookify Logo"
            class="navbar-brand"
            height="150px"
            width="150px"
        />
        <h1 class="navbar-brand" style="font-size: 55px"><b>Bookify</b></h1>
      </div>

      <div class="d-flex justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">
              <div class="d-flex flex-column align-items-center">
                <i class="bi bi-house-door" style="font-size: 30px;"></i>
                <b>Home</b>
              </div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/books" class="nav-link">
              <div class="d-flex flex-column align-items-center">
                <i class="bi bi-book" style="font-size: 30px;"></i>
                <b>Books</b>
              </div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              <div class="d-flex flex-column align-items-center">
                <i class="bi bi-person" style="font-size: 30px;"></i>
                <b>Profile</b>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-item:hover i {
  font-size: 30px;
}

.nav-item:hover b {
  font-size: 18px; /* Adjust the size based on your preference */
}

.nav-item {
  transition: all 0.8s ease;
}

</style>
