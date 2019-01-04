class TabProp {
	
	/*** Set Property ***/
	static SetProp( _tabid, _eleid, _formid ) {
		this.propres = {'tabid': _tabid, 'eleid': _eleid, 'formid': _formid}
		return this.propres;
	}

	/*** Get Property ***/
	static GetProp() {
		return this.propres;
	}
	
}