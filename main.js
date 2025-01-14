const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("path");

// Função para criar a janela principal
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 450,
    maximizable: false,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"), // Caminho absoluto para o preload.js
    },
  });

  win.setMenuBarVisibility = false;
  win.loadFile("index.html");
};

// Evento para alternar o tema escuro/claro
ipcMain.handle("dark-mode:toggle", () => {
  // Inverte o tema atual
  nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? "light" : "dark";
  // Retorna o estado atualizado (true para escuro, false para claro)
  return nativeTheme.shouldUseDarkColors;
});

// Evento para resetar o tema para o padrão do sistema
ipcMain.handle("dark-mode:system", () => {
  // Define o tema como o padrão do sistema
  nativeTheme.themeSource = "system";
  // Retorna o estado atual (true para escuro, false para claro)
  return nativeTheme.shouldUseDarkColors;
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
