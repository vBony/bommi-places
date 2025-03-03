<template>
    <label class="text-subtitle-1">
        {{ text }}
    </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "LabelField",
    props: {
        text: {
            type: String,
            required: true,
        },
    },
});
</script>
