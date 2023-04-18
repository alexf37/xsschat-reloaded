<script lang="ts">
    import RoomContainer from "$src/lib/components/RoomContainer.svelte";
    import ChatBar from "$src/lib/components/ChatBar.svelte";
    import ReceivedChat from "$src/lib/components/ReceivedChat.svelte";
    import { usernameStore } from "$lib/stores/usernameStore";
    import { io } from "socket.io-client";
    import SentChat from "$src/lib/components/SentChat.svelte";
    import type { Chat } from "$src/types/custom";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    export let data = { room: "test" };
    let code: string = data.room;
    let username: string = $usernameStore;
    let chats: Chat[] = [];
    let scripts: HTMLElement;

    let socket = io("https://xsschat.com");
    socket.emit("join", { room: code, name: username });

    socket.on("join", function (name) {});

    socket.on("message", function (data) {
        const noNoWordAccordingToSvelte = "script";
        if (data.type === "script") {
            var rawScript = data.value;
            var scriptElem = document.createElement(noNoWordAccordingToSvelte);
            var scriptTxtNode = document.createTextNode(rawScript);
            document.body.appendChild(scriptElem);
            scriptElem.appendChild(scriptTxtNode);
        } else {
            chats = [
                ...chats,
                {
                    sender: data.name,
                    chat: data.value,
                    time: new Date().toLocaleTimeString().replace(/:\d\d /, " "),
                },
            ];
            if(data.name !== username) new Notification("XSSChat: "+data.name, { body: data.value.replace( /(<([^>]+)>)/ig, ''), icon: "/favicon.png"});
        }
    });

    const scrollToBottom = (node: HTMLElement, dependency: unknown) => {
        dependency = dependency;
        const scroll = () =>
            node.scroll({
                top: node.scrollHeight,
                behavior: "smooth",
            });
        scroll();

        return { update: scroll };
    };

    function emit(chat: string) {
        if (chat.charAt(0) === "!") {
            socket.emit("message", { type: "script", name: username, value: chat.split("!")[1] });
        } else {
            socket.emit("message", { type: "chat", name: username, value: chat });
        }
    }

    onMount(() => {
        if (!username) goto(`/?join=${encodeURIComponent(code)}`, { replaceState: true });
        Notification.requestPermission();
    });
</script>

<svelte:head>
    <title>XSSChat</title>
</svelte:head>
<RoomContainer>
    <div
        use:scrollToBottom={chats}
        class="flex w-full flex-col gap-4 overflow-x-hidden overflow-y-scroll py-8 scrollbar-hide
        before:pointer-events-none before:absolute before:inset-0 before:-left-full before:z-10 before:shadow-[inset_50vw_-4rem_1rem_3rem_#111827] before:content-['']"
    >
        {#each chats as chat}
            {#if chat.sender === username}
                <SentChat {chat} />
            {:else}
                <ReceivedChat {chat} />
            {/if}
        {/each}
    </div>
    <ChatBar {emit} />
</RoomContainer>
