<template>
    <div class="flex gap-2 sm:gap-12">
        <NuxtLink to="/posts" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block sm:hidden">
            <!-- Blog Icon SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 32 32"><g data-name="47-Note Book"><path d="M27 0H7a4 4 0 0 0-4 4v1H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v1a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4zM7 30a2 2 0 0 1-2-2v-1h2zm0-5H5v-3h2zm0-5H5v-3h2zm0-5H5v-3h2zm0-5H5V7h2zm0-5H5V4a2 2 0 0 1 2-2zm22 23a2 2 0 0 1-2 2H9V2h3v11a1 1 0 0 0 1.55.83L16 12.2l2.45 1.63A1 1 0 0 0 20 13V2h7a2 2 0 0 1 2 2z"/><path d="M25 5h-3v2h2v2h-2v2h3a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z"/></g></svg>
            </span>
            <span class="hidden sm:block">Blog</span>
        </NuxtLink>

        <NuxtLink to="/tools" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block sm:hidden">
            <!-- Tools Icon SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.7 6.3a1 1 0 00-1.4 1.4l2.6 2.6-3.5 3.5-2.6-2.6a1 1 0 00-1.4 1.4l2.6 2.6-5.3 5.3H2v-2.8l5.3-5.3 2.6 2.6a1 1 0 001.4-1.4L9.4 9.4l3.5-3.5 2.6 2.6a1 1 0 001.4-1.4l-2.6-2.6z"/>
            </svg>
            </span>
            <span class="hidden sm:block">Tools</span>
        </NuxtLink>

        <NuxtLink to="/work-with-me" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block sm:hidden">
            <!-- Me Icon SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
            </svg>
            </span>
            <span class="hidden sm:block">Me</span>
        </NuxtLink>

        <NuxtLink to="/about" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block sm:hidden">
            <!-- About Icon SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
            </svg>
            </span>
            <span class="hidden sm:block">About</span>
        </NuxtLink>
    </div>
</template>