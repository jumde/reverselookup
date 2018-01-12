var dns = require('dns');

function processFile(inputFile) {
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);
     
    rl.on('line', function (line) {
        reverseLookup(line);
    });
    
    rl.on('close', function (line) {
    });
}

function reverseLookup(ip) {
	dns.reverse(ip,function(err,domains){
		if(err!=null)	return;

		domains.forEach(function(domain){
			dns.lookup(domain,function(err, address, family){
				console.log("*://"+ domain + "/*");
			});
		});
	});
}

processFile('ip.txt');
