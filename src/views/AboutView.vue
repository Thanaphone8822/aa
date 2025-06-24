<template>
  <div class="about">
    <h1>link to main test</h1> 
    <br>
    <button class="btn btn-primary w-30">
      <RouterLink to="/login">Login</RouterLink>
    </button>
    
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    margin-bottom: 50px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
