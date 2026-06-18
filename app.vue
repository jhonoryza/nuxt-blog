<template>
    <div class="bg-background text-foreground">
        <div class="flex flex-col min-h-screen font-sans">
            <nav class="w-full fixed sm:relative flex justify-between items-center px-4 py-2 text-base font-semibold bg-background shadow-lg sm:shadow-none z-50 border-b border-border">
                <Logo />
                <TopNav />
            </nav>
            <main class="mt-20 sm:mt-10 grow">
                <NuxtPage />
            </main>
            <Footer />
        </div>
    </div>
</template>
