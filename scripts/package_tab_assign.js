var tab_assign = function(){
	var table_id;
	var ele_id;
	var form_id;
	
	this.set_table_id = function( val ) { table_id = val; };
 	this.get_table_id = function() { return table_id; };
	
	this.set_ele_id = function( val ) { ele_id = val; };
 	this.get_ele_id = function() { return ele_id; };
	
	this.set_form_id = function( val ) { form_id = val; };
 	this.get_form_id = function() { return form_id; };
}