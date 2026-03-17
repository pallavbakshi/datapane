<script setup lang="ts">
import { computed } from "vue";
import sanitizeHtml from "sanitize-html";

const sanitizeTableOptions: sanitizeHtml.IOptions = {
    allowedTags: ['table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
                  'caption', 'colgroup', 'col', 'span', 'div', 'p', 'br', 'style'],
    allowedAttributes: {
        'table': ['class', 'id', 'style'],
        'th': ['class', 'style', 'colspan', 'rowspan', 'scope'],
        'td': ['class', 'style', 'colspan', 'rowspan'],
        'tr': ['class', 'style'],
        'col': ['span', 'style'],
        'span': ['class', 'style'],
        'div': ['class', 'style'],
    },
};

const p = defineProps<{
    html: string;
    singleBlockEmbed?: boolean;
    class: string;
}>();

const { dipLocal } = window;

const sanitizedHtml = computed(() =>
    sanitizeHtml(p.html, sanitizeTableOptions),
);

const tableRef = (node: any): void => {
    /**
     * Remove legacy "border" attribute set by pandas
     */
    if (node !== null) {
        const tbl: HTMLTableElement | null = node.querySelector(".dataframe");
        if (tbl) {
            tbl.removeAttribute("border");
        }
    }
};
</script>

<template>
    <link v-if="!dipLocal" rel="stylesheet" href="/static/report/index.css" />
    <div
        :ref="tableRef"
        :class="['w-full', { 'h-full absolute top-0': p.singleBlockEmbed }]"
        v-html="sanitizedHtml"
        data-cy="block-shadow"
    />
</template>

<style>
/**
 * Taken from https://github.com/tailwindlabs/tailwindcss-typography/blob/446eed16e3c63119e840ec6951c667577b69d811/src/styles.js#L147
 */

table {
    min-width: 100%;
    border-collapse: collapse;
    table-layout: auto;
    text-align: center;
}

thead {
    color: rgb(17, 24, 39); /* gray-900 */
    font-weight: 600;
    border-bottom: 1px solid rgb(209, 213, 219); /* gray-300 */
}

thead th {
    vertical-align: bottom;
}

tr {
    text-align: center !important;
}

tbody tr {
    border-bottom: 1px solid rgb(229, 231, 235); /* gray-200 */
}

tbody tr:last-child {
    border-bottom: 0;
}

tbody td {
    vertical-align: top;
    padding: 0.5rem 1.5rem;
}
</style>
