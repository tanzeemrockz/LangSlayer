import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: { enabled: true },
            manifest: {
                name: 'LangSlayer',
                short_name: 'LangSlayer',
                description: 'Translates technical jargon into accessible analogies.',
                theme_color: '#ffffff'
                icons: [
                    {
                        src: 'https://via.placeholder.com/192',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'https://via.placeholder.com/512',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ]
})