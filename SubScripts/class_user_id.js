class UserID {
	
	static SetID( id ) {
		alert( id );
		this.user_id = id;
		return this.user_id;
	}

	static GetID() {
		alert( this.user_id );
		return this.user_id;
	}
	
}