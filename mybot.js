var Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", () => {
	console.log("I am ready!");
});

client.on("message", (message) => {
	if (message.content.startsWith("ping")) {
		message.reply("pong");
	}
});

//Actual code

//Maps
var assaultMaps = ['hanamura', 'lunar', 'anubis', 'volskaya']
var escortMaps = ['dorado', 'route66', 'watchpoint']
var hybridMaps = ['eichenwalde', 'hollywood', 'ilios', 'kings', 'tower', 'nepal', 'numbani', 'oasis']
var allMaps = ['hanamura', 'lunar', 'anubis', 'volskaya', 'dorado', 'route66', 'watchpoint', 'eichenwalde', 'hollywood', 'ilios', 'kings', 'tower', 'nepal', 'numbani', 'oasis']

//Game modes in OW
var gameModes = ['assault', 'dm', 'escort', 'hybrid']

//Other variables
var pickSide = ['heads','tails'];
var user;
var maps;
var mapsLeft;
var allowBan = false;
var bestOfSelected = false;
var bestOf;

//  VETO COMMANDS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Start veto command
client.on('message', message => {
	if (message.content.toLowerCase() === '!mapveto' || message.content.toLowerCase() === '!map veto'  || message.content.toLowerCase() === '!veto') {
		message.reply('Enter !veto bestofone or !veto bestoftwo to start');
		mapsLeft = 50;
		bestOfSelected=false;
		allowBan =false;
	}
});


//Select best of one or best of three. In other words, ban until one/three maps left.
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto bestofone' && !allowBan && !bestOfSelected) {
	    bestOf = 1;
	    bestOfSelected=true;
	    allowBan =false;
	    message.reply('Enter !veto assault, !veto hybrid, or !veto escort for a best of ' + bestOf + "match.");
    }
});

client.on('message', message => {
    if (message.content.toLowerCase() === '!veto bestoftwo' && !allowBan && !bestOfSelected) {
	    bestOf = 2;
	    bestOfSelected=true;
	    allowBan =false;
	    message.reply('Enter !veto assault, !veto hybrid, or !veto escort for a best of ' + bestOf + "match.");
    }
});


//Ban assault maps
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto assault' && !allowBan && bestOfSelected) {
        maps = 'lunar, ilios, watchpoint, anubis, volskaya, dorado, route66, watchpoint, eichenwalde, hollywood, ilios, kings, tower, nepal, numbani, oasis';
        message.reply('Assault Map Veto starting: Type !veto MapName to ban any of the following maps: ' + maps);
        mapsLeft = 16;
        allowBan=true;
    }
});

//Ban hybrid maps
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto hybrid'  && !allowBan && bestOfSelected) {
		maps = 'eichenwalde, hollywood, ilios, kings, tower, nepal, numbani, oasis'	    
		message.reply('Hybrid Map Veto starting: Type !veto MapName to ban any of the following maps: ' + maps);
	    mapsLeft = 8; 
	    allowBan=true;
    }
});

//Ban escort maps
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto escort'  && !allowBan && bestOfSelected) {
		maps = 'dorado, route66, watchpoint'	    
		message.reply('Escort Map Veto starting: Type !veto MapName to ban any of the following maps: ' + maps);
	    mapsLeft = 3; 
	    allowBan=true;
    }
});


// OTHER COMMANDS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MAPS LEFT CMD
client.on('message', message => {
	if (message.content.toLowerCase() === '!mapsleft' && allowBan) {
		message.reply("Maps left: "+maps + " ("+(mapsLeft - 1)+")");
	}
});

//BOT HELP CMD
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto help') {
	    message.reply("Need help with the Veto Bot? Visit my asshole or contact the developer: your mom looooool ");
    }
});

//FLIP COIN CMD
client.on('message', message=> {
	if(message.content.toLowerCase() === '!veto flipcoin' || message.content.toLowerCase() === '!veto flipacoin')
	{
		message.reply('the coin has landed on '+ pickSide[Math.floor(Math.random()*pickSide.length)] + '.');
	}
});

//SELECT RANDOM GAME MODE CMD
client.on('message',message=> {
    if(message.content.toLowerCase() === '!randomgamemode' || message.content.toLowerCase() === '!random game mode' ) {
     message.reply( gameModes[Math.floor(Math.random()*gameModes.length)] );
    }
});

//SELECT RANDOM MAP CMD
client.on('message',message=> {
    if(message.content.toLowerCase() === '!randommap' || message.content.toLowerCase() === '!random map' ) {
     message.reply( allMaps[Math.floor(Math.random()*allMaps.length)] );
    }
});

//SELECT RANDOM HYBRID MAP CMD
client.on('message',message=> {
    if(message.content.toLowerCase() === '!randomhybridmap' || message.content.toLowerCase() === '!random hybrid map' ) {
     message.reply( hybridMaps[Math.floor(Math.random()*hybridMaps.length)] );
    }
});

//SELECT RANDOM ASSAULT MAP CMD
client.on('message',message=> {
    if(message.content.toLowerCase() === '!randomassaultmap' || message.content.toLowerCase() === '!random assault map' ) {
     message.reply( assaultMaps[Math.floor(Math.random()*assaultMaps.length)] );
    }
});

//SELECT RANDOM ESCORT MAP CMD
client.on('message',message=> {
    if(message.content.toLowerCase() === '!randomescortmap' || message.content.toLowerCase() === '!random escort map' ) {
     message.reply( escortMaps[Math.floor(Math.random()*escortMaps.length)] );
    }
});


//MAPS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//HANAMURA
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto hanamura' && maps.indexOf('hanamura')!= -1 && allowBan) {
        maps = maps.replace('Hanamura, ', '');
        message.reply('Cobblestone removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//LUNAR
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto lunar' && maps.indexOf('lunar')!= -1 && allowBan) {
        maps = maps.replace('lunar, ', '');
        mapsLeft -= 1; 
        message.reply('Lunar removed. Maps left: ' + maps);
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//ANUBIS
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto anubis' && maps.indexOf('anubis')!= -1 && allowBan) {
        maps = maps.replace('anubis, ', '');
        mapsLeft -= 1; 
        message.reply('Anubis removed. Maps left: ' + maps);
        if(mapsLeft==bestOf)
        {
			message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!")
			allowBan=false;
			bestOfSelected=false;
        }
    }
});


//VOLSKAYA
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto volskaya' && maps.indexOf('volskaya')!= -1 && allowBan) {
        maps = maps.replace('volskaya, ', '');
        message.reply('Volskaya removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//DORADO
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto dorado' && maps.indexOf('dorado')!= -1 && allowBan) {
        maps = maps.replace('dorado, ', '');
        message.reply('Dorado removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//ROUTE 66
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto route66' && maps.indexOf('route66')!= -1 && allowBan) {
        maps = maps.replace('route66', '');
        message.reply('Route 66 removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//WATCHPOINT
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto watchpoint' && maps.indexOf('watchpoint')!= -1 && allowBan ) {
        maps = maps.replace('watchpoint, ', '');
        message.reply('Watchpoint removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//EICHENWALDE
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto eichenwalde' && maps.indexOf('eichenwalde')!= -1 &&allowBan) {
        maps = maps.replace('eichenwalde, ', '');
        message.reply('Eichenwalde removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//HOLLYWOOD
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto hollywood' && maps.indexOf('hollywood')!= -1 &&allowBan) {
        maps = maps.replace('hollywood, ', '');
        message.reply('Hollywood removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
        
    }
});


//ILIOS
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto ilios' && maps.indexOf('ilios')!= -1 &&allowBan) {
        maps = maps.replace('ilios, ', '');
        message.reply('Ilios removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//KINGS
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto kings' && maps.indexOf('kings')!= -1 &&allowBan) {
        maps = maps.replace('kings, ', '');
        message.reply('Kings removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//TOWER
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto tower' && maps.indexOf('tower')!= -1 &&allowBan) {
        maps = maps.replace('tower, ', '');
        message.reply('tower removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//NEPAL
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto nepal' && maps.indexOf('nepal')!= -1 &&allowBan) {
        maps = maps.replace('nepal, ', '');
        message.reply('Nepal removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//NUMBANI
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto numbani' && maps.indexOf('numbani')!= -1 &&allowBan) {
        maps = maps.replace('numbani, ', '');
        message.reply('Numbani removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});


//OASIS
client.on('message', message => {
    if (message.content.toLowerCase() === '!veto oasis' && maps.indexOf('oasis')!= -1 &&allowBan) {
        maps = maps.replace('oasis, ', '');
        message.reply('Oasis removed. Maps left: ' + maps);
        mapsLeft -= 1; 
        if(mapsLeft==bestOf)
        {
            message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
            allowBan=false;
            bestOfSelected=false;
        }
    }
});
/* Worry about this later removes redundant code /////////////////////////////////////////////////////////////////////////////
//If there are no more maps left to veto, display maps that were not vetoed
if(mapsLeft==bestOf)
{
	client.on('message',message=> {
		message.reply("you will play on " + maps + " (BO" + bestOf + "). Good luck, have fun!" );
		allowBan=false;
		bestOfSelected=false;
	}
}*/
client.login("NTAzNDgzNjY1NjQ1MzA1ODY2.Dq3KGA.nV6TmBIKrRoOrFRmMdt4dMTNo3o");