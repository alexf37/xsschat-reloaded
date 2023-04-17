<script lang="ts">
    import UIBox from "./UIBox.svelte";
    import type { Chat } from "$src/types/custom";

    export let chat = {
        sender: "",
        chat: "",
        time: "",
    };
</script>

<UIBox class="w-9/12 max-w-fit break-words">
    <h3>{@html chat.sender}</h3>
    <p>{@html chat.chat}</p>
</UIBox>
