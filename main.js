var electron = require('electron');
var app = electron.app;  // Module to control application life.
var BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
var ROOTPATH = global.process.cwd();
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;
// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});
console.log( ROOTPATH )
var createWindow = function() {
  // Create the browser window.
  mainWindow = new BrowserWindow(
	 {
        //width: 800,//Integer - Window's width in pixels. Default is `800`.
        //height: 600,//Integer - Window's height in pixels. Default is `600`.
        //x: undefined,//Integer - Window's left offset from screen. Default is to center the window.
        //y: undefined,//Integer - Window's top offset from screen. Default is to center the window.
        useContentSize: false, //Boolean - The `width` and `height` would be used as web page's size, which means the actual window's size will include window frame's size and be slightly larger. Default is `false`.
        //Boolean - Show window in the center of the screen.
        center: undefined,
        minWidth: 0, //Integer - Window's minimum width. Default is `0`.
        minHeight: 0, //Integer - Window's minimum height. Default is `0`.
        maxWidth: undefined, //Integer - Window's maximum width. Default is no limit.
        maxHeight: undefined, //Integer - Window's maximum height. Default is no limit.
        resizable: true, //Boolean - Whether window is resizable. Default is `true`.
        alwaysOnTop: false, //Boolean - Whether the window should always stay on top of other windows. Default is `false`.
        fullscreen: false, //Boolean - Whether the window should show in fullscreen. When set to `false` the fullscreen button will be hidden or disabled on OS X. Default is `false`.
        skipTaskbar: false, //Boolean - Whether to show the window in taskbar. Default is `false`.
        kiosk: false, //Boolean - The kiosk mode. Default is `false`.
        title: "Sukjune", //String - Default window title. Default is `'Electron'`.
        icon: ROOTPATH + './electron_root/pine-tree.ico', //[NativeImage](https://github.com/atom/electron/blob/master/docs/api/native-image.md) - The window icon, when omitted on Windows the executable's icon would be used as window icon.
        show: true, //Boolean - Whether window should be shown when created. Default is `true`.
        frame: true, //Boolean - Specify `false` to create a [Frameless Window](https://github.com/atom/electron/blob/master/docs/api/frameless-window.md). Default is `true`.
        acceptFirstMouse: false, //Boolean - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
        disableAutoHideCursor: false, //Boolean - Whether to hide cursor when typing. Default is `false`.
        autoHideMenuBar: true, //Boolean - Auto hide the menu bar unless the `Alt` key is pressed. Default is `false`.
        enableLargerThanScreen: false, //Boolean - Enable the window to be resized larger than screen. Default is `false`.
        backgroundColor: "#FFF", //String - Window's background color as Hexadecimal value, like `#66CD00` or `#FFF`. This is only implemented on Linux and Windows. Default is `#000` (black).
        darkTheme: false, //Boolean - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is `false`.
        transparent: false, //Boolean - Makes the window [transparent](https://github.com/atom/electron/blob/master/docs/api/frameless-window.md). Default is `false`.
        //String - Specifies the type of the window, which applies additional platform-specific properties. By default it's undefined and you'll get a regular app window. Supported values:
        //* On Linux, possible types are `desktop`, `dock`, `toolbar`, `splash`, `notification`.
        //* On OS X, possible types are `desktop`, `textured`. The `textured` type adds metal gradient appearance (`NSTexturedBackgroundWindowMask`). The `desktop` type places the window at the desktop background window level (`kCGDesktopWindowLevel - 1`). Note that desktop window will not receive focus, keyboard or mouse events, but you can use `globalShortcut` to receive input sparingly.
        type: undefined,
        //String, OS X - specifies the style of window title bar. This option is supported on OS X 10.10 Yosemite and newer. There are three possible values:
        //* `default` or not specified, results in the standard gray opaque Mac title bar.
        //* `hidden` results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
        //* `hidden-inset` results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
        titleBarStyle: undefined,
        //Object - Settings of web page's features.
        webPreferences: {
            nodeIntegration: true, //Boolean - Whether node integration is enabled. Default is `true`.
			//String - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script.
			preload: undefined, //When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](https://github.com/atom/electron/blob/master/docs/api/process.md#event-loaded).
            partition: undefined, //String - Sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. If the `partition` is unset then default session of the app will be used.
            zoomFactor: 1.0, //Number - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
            javascript: true, //Boolean - Enables JavaScript support. Default is `true`.
            webSecurity: false, //Boolean - When setting `false`, it will disable the same-origin policy (Usually using testing websites by people), and set `allowDisplayingInsecureContent` and `allowRunningInsecureContent` to `true` if these two options are not set by user. Default is `true`.
            allowDisplayingInsecureContent: false, //Boolean - Allow an https page to display content like images from http URLs. Default is `false`.
            allowRunningInsecureContent: false, //Boolean - Allow a https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
            images: true, //Boolean - Enables image support. Default is `true`.
            java: false, //Boolean - Enables Java support. Default is `false`.
            textAreasAreResizable: true, //Boolean - Make TextArea elements resizable. Default is `true`.
            webgl: true, //Boolean - Enables WebGL support. Default is `true`.
            webaudio: true, //Boolean - Enables WebAudio support. Default is `true`.
            plugins: false, //Boolean - Whether plugins should be enabled. Default is `false`.
            experimentalFeatures: false, //Boolean - Enables Chromium's experimental features. Default is `false`.
            experimentalCanvasFeatures: false, //Boolean - Enables Chromium's experimental canvas features. Default is `false`.
            overlayScrollbars: false, //Boolean - Enables overlay scrollbars. Default is `false`.
            overlayFullscreenVideo: false, //Boolean - Enables overlay fullscreen video. Default is `false`.
            sharedWorker: false, //Boolean - Enables Shared Worker support. Default is `false`.
            directWrite: true, //Boolean - Enables DirectWrite font rendering system on Windows. Default is `true`.
            pageVisibility: false //Boolean - Page would be forced to be always in visible or hidden state once set, instead of reflecting current window's visibility. Users can set it to `true` to prevent throttling of DOM timers. Default is `false`.
        }
    }
  /*{width: 800, height: 600,icon: ROOTPATH + './__electron_root/pine-tree.ico'}*/
  );

	var _rootPath = ROOTPATH.replace( /\\/gi, "/" )
  // and load the index.html of the app.
  mainWindow.loadURL('file://' + _rootPath + '/electron_root/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  //HTTPServer_MongoDB - 49320 - MemberSession 서버;
  //mainWindow.webContents.executeJavaScript('require( "' + ROOTPATH + '/app.js" );');

  //mainWindow.webContents.executeJavaScript('require( "' + _rootPath + '/index.js" );');

  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);
app.on("activate", function(e) {
    if (win === null) createWindow();
});