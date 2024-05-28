

Features:
 - Client Routing (+ usage of `navigate()`)
 - Data Fetching (server-side fetching + isomorphic fetching)
 - Pre-rendering (+ usage of the `onBeforePrerenderStart()` hook)
 - Route Function
 - TypeScript
 - Markdown
 - Error Page
 - Active Links
 - Access `pageContext` from any React component (using React Context)
 - HTML streaming
 - Page Transition Loading Animation

```bash
npm install
npm run dev
```
## Problem
Our current Docusaurus documentation portal, presents several challenges:

 - Scalability Issues: As our documentation grows, the cookie-cutter nature of Docusaurus limits customization and scalability. This has been revealed during Purple, the docusaurous multi instance just isnt great and its been an absolute headache to deal with.
 - Incredibly Slow Build Time: The build time for the documentation portal is incredibly slow, this makes.
 - Terrible Lighthouse Score: The current portal scores poorly on Lighthouse (mid 30s on average with SEO disabled), i think that can be improved and would be much easier.
 - Current Repo includes a ton of jank code to overide certain things so that we can have 2 instances of docs portal in 1 project. This makes it more and more fragile.


## Solution
We propose to develop a new documentation portal that leverages VikeJS and ViteJS to build a meta framework that will be lean and extensible while maintaining the ease of content updates through MDX files, file system routing, navbar auto generation based off of routes. This solution will:

 - Minimize turnaround when developers need to get involved.
 - Allow for quicker updates when developing content. Build time using vite is like < 5s and it has really good HMR (Hot Module Repload)
 - Enhance customization and scalability to better fit our needs
 - We will have complete access to the router which was one of the reasons why the old docs needed alot of the jank code it did.
 - Embedding sonrai frontend components will be much easier if we ever want to.
  
https://vitejs.dev/
https://vike.dev/

 - Filesystem Routing, Data fetching, Pre-rendering, Layouts, HMR, i18n, Link Prefetching, HTML Streaming.
 - Client Routing (fast page navigation) or Server Routing (simple architecture).
 - All render modes: SSR, SPA, MPA, SSG, HTML-only. Each page can use a different mode.


## TODO
[X] Create project skeleton (renderer, mdx config, vite config)
[X] Port some MDX files from docs portal and ensure the file system router can pick them up.
[ ] Port mermaid theme from the old docs portal.
[ ] Port static assets.
[ ] Configure lunar search.
[ ] Configure production build.
[ ] Dev Test deployment with the new build
