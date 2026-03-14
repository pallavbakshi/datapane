<script setup lang="ts">
import { onUnmounted, onMounted } from "vue";
import { v4 as uuid4 } from "uuid";
import * as Bokeh from "@bokeh/bokehjs";

const docIds: any[] = [];
const divId = uuid4();

const p = defineProps<{
    plotJson: any;
    responsive: boolean;
    singleBlockEmbed?: boolean;
}>();

const makeResponsive = (json: any) => {
    /**
     * make the plot respond to the dimensions of its container
     * if the responsive property is set
     *
     * Bokeh 3.x: doc.roots is an array of inline model objects
     * (no more doc.roots.references)
     */
    const root = json.doc.roots.find((r: any) => r.id === json.root_id);
    if (root?.attributes) {
        root.attributes.sizing_mode = p.singleBlockEmbed
            ? "stretch_both"
            : "stretch_width";
    }
};

const cleanupDoc = (doc: any, docTimestamp: string) => {
    /**
     * remove any global Documents by checking their uuids
     */
    if ((doc as any).uuid === docTimestamp) {
        doc.clear();
        if (Bokeh.documents) {
            const i = Bokeh.documents.indexOf(doc);
            if (i > -1) {
                Bokeh.documents.splice(i, 1);
            }
        }
    }
};

const addPlotToDom = async () => {
    /**
     * mount a Bokeh plot to the block element
     */
    try {
        p.responsive && makeResponsive(p.plotJson);
        const plotViews = await Bokeh.embed.embed_item(
            p.plotJson as any,
            divId,
        );
        // Generate uuids for Bokeh Documents so they can be referenced on dismount
        // Bokeh 3.x: embed_item returns a ViewManager (iterable), not an array
        for (const pv of plotViews as any) {
            const docId = uuid4();
            (pv.model.document as any).uuid = docId;
            docIds.push(docId);
        }
    } catch (e) {
        console.error("An error occurred while rendering a Bokeh chart");
    }
};

onMounted(() => {
    addPlotToDom();
});

onUnmounted(() => {
    // cleanup -- https://github.com/bokeh/bokeh/issues/5355#issuecomment-423580351
    if (Bokeh.documents) {
        // Spread to copy since cleanupDoc mutates the array via splice
        for (const doc of [...Bokeh.documents]) {
            for (const docTimestamp of docIds) {
                cleanupDoc(doc, docTimestamp);
            }
        }
    }
});
</script>

<template>
    <div
        data-cy="block-bokeh"
        :id="divId"
        :class="[
            'm-auto flex justify-center items-center w-full',
            { 'w-full': p.responsive, 'h-iframe': singleBlockEmbed },
        ]"
    />
</template>
