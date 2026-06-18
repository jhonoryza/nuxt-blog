<style>
.router-link-active {
    @apply bg-primary text-primary-foreground;
}
</style>
<script setup>
const route = useRoute()
const isPostsActive = computed(() => {
  return route.path === '/' || route.path === '/posts' || route.path.startsWith('/posts/')
})
</script>
<template>
    <div class="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <NuxtLink to="/" class="hover:bg-muted p-2 items-center flex lg:hidden rounded-md">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconTransfer">
                    <path
                        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                        stroke="currentColor" stroke-width="1.5"></path>
                    <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                </g>
            </svg>
        </NuxtLink>

        <NuxtLink to="/posts" class="hover:bg-muted hover:text-primary p-2 flex items-center rounded-md" :class="{ 'bg-primary text-primary-foreground': isPostsActive }">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 block lg:hidden" fill="currentColor" viewBox="0 0 32 32">
                <g data-name="47-Note Book">
                    <path
                        d="M27 0H7a4 4 0 0 0-4 4v1H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v1a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4zM7 30a2 2 0 0 1-2-2v-1h2zm0-5H5v-3h2zm0-5H5v-3h2zm0-5H5v-3h2zm0-5H5V7h2zm0-5H5V4a2 2 0 0 1 2-2zm22 23a2 2 0 0 1-2 2H9V2h3v11a1 1 0 0 0 1.55.83L16 12.2l2.45 1.63A1 1 0 0 0 20 13V2h7a2 2 0 0 1 2 2z" />
                    <path d="M25 5h-3v2h2v2h-2v2h3a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z" />
                </g>
            </svg>
            <span class="hidden lg:block uppercase">Posts</span>
        </NuxtLink>

        <NuxtLink to="/tools" class="hover:bg-muted hover:text-primary p-2 flex items-center rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 block lg:hidden" viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M14.7 6.3a1 1 0 00-1.4 1.4l2.6 2.6-3.5 3.5-2.6-2.6a1 1 0 00-1.4 1.4l2.6 2.6-5.3 5.3H2v-2.8l5.3-5.3 2.6 2.6a1 1 0 001.4-1.4L9.4 9.4l3.5-3.5 2.6 2.6a1 1 0 001.4-1.4l-2.6-2.6z" />
            </svg>
            <span class="hidden lg:block uppercase">Tools</span>
        </NuxtLink>

        <NuxtLink to="/work-with-me" class="hover:bg-muted hover:text-primary p-2 flex items-center rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 block lg:hidden" viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
            <span class="hidden lg:block uppercase">Me</span>
        </NuxtLink>

        <NuxtLink to="/about" class="hover:bg-muted hover:text-primary p-2 flex items-center rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 block lg:hidden" viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            <span class="hidden lg:block uppercase">About</span>
        </NuxtLink>

        <NuxtLink to="/chat" class="hover:bg-muted hover:text-primary p-2 flex items-center rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 block lg:hidden" fill="currentColor" viewBox="0 0 24 24"
                aria-hidden="true" role="img">
                <title>Chat</title>
                <desc>Simple chat bubble with three dots</desc>
                <path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                    stroke-linejoin="round" d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
                <circle cx="8.5" cy="11.5" r="0.9" fill="currentColor" />
                <circle cx="12" cy="11.5" r="0.9" fill="currentColor" />
                <circle cx="15.5" cy="11.5" r="0.9" fill="currentColor" />
            </svg>
            <span class="hidden lg:block uppercase">Chat</span>
        </NuxtLink>

        <NuxtLink to="/cv" class="hover:bg-muted hover:text-primary p-2 flex items-center rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 block lg:hidden" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                role="img" aria-hidden="true">
                <title>Curriculum Vitae</title>
                <desc>Simple document icon commonly used to represent a CV</desc>
                <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <polyline points="15 2 15 7 20 7" />
                <line x1="8" y1="11" x2="16" y2="11" />
                <line x1="8" y1="15" x2="16" y2="15" />
                <line x1="8" y1="19" x2="14" y2="19" />
            </svg>
            <span class="hidden lg:block uppercase">CV</span>
        </NuxtLink>
    </div>
</template>
