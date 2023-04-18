<script lang="ts">
    import { onMount, tick } from "svelte";
    import UIBox from "./UIBox.svelte";

    export let emit: (chat: string) => void;
    let chatbar: HTMLInputElement;
    let chat = "";

    onMount(() => {
        console.log("chatbar mounted");

        chatbar.addEventListener("keydown", async function (e) {
            if (e.code == "Tab") {
                e.preventDefault();
                let message = chat;
                let cursorPosition = chatbar.selectionStart ?? 0;
                let elemName =
                    (chat.substring(0, cursorPosition).split(" ") ?? chat)
                        .pop()
                        ?.split(">")
                        .pop() ?? chat;
                let insertIndex = cursorPosition - elemName.length;
                try {
                    if (
                        document.createElement(elemName.toLowerCase()).toString() ==
                        "[object HTMLUnknownElement]"
                    ) {
                        return;
                    }
                } catch (e) {
                    console.log(e);
                    chatbar.focus();
                    return;
                }
                let elem = `<${elemName}></${elemName}>`;
                let newInput = message.slice(0, insertIndex) + elem + message.slice(cursorPosition);
                chat = newInput;
                console.log(cursorPosition);
                cursorPosition =
                    (message.slice(0, insertIndex) + elem).length - `</${elemName}>`.length;
                await tick();
                chatbar.setSelectionRange(cursorPosition, cursorPosition, "backward");
                console.log(cursorPosition);
            }
        });
    });

    function submit() {
        if (!chat) return;
        console.log("submit: " + chat);
        emit(chat);
        chat = "";
    }
</script>

<UIBox class="z-50 mt-auto w-full min-w-fit">
    <form class="flex flex-row items-center justify-between gap-4" on:submit={submit}>
        <label for="chat-box" class="sr-only">Chat Input</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input
            type="text"
            id="chat-box"
            bind:value={chat}
            bind:this={chatbar}
            class="w-full flex-1 rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-400"
            placeholder="XSSChat"
            autofocus
        />
        <button
            type="submit"
            class="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-700"
        >
            Send
        </button>
    </form>
</UIBox>
