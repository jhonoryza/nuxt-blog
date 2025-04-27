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

        <NuxtLink to="/prayers" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block sm:hidden">
            <!-- Tools Icon SVG -->
            <svg fill="#ffffff" class="w-5 h-5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 508.171 508.171" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M488.752,294.838h-10.667v-10.667c0-5.888-4.779-10.667-10.667-10.667H434.31 c-11.392-94.741-168.917-166.613-175.872-169.749c-1.365-0.619-2.837-0.917-4.309-0.917c29.397-0.021,53.291-23.936,53.291-53.333 c0-20.864-12.331-39.915-31.424-48.555c-4.096-1.835-8.832-0.96-11.947,2.176c-3.157,3.136-4.011,7.893-2.197,11.925 c1.92,4.245,2.901,8.661,2.901,13.12c0,17.643-14.357,32-32,32c-4.459,0-8.875-0.96-13.077-2.88 c-4.096-1.835-8.832-0.96-11.947,2.176c-3.157,3.136-4.011,7.893-2.197,11.925c8.619,19.072,27.648,31.424,48.512,31.445 c-1.472,0-2.944,0.299-4.309,0.917c-6.976,3.136-164.48,75.008-175.872,169.749H40.752c-5.888,0-10.667,4.779-10.667,10.667 v10.667H19.419c-5.888,0-10.667,4.779-10.667,10.667v192c0,5.888,4.779,10.667,10.667,10.667h170.667 c5.888,0,10.667-4.779,10.667-10.667v-85.333c0-4.8-3.157-8.853-7.509-10.197c10.005-17.067,41.557-34.304,60.843-42.325 c19.307,8.043,50.837,25.259,60.843,42.325c-4.352,1.344-7.509,5.397-7.509,10.197v85.333c0,5.888,4.779,10.667,10.667,10.667 h170.667c5.888,0,10.667-4.779,10.667-10.667v-192C499.419,299.617,494.64,294.838,488.752,294.838z M244.827,80.118 c19.733-4.587,35.285-20.139,39.893-39.851c0.896,2.965,1.365,6.059,1.365,9.237c0,17.643-14.357,32-32,32 C250.907,81.505,247.792,81.035,244.827,80.118z M254.086,125.281c24.896,11.947,147.669,74.475,158.891,148.224H95.195 C106.416,199.819,229.19,137.227,254.086,125.281z M478.086,486.838H328.731v-64c5.888,0,10.667-4.779,10.667-10.667 c0-41.493-73.152-70.763-81.515-73.963c-2.453-0.939-5.163-0.939-7.616,0c-8.341,3.2-81.515,32.491-81.515,73.963 c0,5.888,4.779,10.667,10.667,10.667v64H30.086V316.171h10.667c5.888,0,10.667-4.779,10.667-10.667v-10.667h405.333v10.667 c0,5.888,4.779,10.667,10.667,10.667h10.667V486.838z"></path> </g> </g> </g></svg>
            </span>
            <span class="hidden sm:block">Prayer</span>
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