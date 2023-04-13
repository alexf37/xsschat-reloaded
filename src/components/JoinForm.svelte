<script lang="ts">
    import { io } from "socket.io-client";
    export let socket = io("https://xsschat.com");
    let code: string;
    let username: string;
    function submit(e: Event) {
        socket.emit("join", { room: code, name: username });
    }
    socket.on('join', function (name) {
    console.log(name);
});

</script>

<svelte:head>
    <title>XSSChat</title>
</svelte:head>

<div
    class="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow dark:border-gray-700 dark:bg-gray-800 md:p-8"
>
    <form class="space-y-6" action="#">
        <h1 class="my-8 text-5xl font-black tracking-wide text-orange-500">XSSChat</h1>

        <input
            type="text"
            name="code"
            id="code"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
            placeholder="Room Code"
            bind:value={code}
            required
        />

        <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            bind:value={username}
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
        />

        <button
            type="submit"
            on:click|preventDefault={submit}
            class="w-full rounded-lg bg-orange-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >Join Room</button
        >
    </form>
</div>
