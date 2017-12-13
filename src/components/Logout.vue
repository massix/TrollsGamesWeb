<template>
</template>

<script>
export default {
  created() {
    this.$store.commit('clearUser');
    this.$router.replace('/');
  },
};
</script>
