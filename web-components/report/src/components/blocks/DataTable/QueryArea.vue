<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import DpButton from "../../../shared/DPButton.vue";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { sql } from "@codemirror/lang-sql";
import { basicSetup } from "codemirror";

const p = defineProps<{
    initialQuery: string;
    errors?: string;
}>();

const emit = defineEmits(["query-change", "run-query", "clear-query"]);
const cmEl = ref<HTMLDivElement>();
let view: EditorView | null = null;

const eclipseTheme = EditorView.theme({
    "&": { height: "100%" },
    ".cm-scroller": { overflow: "auto" },
    ".cm-content": { fontFamily: "monospace" },
});

onMounted(() => {
    if (cmEl.value) {
        view = new EditorView({
            state: EditorState.create({
                doc: p.initialQuery,
                extensions: [
                    basicSetup,
                    sql(),
                    eclipseTheme,
                    EditorView.lineWrapping,
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged) {
                            emit("query-change", update.state.doc.toString());
                        }
                    }),
                ],
            }),
            parent: cmEl.value,
        });
        emit("query-change", p.initialQuery);
    } else {
        console.error("Couldn't find codemirror container element");
    }
});

onBeforeUnmount(() => {
    view?.destroy();
    view = null;
});
</script>

<template>
    <div class="h-48 flex flex-col justify-start border-b border-gray-200">
        <div class="flex flex-col flex-fixed h-full query-container">
            <div ref="cmEl" class="cm-container" />
            <div class="flex justify-start flex-fixed my-2 px-2">
                <dp-button
                    @click="emit('run-query')"
                    icon="fa fa-play"
                    data-cy="btn-run-query"
                    class="w-28 dip-btn-primary"
                >
                    Run Query
                </dp-button>
                <dp-button
                    @click="emit('clear-query')"
                    icon="fa fa-undo"
                    class="ml-2 w-28 dip-btn-secondary-gray"
                    data-cy="btn-reset-data"
                >
                    Reset Data
                </dp-button>
            </div>
        </div>
    </div>
    <div v-if="p.errors" class="w-full bg-red-100" data-cy="alasql-error-msg">
        {{ p.errors }}
    </div>
</template>

<style scoped>
.cm-container {
    flex: 1;
    overflow: hidden;
}
</style>
