var chokidar = require('chokidar');
const path = require('path');
var fs = require('fs');

// TODO : load modules from fs 

var watcher = chokidar.watch( __dirname , {ignored: /^\./,
   persistent: true ,
   awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },
});

watcher
  .on('add', function(uri: string)    {
    var file = path.basename(uri, '.js') ;
    if ( path.extname(uri) == '.js' && file != 'index' ) {
    module.exports[file] = require( './' + file );
    console.log('Module', file , 'has been added'); }
  })
  .on('change',  function(uri: string) {
    var file = path.basename(uri, '.js') ;
    if (module.exports[file]) {
    delete require.cache[uri]
    delete module.exports[file] ;
    module.exports[file] = require('./' + file );
    console.log('Module', file , 'has been changed');}
  })
  .on('unlink', function(uri: string) {
    var file = path.basename(uri, '.js') ;
    if (module.exports[file]) {
    delete module.exports[file] ;
    console.log('Module', file , 'has been removed');}
  })
  .on('error', function(error: Error) {console.error('Error happened', error);})
