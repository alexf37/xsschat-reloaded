<script lang="ts">
    import UIBox from "./UIBox.svelte";

    export let chat = {
        sender: "",
        chat: "",
        time: "",
    };
</script>

<UIBox class="ml-auto w-9/12 max-w-fit space-y-1 break-words !bg-gray-700 text-right">
    <h3 class="text-xs text-gray-400">{@html `${chat.sender} · ${chat.time}`}</h3>
    <p>{@html chat.chat.split('\n').join('<br>')}</p>
</UIBox>
