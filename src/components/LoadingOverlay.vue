<template>
    <v-overlay
      :model-value="loading"
      class="align-center justify-center"
      scroll-strategy="none"
      persistent
    >
        <v-progress-circular
            color="primary"
            size="64"
            indeterminate
        ></v-progress-circular>
    </v-overlay>
</template>
  
<script lang="ts">
import { defineComponent, PropType } from 'vue';
  
export default defineComponent({
    props: {
        loading: Boolean
    }
});
</script>
  