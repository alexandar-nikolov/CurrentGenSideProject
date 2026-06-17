<template>
<div class="flex items-center justify-center min-h-[60vh] px-6 py-12">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      
      
      <router-link 
        to="/damage-library" 
        class="flex flex-col items-center text-center bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
      >
       
        <div class="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-2xl mb-6 shadow-sm group-hover:scale-105 transition-transform duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15M12 9v6m-3-3h6" />
          </svg>
        </div>
        
        
        <h2 class="text-xl font-bold text-gray-900 mb-2">Damage identifier</h2>
        <p class="text-gray-500 text-sm max-w-xs leading-relaxed">
          Upload a photo and let AI Identify damage type, severity and confidence level.
        </p>
      </router-link>

    
      <router-link 
        to="/pdf-to-instructions" 
        class="flex flex-col items-center text-center bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
      >
       
        <div class="w-16 h-16 flex items-center justify-center bg-indigo-600 text-white rounded-2xl mb-6 shadow-sm group-hover:scale-105 transition-transform duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </div>
        
       
        <h2 class="text-xl font-bold text-gray-900 mb-2">PDF to Instructions</h2>
        <p class="text-gray-500 text-sm max-w-xs leading-relaxed">
          Convert PDF documents into structured, step-by-step work instructions.
        </p>
      </router-link>

    </div>
  </div>


</template>
