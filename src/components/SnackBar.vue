<template>
    <v-snackbar>
        <v-icon :color="colorIcon ?? 'green'">{{ icon ?? 'mdi-check-circle-outline'}}</v-icon>

        {{ text }}

        <template v-slot:actions>
            <v-btn
                :color="colorButton ?? 'green'"
                variant="text"
                @click="show = false"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts">
// @ts-nocheck

export default {
    props: {
        colorIcon: 'green',
        colorButton: 'green',
        icon: 'mdi-check-circle-outline',
        text: null
    }
}
</script>