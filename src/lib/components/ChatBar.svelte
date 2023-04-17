<script lang="ts">
    import UIBox from "./UIBox.svelte";
    import RoomContainer from "./RoomContainer.svelte";

    export let emit: (chat: string) => void;
    export let room;
    export let name;

    function submit() {
        console.log("submit: " + chat);
        emit(chat);
        chat = "";
    }

    let chat = "";
</script>

<RoomContainer>
    <UIBox>
        <form
            class="flex flex-row items-center justify-between space-x-4 space-y-0"
            on:submit={submit}
        >
            <div class="w-full">
                <div class="flex items-center">
                    <label for="chat-box" class="sr-only">Chat Input</label>
                    <div class="relative w-full">
                        <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                        />
                        <input
                            type="text"
                            id="chat-box"
                            bind:value={chat}
                            class="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-400"
                            placeholder="XSSChat"
                        />
                    </div>
                </div>
            </div>
            <div
                class="flex flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0"
            >
                <button
                    type="submit"
                    class="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-700"
                >
                    Send
                </button>
            </div>
        </form>
    </UIBox>
</RoomContainer>
