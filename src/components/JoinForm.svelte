<script lang="ts">
    function submit(e: Event) {
        console.log("test");
    }
</script>

<svelte:head>
    <title>XSSChat</title>
</svelte:head>
<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 text-center">
    <form class="space-y-6" action="#">
        <h1 class="text-5xl tracking-wide font-black text-orange-500 my-8">XSSChat</h1>
       
            <input type="text" name="code" id="code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Room Code" required>
     
            <input type="text" name="name" id="name" placeholder="Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
    

        <button type="submit" class="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Join Room</button>
        
    </form>
</div>