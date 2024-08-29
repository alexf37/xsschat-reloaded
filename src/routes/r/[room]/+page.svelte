<script lang="ts">
    import RoomContainer from "$src/lib/components/RoomContainer.svelte";
    import ChatBar from "$src/lib/components/ChatBar.svelte";
    import ReceivedChat from "$src/lib/components/ReceivedChat.svelte";
    import { usernameStore } from "$lib/stores/usernameStore";
    import { io } from "socket.io-client";
    import SentChat from "$src/lib/components/SentChat.svelte";
    import type { Chat } from "$src/types/custom";
    import { onMount, tick } from "svelte";
    import { goto } from "$app/navigation";

    export let data = { room: "test" };
    let code: string = data.room;
    let username: string = $usernameStore;
    let chats: Chat[] = [];
    let scripts: HTMLElement;

    let socket = io("https://connect.xsschat.com", {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
    });
    socket.emit("join", { room: code, name: username });

    socket.on("user-connected", function (data) {
        chats = [
            ...chats,
            {
                sender: `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#f97316" class="w-3 h-3">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                    XSSChat 
                `,
                chat: data,
                time: new Date().toLocaleTimeString().replace(/:\d\d /, " "),
            },
        ];
    });

    socket.on("user-disconnected", function (data) {
        chats = [
            ...chats,
            {
                sender: `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#f97316" class="w-3 h-3">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                    XSSChat 
                `,
                chat: data,
                time: new Date().toLocaleTimeString().replace(/:\d\d /, " "),
            },
        ];
    });

    socket.on("message", async function (data) {
        const noNoWordAccordingToSvelte = "script";
        if (data.type === "script") {
            await tick();
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
            if (
                data.name !== username &&
                typeof Notification !== "undefined" &&
                Notification.permission === "granted" &&
                !document.hasFocus()
            ) {
                const notification = new Notification(data.name, {
                    body: data.value.replace(/(<([^>]+)>)/gi, ""),
                    icon: "/favicon.png",
                    silent: true,
                });
                setTimeout(() => {
                    notification.close();
                }, 2500);
            }
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
        if (typeof Notification !== "undefined" && Notification.permission !== "granted") {
            Promise.resolve(Notification.requestPermission()).then(function (permission) {
                console.log("Notification permission: ", permission);
            });
        }
        let scriptElem = document.createElement("script");
        let scriptTxtNode = document.createTextNode(`var username = '${username}';`);
        document.body.appendChild(scriptElem);
        scriptElem.appendChild(scriptTxtNode);
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
