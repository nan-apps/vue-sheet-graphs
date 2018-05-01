import * as services from '../services';

export const LOAD_DATA = ({commit}, url) => {
	
	commit( 'FETCHING_DATA', true  );
	
	services.getDataFromApi(url).then(json => {
		commit( 'SET_RAW_DATA', { rawData: json.feed.entry });
    	commit( 'FETCHING_DATA', false  );
	}).catch(err => {
	  	console.log(err);
    	commit( 'FETCHING_DATA', false  );
	});	

}

export const SET_COLUMNS = ({commit}, columns) => {	
	commit( 'SET_COLUMNS', columns  );
}
