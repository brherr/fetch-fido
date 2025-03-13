import{r as a,t as i,j as e}from"./index-HefFj2k7.js";import{u as d,S as n,D as l,L as c,H as m,a as x}from"./SideBarWrapper-KBqj3NJk.js";import{u as h,B as u}from"./useLogin-CjoObKxH.js";const j=function(){const s=h(r=>r.favorites),{data:t,error:o}=d({queryKey:["fetchDogs",s],queryFn:()=>x(s),enabled:s.length>0});return a.useEffect(()=>{o&&i.error("Failed to load dogs",{description:"Please try again or check your connection"})},[o]),e.jsx(n,{children:t?e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full",children:t.map(r=>e.jsx(l,{dog:r},r.id))}):e.jsx("div",{className:"flex justify-center items-center h-full w-full",children:e.jsxs("div",{className:"max-w-md w-full bg-card shadow-sm border border-slate-200 rounded-xl overflow-hidden transition duration-300 hover:shadow-md p-6",children:[e.jsxs("div",{className:"text-center mb-4",children:[e.jsx("h2",{className:"text-2xl font-bold text-primary",children:"No Favorites Found"}),e.jsx("p",{className:"text-muted-foreground mt-2 max-w-xs mx-auto",children:"Select some favorite dogs to get matched with your perfect companion!"})]}),e.jsx("div",{className:"p-4 flex flex-col items-center",children:e.jsx(c,{to:"/",children:e.jsxs(u,{className:"rounded-md w-full py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg active:shadow-none cursor-pointer bg-chart-5 text-white hover:bg-cyan-700 active:bg-cyan-700",type:"button",children:[e.jsx(m,{className:"mr-2"}),"Select Favorites"]})})})]})})})};export{j as component};
