# HIIT Coach - Deploy Package (Supabase + Netlify)

This package is a deploy-ready source for the HIIT Coach app. It includes Supabase integration (auth + schema) and Netlify build configuration.

## What is included
- Vite + React source code
- Supabase client setup using environment variables
- Supabase SQL schema (`supabase_schema.sql`) to run in your Supabase project
- `netlify.toml` with build command and publish dir
- Placeholder Lottie animations in `public/animations/`
- README with setup instructions

## Quick Local Test (Windows 11)
1. Install Node.js (v18+) and npm.
2. In the project root, open PowerShell/Terminal and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

## Deploy to Netlify (recommended: Git deploy)
1. Create a repository on GitHub and push this project.
2. On Netlify, choose "New site" → "Import from Git" → connect GitHub → select repo.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. In Netlify site settings → Build & Deploy → Environment, add the following environment variables:
   - VITE_SUPABASE_URL = https://lvluegkftyfiyfvkaisr.supabase.co
   - VITE_SUPABASE_ANON_KEY = <YOUR_ANON_KEY_FROM_SUPABASE>
5. Deploy; Netlify will build and publish the site and provide a live URL.

## Supabase setup
1. In Supabase, go to SQL Editor and run `supabase_schema.sql` to create the tables.
2. In Supabase project settings → API, confirm your Project URL and anon key.
3. In Supabase Auth → enable Email sign-in (magic link) in Settings → Auth Settings.

## Notes
- This package contains placeholders and minimal implementation. After deployment, you can sign in using Supabase magic-link, then save your profile which writes to the `users` table.
- If you want, I can complete the remaining screens (workout builder, tracker saving to Supabase, group invites) and produce a final build ready for immediate Netlify Drop upload.
