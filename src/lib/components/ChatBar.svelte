<script lang="ts">
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

<section class="flex h-screen items-end bg-gray-900 pb-12">
    <div class="mx-auto w-full max-w-screen-xl px-4">
        <!-- Start coding here -->
        <div class="relative rounded-lg bg-gray-800 shadow-md">
            <form
                class="flex flex-row items-center justify-between space-x-4 space-y-0 p-4"
                on:submit={submit}
            >
                <div class="w-full">
                    <div class="flex items-center">
                        <label for="chat-box" class="sr-only">Chat Input</label>
                        <div class="relative w-full">
                            <div
                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                            />
                            <!-- svelte-ignore a11y-autofocus -->
                            <input
                                type="text"
                                id="chat-box"
                                bind:value={chat}
                                class="focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                                placeholder="XSSChat"
                                autofocus
                            />
                        </div>
                    </div>
                </div>
                <div
                    class="flex flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0"
                >
                    <button
                        type="submit"
                        class="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-800"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>
