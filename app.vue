<template>
  <div class="bg-gray-900 text-white dark:bg-gray-900">
    <div class="container mx-auto flex flex-col min-h-screen font-rubik">
      <nav class="pt-2 w-full fixed sm:relative flex flex-col sm:flex-row gap-4 justify-between items-center uppercase
        text-base font-semibold bg-gray-900 shadow-lg sm:shadow-none z-50 border-b sm:border-b border-gray-500"
      >
        <Logo />
        <TopNav />
      </nav>
      <main class="mt-20 sm:mt-10 grow">
        <NuxtPage/>
      </main>
      <Footer />
    </div>
  </div>
</template>

