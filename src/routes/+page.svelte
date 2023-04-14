<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { io } from "socket.io-client";
    import { browser } from "$app/environment";
    import JoinForm from "$components/JoinForm.svelte";

    const socket = io("https://xsschat.com");
    const messages = writable([]);
    const message = writable("");

    onMount(async () => {});
</script>

<svelte:head>
    <title>XSSChat</title>
</svelte:head>

<main class="mx-auto flex h-screen w-11/12 flex-col items-center justify-center">
    <JoinForm {socket} />
</main>
