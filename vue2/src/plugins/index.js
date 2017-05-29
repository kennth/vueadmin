import {
	request
} from 'config/';

import {
    ajax
} from 'util/';

var api_methods={};

for (var i = 0; i < request.length; i++) {
    if (typeof request[i]==='object' && request[i].list && Array.isArray(request[i].list)) {
        for(var j=0;j<request[i].list.length;j++){
            api_methods['api_'+request[i].module+'_'+request[i].list[j].method]=(function(n,m){
                return function(data, fn, opts){
                	let path = request[n].list[m].path; //remove path prefix
                    this.$$ajax(request[n].list[m].type, path.substring(path.indexOf('/')), data, fn, opts);
                };
            })(i,j);
        }
    }
}
    

module.exports = {
	plugins: {
		api_methods,
		ajax
	}
};