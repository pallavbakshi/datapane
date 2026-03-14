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
                        <a href="https://github.com/datainpane/datainpane" target="_blank">
                            <img
                                class="block h-8 w-auto"
                                src="data:image/png;base64,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"
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
