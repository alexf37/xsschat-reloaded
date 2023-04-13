<script lang="ts"> 
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { io } from 'socket.io-client';
    import { browser } from '$app/environment';
    import JoinForm from '../components/JoinForm.svelte';
    
    const socket = io('https://xsschat.com');
    const messages = writable([]);
    const message = writable('');
    
    onMount(async () => {

    });

</script>
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
<main class="flex flex-col items-center justify-center w-11/12 h-screen mx-auto">
        <JoinForm />
</main>


<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.900);
    }
  </style>