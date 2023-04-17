<script lang="ts">
    let clazz = "";
    export { clazz as class };
</script>

<div class={"relative rounded-lg bg-gray-800 p-4 shadow-md " + clazz}>
    <slot />
</div>
