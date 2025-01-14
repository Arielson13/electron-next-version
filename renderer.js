document.addEventListener('DOMContentLoaded', () => {
    const info = document.getElementById('info');
    const themeSource = document.getElementById('theme-source');
    const body = document.body;
  
    // Atualiza o tema do body
    const updateBodyTheme = (isDarkMode) => {
      if (isDarkMode) {
        body.classList.add('dark');
        body.classList.remove('light');
      } else {
        body.classList.add('light');
        body.classList.remove('dark');
      }
    };
  
    // Configura a troca de tema
    document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
      const isDarkMode = await window.api.darkMode.toggle();
      themeSource.innerText = isDarkMode ? 'Dark' : 'Light';
      updateBodyTheme(isDarkMode);
    });
  
    // Reseta o tema para o padrão do sistema
    document.getElementById('reset-to-system').addEventListener('click', async () => {
      const isDarkMode = await window.api.darkMode.system();
      themeSource.innerText = isDarkMode ? 'Dark (System)' : 'Light (System)';
      updateBodyTheme(isDarkMode);
    });
  
    // Exibe informações sobre a versão
    info.innerText = `Electron App`;
  });
  