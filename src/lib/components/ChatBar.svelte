<script lang="ts">
    import { onMount } from "svelte";
    import UIBox from "./UIBox.svelte";

    export let emit: (chat: string) => void;
    let chatbar: HTMLInputElement;
    let chat = "";

    onMount(() => {
        console.log("chatbar mounted");
        chatbar.focus();
    });

    function submit() {
        console.log("submit: " + chat);
        emit(chat);
        chat = "";
        chatbar.focus();
    }
</script>

<UIBox class="z-50 mt-auto w-full">
    <form class="flex flex-row items-center justify-between gap-4" on:submit={submit}>
        <label for="chat-box" class="sr-only">Chat Input</label>
        <input
            type="text"
            id="chat-box"
            bind:value={chat}
            bind:this={chatbar}
            class="w-full flex-1 rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-400"
            placeholder="XSSChat"
        />
        <button
            type="submit"
            class="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-700"
        >
            Send
        </button>
    </form>
</UIBox>
