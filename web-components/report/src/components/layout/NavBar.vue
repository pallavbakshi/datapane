<script setup lang="ts">
import { ReportProps } from "../../data-model/types";
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { computed, onMounted, onUnmounted, ref } from "vue";

const p = defineProps<{
    labels: string[];
    pageNumber: number;
    reportWidthClass: ReportProps["reportWidthClass"];
    isServedApp: ReportProps["isServedApp"];
    resetApp: () => void;
}>();
const emit = defineEmits(["page-change"]);

const showDropdown = ref(false);
const showPagesDropdown = ref(false);
const dropdownBtnEl = ref<HTMLElement>();

const hideDropdownOnClickAway = (e: MouseEvent) => {
    if (
        e.target instanceof Node &&
        dropdownBtnEl.value &&
        !dropdownBtnEl.value.contains(e.target)
    ) {
        showDropdown.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", hideDropdownOnClickAway);
});

onUnmounted(() => {
    document.removeEventListener("click", hideDropdownOnClickAway);
});

const showWidgets = !window.dipLocal || window.dipAppRunner;

const alwaysShowPagesDropdown = computed(() => p.labels.length > 6);

const dropdownMenuActions = [
    {
        label: "Reset app",
        click: p.resetApp,
    },
];

const dropdownMenuLinks = [
    { label: "Get help", href: "https://forum.datainpane.com" },
    { label: "Documentation", href: "https://docs.datainpane.com" },
];
</script>

<template>
    <nav
        :class="[
            // z-40 to be below modals and side bars on datainpane.com
            'bg-white relative z-40',
            { 'border-b border-gray-100 sticky top-0': labels.length > 0 },
        ]"
    >
        <div class="mx-auto px-4" :class="p.reportWidthClass">
            <div class="flex h-16 justify-between">
                <div class="flex">
                    <div
                        class="flex flex-shrink-0 items-center"
                        v-if="showWidgets"
                    >
                        <a href="https://github.com/pallavbakshi/datainpane" target="_blank">
                            <img
                                class="block h-8 w-auto"
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiI+CiAgPCEtLSBPdXRlciByb3VuZGVkIHJlY3RhbmdsZSAoYm9yZGVyKSAtLT4KICA8cmVjdCB4PSIxNiIgeT0iMTYiIHdpZHRoPSIyMjQiIGhlaWdodD0iMjI0IiByeD0iMjQiIHJ5PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWExYTFhIiBzdHJva2Utd2lkdGg9IjE0Ii8+CgogIDwhLS0gSW5uZXIgZGl2aWRlcnMgLS0+CiAgPGxpbmUgeDE9IjEyOCIgeTE9IjI4IiB4Mj0iMTI4IiB5Mj0iMjI4IiBzdHJva2U9IiMxYTFhMWEiIHN0cm9rZS13aWR0aD0iOCIvPgogIDxsaW5lIHgxPSIyOCIgeTE9IjEyOCIgeDI9IjIyOCIgeTI9IjEyOCIgc3Ryb2tlPSIjMWExYTFhIiBzdHJva2Utd2lkdGg9IjgiLz4KCiAgPCEtLSBUb3AtbGVmdDogTGluZSBjaGFydCAtLT4KICA8cG9seWxpbmUgcG9pbnRzPSI0OCwxMDUgNjgsODUgODIsOTUgMTAwLDYwIDExNSw3NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWExYTFhIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgoKICA8IS0tIFRvcC1yaWdodDogU2NhdHRlciBwbG90IC0tPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjcwIiByPSI0LjUiIGZpbGw9IiMxYTFhMWEiLz4KICA8Y2lyY2xlIGN4PSIxNzAiIGN5PSI1NSIgcj0iNC41IiBmaWxsPSIjMWExYTFhIi8+CiAgPGNpcmNsZSBjeD0iMTYyIiBjeT0iODIiIHI9IjQuNSIgZmlsbD0iIzFhMWExYSIvPgogIDxjaXJjbGUgY3g9IjE4NSIgY3k9IjY1IiByPSI0LjUiIGZpbGw9IiMxYTFhMWEiLz4KICA8Y2lyY2xlIGN4PSIxOTUiIGN5PSI4NSIgcj0iNC41IiBmaWxsPSIjMWExYTFhIi8+CiAgPGNpcmNsZSBjeD0iMTc1IiBjeT0iOTgiIHI9IjQuNSIgZmlsbD0iIzFhMWExYSIvPgogIDxjaXJjbGUgY3g9IjIwNSIgY3k9IjcyIiByPSI0LjUiIGZpbGw9IiMxYTFhMWEiLz4KICA8Y2lyY2xlIGN4PSIxNDgiIGN5PSI5NSIgcj0iNC41IiBmaWxsPSIjMWExYTFhIi8+CiAgPGNpcmNsZSBjeD0iMTkwIiBjeT0iNTAiIHI9IjMuNSIgZmlsbD0iIzFhMWExYSIvPgogIDxjaXJjbGUgY3g9IjE1NSIgY3k9IjEwNSIgcj0iMy41IiBmaWxsPSIjMWExYTFhIi8+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTAwIiByPSIzLjUiIGZpbGw9IiMxYTFhMWEiLz4KICA8Y2lyY2xlIGN4PSIyMTAiIGN5PSI1NSIgcj0iMy41IiBmaWxsPSIjMWExYTFhIi8+CgogIDwhLS0gQm90dG9tLWxlZnQ6IEJhciBjaGFydCAtLT4KICA8cmVjdCB4PSI0MCIgeT0iMTk4IiB3aWR0aD0iMTQiIGhlaWdodD0iMTciIHJ4PSIxIiBmaWxsPSIjMWExYTFhIi8+CiAgPHJlY3QgeD0iNjAiIHk9IjE4NSIgd2lkdGg9IjE0IiBoZWlnaHQ9IjMwIiByeD0iMSIgZmlsbD0iIzFhMWExYSIvPgogIDxyZWN0IHg9IjgwIiB5PSIxNzAiIHdpZHRoPSIxNCIgaGVpZ2h0PSI0NSIgcng9IjEiIGZpbGw9IiMxYTFhMWEiLz4KICA8cmVjdCB4PSIxMDAiIHk9IjE1NSIgd2lkdGg9IjE0IiBoZWlnaHQ9IjYwIiByeD0iMSIgZmlsbD0iIzFhMWExYSIvPgoKICA8IS0tIEJvdHRvbS1yaWdodDogR3JpZC9kYXRhIHBsb3QgLS0+CiAgPCEtLSBHcmlkIGxpbmVzIC0tPgogIDxsaW5lIHgxPSIxNDUiIHkxPSIxNjUiIHgyPSIyMjAiIHkyPSIxNjUiIHN0cm9rZT0iIzFhMWExYSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPGxpbmUgeDE9IjE0NSIgeTE9IjE4NSIgeDI9IjIyMCIgeTI9IjE4NSIgc3Ryb2tlPSIjMWExYTFhIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8bGluZSB4MT0iMTQ1IiB5MT0iMjA1IiB4Mj0iMjIwIiB5Mj0iMjA1IiBzdHJva2U9IiMxYTFhMWEiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxsaW5lIHgxPSIxNjUiIHkxPSIxNDUiIHgyPSIxNjUiIHkyPSIyMjAiIHN0cm9rZT0iIzFhMWExYSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPGxpbmUgeDE9IjE4NSIgeTE9IjE0NSIgeDI9IjE4NSIgeTI9IjIyMCIgc3Ryb2tlPSIjMWExYTFhIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8bGluZSB4MT0iMjA1IiB5MT0iMTQ1IiB4Mj0iMjA1IiB5Mj0iMjIwIiBzdHJva2U9IiMxYTFhMWEiIHN0cm9rZS13aWR0aD0iMiIvPgogIDwhLS0gRGF0YSBwb2ludHMgb24gZ3JpZCAtLT4KICA8Y2lyY2xlIGN4PSIxNjUiIGN5PSIxNjUiIHI9IjUiIGZpbGw9IiMxYTFhMWEiLz4KICA8Y2lyY2xlIGN4PSIyMDUiIGN5PSIxODUiIHI9IjUiIGZpbGw9IiMxYTFhMWEiLz4KICA8Y2lyY2xlIGN4PSIxODUiIGN5PSIyMDUiIHI9IjUiIGZpbGw9IiMxYTFhMWEiLz4KICA8Y2lyY2xlIGN4PSIxNjUiIGN5PSIyMDUiIHI9IjUiIGZpbGw9IiMxYTFhMWEiLz4KPC9zdmc+Cg=="
                                alt="Data In Pane"
                            />
                        </a>
                    </div>
                    <div
                        class="hidden sm:ml-6 sm:flex sm:space-x-8"
                        v-if="!alwaysShowPagesDropdown"
                    >
                        <a
                            v-for="(label, idx) in p.labels"
                            :key="idx"
                            :data-cy="`page-${idx}`"
                            :class="[
                                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium cursor-pointer',
                                {
                                    'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                                        idx !== p.pageNumber,
                                    'border-dip-accent text-gray-900':
                                        idx === p.pageNumber,
                                },
                            ]"
                            @click="emit('page-change', idx)"
                        >
                            {{ label }}
                        </a>
                    </div>
                    <!-- If there are > a certain number of pages, we don't hide the dropdown on larger screens -->
                    <div
                        v-if="labels.length > 0"
                        class="ml-6 flex"
                        :class="{ 'sm:hidden': !alwaysShowPagesDropdown }"
                    >
                        <a
                            class="group cursor-pointer inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-500"
                            @click="showPagesDropdown = !showPagesDropdown"
                        >
                            {{ p.labels.length }} pages
                            <chevron-down-icon
                                :class="[
                                    'ml-2 h-5 w-5 group-hover:text-gray-500 text-gray-400',
                                    {
                                        'text-gray-600': showPagesDropdown,
                                        'text-gray-400': !showPagesDropdown,
                                    },
                                ]"
                            />
                        </a>
                    </div>
                </div>
                <div class="ml-6 flex items-center" v-if="showWidgets">
                    <div class="relative">
                        <button
                            type="button"
                            class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                            ref="dropdownBtnEl"
                            @click="showDropdown = !showDropdown"
                        >
                            <adjustments-horizontal-icon
                                class="h-7 w-7 hover:transform hover:rotate-180"
                            />
                        </button>
                        <div
                            v-if="showDropdown"
                            class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                            tabindex="-1"
                        >
                            <!-- Right now, only show actions if we are a served app - may change in future -->
                            <div class="py-1" role="none" v-if="p.isServedApp">
                                <a
                                    v-for="(item, idx) in dropdownMenuActions"
                                    tabindex="-1"
                                    :key="idx"
                                    @click="item.click"
                                    class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                                >
                                    {{ item.label }}
                                </a>
                            </div>
                            <div class="py-1" role="none">
                                <a
                                    v-for="(item, idx) in dropdownMenuLinks"
                                    tabindex="-1"
                                    :key="idx"
                                    :href="item.href"
                                    target="_blank"
                                    class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                                >
                                    {{ item.label }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Always hide on larger viewports, unless we have > N pages -->
            <div
                v-if="showPagesDropdown"
                :class="{ 'sm:hidden': !alwaysShowPagesDropdown }"
            >
                <div class="space-y-1 pt-2 pb-3">
                    <a
                        v-for="(label, idx) in p.labels"
                        :key="idx"
                        :data-cy="`page-${idx}`"
                        :class="[
                            'cursor-pointer block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                            {
                                'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700':
                                    idx !== p.pageNumber,
                                'border-indigo-500 bg-indigo-50 text-indigo-700':
                                    idx === p.pageNumber,
                            },
                        ]"
                        @click="emit('page-change', idx)"
                    >
                        {{ label }}
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>
