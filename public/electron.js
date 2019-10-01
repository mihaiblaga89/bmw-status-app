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

app.on('ready', () => {
    createTray();
    createWindow();
});

const pth = path.join(assetsDirectory, '/icons/bmw.png');

const createTray = () => {
    tray = new Tray(nativeImage.createFromPath(pth));
    tray.setIgnoreDoubleClickEvents(true);
    tray.on('right-click', toggleWindow);
    tray.on('double-click', toggleWindow);
    tray.on('click', event => {
        toggleWindow();

        // Show devtools when command clicked
        if (window.isVisible() && process.defaultApp && event.metaKey) {
            window.openDevTools({ mode: 'detach' });
        }
    });
};

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

const createWindow = () => {
    window = new BrowserWindow({
        // width: 300,
        width: 1200,
        height: 450,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: true,
        icon: path.join(assetsDirectory, 'icons/png/64x64.png'),
        webPreferences: {
            // Prevents renderer process code from not running when window is
            // hidden
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

    // Hide the window when it loses focus
    window.on('blur', () => {
        if (!window.webContents.isDevToolsOpened()) {
            window.hide();
        }
    });

    toggleWindow();
};

const toggleWindow = () => {
    if (window.isVisible()) {
        window.hide();
    } else {
        showWindow();
    }
};

const showWindow = () => {
    const position = getWindowPosition();
    window.setPosition(position.x, position.y, false);
    window.show();
    window.focus();
};

ipcMain.on('show-window', () => {
    showWindow();
});

ipcMain.on('weather-updated', (event, weather) => {
    // Show "feels like" temperature in tray
    tray.setTitle(`${Math.round(weather.currently.apparentTemperature)}°`);

    // Show summary and last refresh time as hover tooltip
    const time = new Date(weather.currently.time).toLocaleTimeString();
    tray.setToolTip(`${weather.currently.summary} at ${time}`);

    // Update icon for different weather types
    switch (weather.currently.icon) {
        case 'cloudy':
        case 'fog':
        case 'partly-cloudy-day':
        case 'partly-cloudy-night':
            tray.setImage(path.join(assetsDirectory, 'cloudTemplate.png'));
            break;
        case 'rain':
        case 'sleet':
        case 'snow':
            tray.setImage(path.join(assetsDirectory, 'umbrellaTemplate.png'));
            break;
        case 'clear-night':
            tray.setImage(path.join(assetsDirectory, 'moonTemplate.png'));
            break;
        case 'wind':
            tray.setImage(path.join(assetsDirectory, 'flagTemplate.png'));
            break;
        case 'clear-day':
        default:
            tray.setImage(path.join(assetsDirectory, 'sunTemplate.png'));
    }
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
