<script lang="ts">
    import UIBox from "./UIBox.svelte";

    export let chat = {
        sender: "",
        chat: "",
        time: "",
    };
</script>

<UIBox class="ml-auto w-9/12 max-w-fit break-words !bg-gray-700">
    <h3>{@html chat.sender}</h3>
    <p>{@html chat.chat}</p>
</UIBox>
