<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="viewBox"
    :fill="fill"
    :class="customClass"
  >
    <path :d="iconPath" />
  </svg>
</template>

<script lang="ts" setup>
import { svgPaths } from "@/assets/icons/paths.svg";
import { IICon } from "@/types/icon";

const props = defineProps<IICon>();

// Default Props
const defaultProps = {
  size: 16,
  fill: "currentColor",
  viewBox: "0 0 30 30",
};

// Resolve props with defaults
const size = props.size ?? defaultProps.size;
const fill = props.fill ?? defaultProps.fill;
const viewBox = props.viewBox ?? defaultProps.viewBox;
const customClass = props.customClass ?? "";

// Dynamically fetch the path based on the name
const iconPath = svgPaths[props.name];
if (!iconPath) {
  console.warn(`Icon "${props.name}" not found in svgPaths`);
}
</script>

<style scoped>
/* Default styles for the SVG */
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
