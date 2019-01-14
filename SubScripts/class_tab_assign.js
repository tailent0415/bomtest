class TabProp {
	
	/*** Set Property ***/
	static SetProp( _eleid, _tabid, _formid ) {
		this.propres = { 'eleid': _eleid, 'tabid': _tabid, 'formid': _formid}
		return this.propres;
	}

	/*** Get Property ***/
	static GetProp() {
		return this.propres;
	}
	
}