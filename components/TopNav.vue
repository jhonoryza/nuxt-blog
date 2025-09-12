<template>
    <div class="flex gap-2 sm:gap-12">
        <NuxtLink class="flex lg:hidden hover:bg-link hover:text-white p-2 items-center" to="/">
            <span>
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                            stroke="#f5f5f5" stroke-width="1.5"></path>
                        <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
                            stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"></path>
                    </g>
                </svg>
            </span>
        </NuxtLink>
        <NuxtLink to="/posts" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block lg:hidden">
                <!-- Blog Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
                    <g data-name="47-Note Book">
                        <path
                            d="M27 0H7a4 4 0 0 0-4 4v1H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v3H1a2 2 0 0 0 2 2v1a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4zM7 30a2 2 0 0 1-2-2v-1h2zm0-5H5v-3h2zm0-5H5v-3h2zm0-5H5v-3h2zm0-5H5V7h2zm0-5H5V4a2 2 0 0 1 2-2zm22 23a2 2 0 0 1-2 2H9V2h3v11a1 1 0 0 0 1.55.83L16 12.2l2.45 1.63A1 1 0 0 0 20 13V2h7a2 2 0 0 1 2 2z" />
                        <path d="M25 5h-3v2h2v2h-2v2h3a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z" />
                    </g>
                </svg>
            </span>
            <span class="hidden lg:block">Posts</span>
        </NuxtLink>

        <NuxtLink to="/tools" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block lg:hidden">
                <!-- Tools Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M14.7 6.3a1 1 0 00-1.4 1.4l2.6 2.6-3.5 3.5-2.6-2.6a1 1 0 00-1.4 1.4l2.6 2.6-5.3 5.3H2v-2.8l5.3-5.3 2.6 2.6a1 1 0 001.4-1.4L9.4 9.4l3.5-3.5 2.6 2.6a1 1 0 001.4-1.4l-2.6-2.6z" />
                </svg>
            </span>
            <span class="hidden lg:block">Tools</span>
        </NuxtLink>

        <NuxtLink to="/prayers" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block lg:hidden">
                <!-- Tools Icon SVG -->
                <svg fill="#ffffff" class="w-5 h-5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 508.171 508.171" xml:space="preserve"
                    stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <g>
                                <path
                                    d="M488.752,294.838h-10.667v-10.667c0-5.888-4.779-10.667-10.667-10.667H434.31 c-11.392-94.741-168.917-166.613-175.872-169.749c-1.365-0.619-2.837-0.917-4.309-0.917c29.397-0.021,53.291-23.936,53.291-53.333 c0-20.864-12.331-39.915-31.424-48.555c-4.096-1.835-8.832-0.96-11.947,2.176c-3.157,3.136-4.011,7.893-2.197,11.925 c1.92,4.245,2.901,8.661,2.901,13.12c0,17.643-14.357,32-32,32c-4.459,0-8.875-0.96-13.077-2.88 c-4.096-1.835-8.832-0.96-11.947,2.176c-3.157,3.136-4.011,7.893-2.197,11.925c8.619,19.072,27.648,31.424,48.512,31.445 c-1.472,0-2.944,0.299-4.309,0.917c-6.976,3.136-164.48,75.008-175.872,169.749H40.752c-5.888,0-10.667,4.779-10.667,10.667 v10.667H19.419c-5.888,0-10.667,4.779-10.667,10.667v192c0,5.888,4.779,10.667,10.667,10.667h170.667 c5.888,0,10.667-4.779,10.667-10.667v-85.333c0-4.8-3.157-8.853-7.509-10.197c10.005-17.067,41.557-34.304,60.843-42.325 c19.307,8.043,50.837,25.259,60.843,42.325c-4.352,1.344-7.509,5.397-7.509,10.197v85.333c0,5.888,4.779,10.667,10.667,10.667 h170.667c5.888,0,10.667-4.779,10.667-10.667v-192C499.419,299.617,494.64,294.838,488.752,294.838z M244.827,80.118 c19.733-4.587,35.285-20.139,39.893-39.851c0.896,2.965,1.365,6.059,1.365,9.237c0,17.643-14.357,32-32,32 C250.907,81.505,247.792,81.035,244.827,80.118z M254.086,125.281c24.896,11.947,147.669,74.475,158.891,148.224H95.195 C106.416,199.819,229.19,137.227,254.086,125.281z M478.086,486.838H328.731v-64c5.888,0,10.667-4.779,10.667-10.667 c0-41.493-73.152-70.763-81.515-73.963c-2.453-0.939-5.163-0.939-7.616,0c-8.341,3.2-81.515,32.491-81.515,73.963 c0,5.888,4.779,10.667,10.667,10.667v64H30.086V316.171h10.667c5.888,0,10.667-4.779,10.667-10.667v-10.667h405.333v10.667 c0,5.888,4.779,10.667,10.667,10.667h10.667V486.838z">
                                </path>
                            </g>
                        </g>
                    </g>
                </svg>
            </span>
            <span class="hidden lg:block">Prayer</span>
        </NuxtLink>

        <NuxtLink to="/alquran" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block lg:hidden">
                <!-- Tools Icon SVG -->
                <svg fill="#ffffff" class="w-5 h-5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <g>
                                <path
                                    d="M508.232,396.615c-5.974-9.187-16.873-12.727-27.124-8.811c-15.89,6.073-32.443,10.687-49.201,13.712 c-5.243,0.947-8.727,5.966-7.78,11.209s5.967,8.72,11.209,7.78c17.936-3.239,35.652-8.177,52.66-14.677 c2.121-0.813,3.379,0.261,4.058,1.306c0.96,1.475,0.812,2.863-0.441,4.121c-52.26,52.524-121.843,81.449-195.931,81.449 c-73.883,0-143.304-28.734-195.479-80.91S19.295,290.196,19.295,216.315c0-74.09,28.926-143.672,81.45-195.93 c1.258-1.253,2.643-1.402,4.121-0.441c1.043,0.678,2.117,1.933,1.304,4.058c-12.869,33.67-19.393,69.177-19.393,105.536 c0,78.724,30.828,152.907,86.805,208.883c55.978,55.977,130.161,86.803,208.884,86.801c5.329,0,9.648-4.32,9.648-9.648 s-4.32-9.648-9.648-9.648c-73.57,0.001-142.908-28.818-195.24-81.149c-52.332-52.331-81.154-121.669-81.154-195.239 c0-33.995,6.097-67.184,18.122-98.647c3.917-10.25,0.377-21.15-8.811-27.124c-9.15-5.948-20.502-4.767-28.248,2.939 C30.946,62.612,0,137.053,0,216.315c0,79.036,30.741,153.304,86.561,209.124c55.82,55.821,130.088,86.561,209.124,86.561 c79.261,0,153.7-30.946,209.609-87.134C513.001,417.117,514.182,405.765,508.232,396.615z">
                                </path>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path
                                    d="M459.859,111.677c-2.306-7.101-8.329-12.178-15.717-13.251l-47.307-6.874L375.68,48.687 c-3.303-6.694-9.994-10.853-17.458-10.853s-14.155,4.159-17.46,10.853l-21.156,42.866L272.3,98.428 c-7.388,1.073-13.41,6.151-15.717,13.251c-2.306,7.101-0.418,14.748,4.927,19.958l34.231,33.366l-8.081,47.115 c-1.262,7.358,1.706,14.654,7.745,19.042c6.039,4.388,13.896,4.955,20.504,1.482l42.312-22.245l42.313,22.245 c2.874,1.51,5.984,2.256,9.078,2.256c4.02,0,8.013-1.259,11.425-3.739c6.039-4.388,9.007-11.684,7.745-19.042l-8.081-47.115 l34.23-33.365C460.277,126.425,462.166,118.778,459.859,111.677z M441.462,117.818L403.6,154.725 c-2.274,2.216-3.311,5.41-2.775,8.539l8.956,52.196c-0.028,0.054-0.141,0.138-0.27,0.102l-46.801-24.604 c-2.812-1.477-6.168-1.477-8.979,0l-46.872,24.648c-0.059-0.009-0.171-0.09-0.181-0.226l8.938-52.114 c0.536-3.13-0.5-6.322-2.775-8.539l-37.925-36.963c-0.009-0.059,0.033-0.19,0.159-0.242l52.325-7.604 c3.143-0.457,5.858-2.43,7.264-5.278l23.433-47.491c0.035-0.018,0.103-0.024,0.156-0.024c0.03,0,0.055,0.003,0.067,0.005 c0,0,0.023,0.026,0.057,0.095l23.4,47.415c1.406,2.847,4.121,4.821,7.264,5.278l52.41,7.611 C441.492,117.571,441.534,117.702,441.462,117.818z">
                                </path>
                            </g>
                        </g>
                    </g>
                </svg>
            </span>
            <span class="hidden lg:block">AlQuran</span>
        </NuxtLink>

        <NuxtLink to="/work-with-me" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block lg:hidden">
                <!-- Me Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
            </span>
            <span class="hidden lg:block">Me</span>
        </NuxtLink>

        <NuxtLink to="/about" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block lg:hidden">
                <!-- About Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
            </span>
            <span class="hidden lg:block">About</span>
        </NuxtLink>

        <NuxtLink to="/chat" class="hover:bg-link hover:text-white p-2 flex items-center">
            <span class="block lg:hidden">
                <!-- Chat Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                    aria-hidden="true" role="img">
                    <title>Chat</title>
                    <desc>Simple chat bubble with three dots</desc>
                    <path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                        stroke-linejoin="round" d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
                    <circle cx="8.5" cy="11.5" r="0.9" fill="currentColor" />
                    <circle cx="12" cy="11.5" r="0.9" fill="currentColor" />
                    <circle cx="15.5" cy="11.5" r="0.9" fill="currentColor" />
                </svg>

            </span>
            <span class="hidden lg:block">Chat</span>
        </NuxtLink>
    </div>
</template>
