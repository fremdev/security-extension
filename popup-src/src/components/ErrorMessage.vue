<template>
  <div class="error-message">
    <h3>Error:</h3><p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
  },
};
</script>

<style scoped>
  .error-message {
    background-color: #ffeeee;
    color: #ff3333;
    padding: 5px 15px;
    margin-bottom: 20px;
  }
  h3 {
    padding: 0 10px;
  }
</style>
