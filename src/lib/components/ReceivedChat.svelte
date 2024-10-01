<script lang="ts">
    import UIBox from "./UIBox.svelte";

    export let chat = {
        sender: "",
        chat: "",
        time: "",
    };
</script>

<UIBox class="w-9/12 max-w-fit group space-y-1 break-words">
    <h3 class="flex flex-row items-center gap-1 text-xs text-gray-400">
        {@html `${chat.sender} · ${chat.time}`}
    </h3>
    <p>{@html chat.chat.split("\n").join("<br>")}</p>
    <div class="absolute h-full flex-col top-0 -right-8 group-hover:flex hover:flex hidden">
        <button
            class=" text-gray-600 duration-100 transition-colors active:text-white !ring-0 !outline-none !border-none px-2"
            on:click={() => {
                navigator.clipboard.writeText(`> ${chat.chat}\n`);
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="size-4"
                ><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
                    d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                /></svg
            >
        </button>
    </div>
</UIBox>
