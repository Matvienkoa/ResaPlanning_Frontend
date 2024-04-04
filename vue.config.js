const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// NEWS A TESTER
module.exports = {
  // ... d'autres options de configuration ...

  pwa: {
    workboxPluginMode: 'GenerateSW', // mode de génération automatique
    workboxOptions: {
      skipWaiting: true, // active le nouveau SW sans attendre la fermeture des onglets
      clientsClaim: true, // permet au SW de contrôler les clients dès qu'il est actif
      exclude: [/_redirects/], // vous pouvez exclure les fichiers qui ne devraient pas être pré-cachés
      // d'autres options spécifiques à Workbox...
    }
  }
};
