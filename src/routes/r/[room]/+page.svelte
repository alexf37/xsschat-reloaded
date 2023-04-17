<script lang="ts">
    import RoomContainer from "$src/lib/components/RoomContainer.svelte";
    import ChatBar from "$src/lib/components/ChatBar.svelte";
    import ReceivedChat from "$src/lib/components/ReceivedChat.svelte";
    import { usernameStore } from "$lib/stores/usernameStore";
    import { io } from "socket.io-client";
    import SentChat from "$src/lib/components/SentChat.svelte";
    import type { Chat } from "$src/types/custom";

    export let data = { room: "test" };
    let code: string = data.room;
    let username: string = $usernameStore;
    let chats: Chat[] = [];

    let socket = io("https://xsschat.com");
    socket.emit("join", { room: code, name: username });

    socket.on("join", function (name) {
        console.log(name);
    });

    socket.on("message", function (data) {
        if (data.type === "script") return;
        chats = [
            ...chats,
            {
                sender: data.name,
                chat: data.value,
                time: new Date().toLocaleTimeString(),
            },
        ];
        console.log(
            `received: ${data.name} said ${data.value} at ${new Date().toLocaleTimeString()}`
        );
    });

    function emit(chat: string) {
        socket.emit("message", { type: "chat", name: username, value: chat });
    }
</script>

<svelte:head>
    <title>XSSChat</title>
</svelte:head>
<RoomContainer>
    {#each chats as chat}
        {#if chat.sender === username}
            <SentChat {chat} />
        {:else}
            <ReceivedChat {chat} />
        {/if}
    {/each}
    <ChatBar {emit} />
</RoomContainer>
