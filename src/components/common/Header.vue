<template>
  <header>
    <h1><router-link to="/">Home</router-link></h1>
    <nav>
      <ul>
        <li><router-link to="/">home</router-link></li>
      </ul>
    </nav>

    <div class="search"><router-link to="/search">search</router-link></div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>
