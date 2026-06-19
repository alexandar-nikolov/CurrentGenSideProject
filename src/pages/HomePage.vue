<template>
<div class="fdashboard-container">

    <div class="dashboard-grid">
      
      <router-link to="/damage-identifier" class="dashboard-card">
        <div class="card-icon-container icon-bg-blue">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 2rem; height: 2rem;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15M12 9v6m-3-3h6" />
          </svg>
        </div>
        <h2 class="card-title">Damage Identifier</h2>
        <p class="card-description">Upload a photo and let AI identify damage type, severity and confidence level.</p>
      </router-link>

      <router-link to="/damage-library" class="dashboard-card">
        <div class="card-icon-container icon-bg-indigo">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 2rem; height: 2rem;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h2 class="card-title">Damage Library</h2>
        <p class="card-description">Browse and search the damage reference library for past records and examples.</p>
      </router-link>

      <router-link to="/pdf-to-instructions" class="dashboard-card">
        <div class="card-icon-container icon-bg-blue">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 2rem; height: 2rem;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </div>
        <h2 class="card-title">PDF to Instructions</h2>
        <p class="card-description">Convert PDF documents into structured, step-by-step work instructions.</p>
      </router-link>
     
    </div>
  </div>


</template>