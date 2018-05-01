export const FETCHING_DATA = ( state, isFetching ) => {
	state.fetchingData = isFetching;	
}

export const SET_RAW_DATA = ( state, { rawData } ) => {
  	state.rawData = rawData;
}

export const SET_COLUMNS = ( state, columns ) => {	
  	state.columns = columns;
}