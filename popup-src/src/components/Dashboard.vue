<template>
  <div class="dashboard">
    <h4>Hello, {{ user.username }}!</h4>
    <p>Your filtering addon status: <span :class="[user.filtering ? 'active' : 'inactive', 'status']">{{ user.filtering ? 'active' : 'inactive'}}</span></p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
}
</script>

<style>
.status {
  font-weight: bold;
}
.inactive {
  color: #cc5555;
}
.active {
  color: #55cc55;
}
</style>
