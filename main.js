
const electron = require('electron');
const url = require('url');
const path = require('path');
const { Menu } = require('electron');
const sqlite3 = require('sqlite3')
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'Mohitdb.sqlite3'
    },
    useNullAsDefault: true
});

const {app,BrowserWindow,ipcMain}=require("electron");

let mainWindow;
//Listen for app to be ready
app.on("ready", () => {
	let mainWindow = new BrowserWindow({ height: 800, width: 800, show: false })
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'mainwindow.html'),
		protocol: 'file',
		slashes: true
	}));
	mainWindow.once("ready-to-show", () => { mainWindow.show() })

	ipcMain.on("mainWindowLoaded", function () {
		let result = knex.select("Empp_Name").from("Emp")
		result.then(function(rows){
            mainWindow.webContents.send("resultSent", rows);
            
		})
    });
});
    

     //Build menu from template
     //const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
     //Insert Menu
     //Menu.setApplicationMenu(mainMenu);
 

//Create mainMenuTemplate
/*const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Item'
               //click(){
                //    createAddWindow();
               // }
            },
            {
                label:'Clear Item'
            },
            {
                label:'Quit',
                accelerator: process.platform =='darwin' ? 'Command+Q' :'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];*/