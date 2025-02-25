<template>
    <v-text-field
        v-model="model"
        :label="label"
        variant="outlined"
        :type="type"
        hide-details="auto"
        :error-messages="errorMessages"
        v-bind="$attrs"
        v-maska:[mask]
        density="compact"
    />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { vMaska } from "maska"
import type { PropType } from 'vue';

export default defineComponent({
    name: 'AppInput',
    directives: { maska: vMaska },
    props: {
        modelValue: {
            type: [String, Number] as PropType<string | number>,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        // variant: {
        //     type: String,
        //     default: 'outlined',
        // },
        type: {
            type: String,
            default: 'text',
        },
        hideDetails: {
            type: String,
            default: 'auto',
        },
        errorMessages: {
            type: Array as PropType<string[]>,
            default: () => [],
        },
        mask: {}
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const model = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value),
        });

        return { model };
    }
});
</script>
