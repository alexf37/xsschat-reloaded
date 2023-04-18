<script lang="ts">
    import UIBox from "./UIBox.svelte";

    export let chat = {
        sender: "",
        chat: "",
        time: "",
    };
</script>

<UIBox class="w-9/12 max-w-fit space-y-1 break-words">
    <h3 class="text-xs text-gray-400">{@html `${chat.sender} · ${chat.time}`}</h3>
    <p>{@html chat.chat}</p>
</UIBox>
