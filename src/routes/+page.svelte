<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import JoinForm from "$components/JoinForm.svelte";

    onMount(async () => {});
</script>

<svelte:head>
    <title>XSSChat</title>
</svelte:head>

<main class="mx-auto flex h-screen w-11/12 flex-col items-center justify-center">
    <JoinForm />
</main>
