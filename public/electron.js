// eslint-disable-next-line import/no-extraneous-dependencies
const electron = require('electron');

const { app, BrowserWindow, Tray, ipcMain, nativeImage } = electron;
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

let tray;
let window;

const assetsDirectory = path.join(__dirname, 'resources');

// Don't show the app in the doc
// app.dock.hide();

const pth = path.join(assetsDirectory, '/icons/bmw.png');

const getWindowPosition = () => {
    const windowBounds = window.getBounds();
    const trayBounds = tray.getBounds();

    // Center window horizontally below the tray icon
    const x = Math.round(
        trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
    );

    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4);

    return { x, y };
};

const showWindow = () => {
    // const position = getWindowPosition();
    // window.setPosition(position.x, position.y, false);
    window.show();
    window.focus();
};

const toggleWindow = () => {
    if (window.isVisible()) {
        window.hide();
    } else {
        showWindow();
    }
};

const createWindow = () => {
    window = new BrowserWindow({
        width: 1200,
        height: 650,
        show: false,
        fullscreenable: false,
        resizable: false,
        titleBarStyle: 'hiddenInset',
        icon: path.join(assetsDirectory, 'icons/png/64x64.png'),
        webPreferences: {
            backgroundThrottling: false,
            nodeIntegration: true,
            webSecurity: !isDev,
            allowRunningInsecureContent: isDev,
            devTools: isDev,
        },
    });
    window.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    window.on('close', event => {
        event.preventDefault();
        window.hide();
        // eslint-disable-next-line no-param-reassign
        event.returnValue = false;
    });

    showWindow();
};

const createTray = () => {
    tray = new Tray(nativeImage.createFromPath(pth));
    // tray.setIgnoreDoubleClickEvents(true);
    // tray.on('right-click', toggleWindow);
    tray.on('double-click', toggleWindow);
    // tray.on('click', event => {
    //     toggleWindow();

    //     // Show devtools when command clicked
    //     if (window.isVisible() && process.defaultApp && event.metaKey) {
    //         window.openDevTools({ mode: 'detach' });
    //     }
    // });
};

ipcMain.on('show-window', () => {
    showWindow();
});

app.on('ready', () => {
    createTray();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
