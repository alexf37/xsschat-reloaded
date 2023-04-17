<script lang="ts">
    import RoomContainer from "$src/lib/components/RoomContainer.svelte";
    import ChatBar from "$src/lib/components/ChatBar.svelte";
    import { usernameStore } from "$lib/stores/usernameStore";
    import { io } from "socket.io-client";

    export let data = { room: "test" };
    let code: string = data.room;
    let username: string = $usernameStore;

    let socket = io("https://xsschat.com");
    socket.emit("join", { room: code, name: username });

    socket.on("join", function (name) {
        console.log(name);
    });

    socket.on("message", function (data) {
        if (data.type === "script") return;
        console.log(`${data.name}: ${data.value}`);
    });

    function emit(chat: string) {
        socket.emit("message", { type: "chat", name: username, value: chat });
    }
</script>

<svelte:head>
    <title>XSSChat</title>
</svelte:head>
<RoomContainer>
    <ChatBar {emit} />
</RoomContainer>
