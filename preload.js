const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  darkMode: {
    // Alterna o tema e retorna o estado atualizado
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    // Reseta para o tema padrão do sistema e retorna o estado atualizado
    system: () => ipcRenderer.invoke('dark-mode:system'),
  },
});
