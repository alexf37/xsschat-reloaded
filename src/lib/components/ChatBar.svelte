<script lang="ts">
    import { onMount, tick } from "svelte";
    import UIBox from "./UIBox.svelte";
    import { pngToWebpBase64 } from "$lib/squoosh";

    export let emit: (chat: string) => void;
    let chatbar: HTMLTextAreaElement;
    let chat = "";
    const chatHistory: string[] = [];
    const chatFuture: string[] = [];

    let minRows = 1;

    $: minHeight = `${1 + minRows * 1.2}em`;
    $: maxHeight = `auto`;

    onMount(() => {
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
                    return;
                }
                let elem = `<${elemName}></${elemName}>`;
                let newInput = message.slice(0, insertIndex) + elem + message.slice(cursorPosition);
                chat = newInput;
                cursorPosition =
                    (message.slice(0, insertIndex) + elem).length - `</${elemName}>`.length;
                await tick();
                chatbar.setSelectionRange(cursorPosition, cursorPosition);
            }
        });
        chatbar.addEventListener("paste", async function (e: ClipboardEvent) {
            if (!navigator.clipboard) return;

            const clipboardItems = e.clipboardData?.files;

            // Make sure there is clipboard content and at least one file is pasted
            if (clipboardItems && clipboardItems.length > 0) {
                const file: File = clipboardItems[0];

                // Check if the file is an image
                if (file.type.startsWith("image/")) {
                    const reader: FileReader = new FileReader();

                    reader.onload = async (e: ProgressEvent<FileReader>) => {
                        // e.target.result represents the Base64 encoded image
                        const base64String = e.target?.result;

                        if (typeof base64String === "string") {
                            console.log("Base64 length: " + base64String.length);
                            const isSafari =
                                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
                                navigator.userAgent.indexOf("CriOS") === -1;
                            if (!isSafari) {
                                const webpBase64 = await pngToWebpBase64(base64String);
                                console.log("WebP base64 length: " + webpBase64.length);
                                chat = chat + `<img src="${webpBase64}" />`;
                            } else {
                                chat = chat + `<img src="${base64String}" />`;
                            }
                        }
                    };

                    // Read the file and trigger the onload event when the file is read
                    reader.readAsDataURL(file);
                }
            }
        });
        chatbar.addEventListener("keydown", async function (e) {
            if (e.shiftKey) {
                if (e.code == "ArrowUp") {
                    e.preventDefault();
                    let message = chatHistory.pop();
                    if (message) {
                        chatFuture.push(chat);
                        chat = message;
                    }
                }
                if (e.code == "ArrowDown") {
                    e.preventDefault();
                    let message = chatFuture.pop();
                    if (message) {
                        chatHistory.push(chat);
                        chat = message;
                    }
                }
            }
            if (e.code == "Enter") {
                if (e.shiftKey) return;
                e.preventDefault();
                submit();
            }
            // if (closablePunctuation.some((p) => p[1] == e.key)) {
            //     e.preventDefault();
            //     let cursor = chatbar.selectionStart ?? 0;
            //     const [open, close] = closablePunctuation.find((p) => p[1] == e.key) ?? ["", ""];
            //     if (chat.slice(cursor, cursor + close.length) === close) return;
            //     chat = chat.slice(0, cursor) + close + chat.slice(cursor);
            //     await tick();
            //     chatbar.setSelectionRange(cursor + 1, cursor + 1);
            // }
        });
    });

    function submit() {
        chat = (document.querySelector("#chat-box") as HTMLTextAreaElement)?.value ?? "";
        if (!chat) return;
        emit(chat);
        chatHistory.push(chat);
        chat = "";
    }
</script>

<UIBox class="z-50 mt-auto w-full">
    <form
        class="flex max-w-full overflow-hidden flex-row items-center justify-between gap-4"
        on:submit={submit}
    >
        <label for="chat-box" class="sr-only">Chat Input</label>
        <!-- svelte-ignore a11y-autofocus -->
        <div class="relative flex-1 max-w-full overflow-hidden">
            <pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight}">{chat +
                    "\n"}</pre>
            <textarea
                id="chat-box"
                bind:value={chat}
                bind:this={chatbar}
                class="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-400"
                placeholder="XSSChat"
                autocomplete="off"
                autocorrect="off"
                autofocus
            ></textarea>
        </div>
        <button
            type="submit"
            class="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-700"
        >
            Send
        </button>
    </form>
</UIBox>

<style>
    pre,
    textarea {
        line-height: 1.4;
        overflow: hidden;
    }

    textarea {
        position: absolute;
        height: 100%;
        top: 0;
        resize: none;
    }
</style>
