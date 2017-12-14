<template>
    <div>
        <p>The events page {{ serverUrl }}</p>
    </div>
</template>

<script>
export default {
  computed: {
    serverUrl() {
      return process.env.API_BASE;
    },
  },
};
</script>

