<script lang="ts">
    import { io } from "socket.io-client";
    export let socket = io("https://xsschat.com");
    let code: string;
    let username: string;
    function submit(e: Event) {
        socket.emit("join", { room: code, name: username });
    }
    socket.on("join", function (name) {
        console.log(name);
    });
</script>

<svelte:head>
    <title>XSSChat</title>
</svelte:head>

<div
    class="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow dark:border-gray-700 dark:bg-gray-800 md:p-8"
>
    room page
</div>
