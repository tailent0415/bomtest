// send a new part data to database
function send_new_part(){
	var cnt = document.getElementById( ele_id );
	var partnum = cnt.getElementsByClassName("numtext");
	var part_attr = cnt.getElementsByClassName("part_attr");
	var attr;
	var num_str = "";
	for (i = 0; i < partnum.length; i++) {
		num_str += partnum[i].value;
	}
		
	if( check_part_num( 0, 15, num_str ) ) {
		var attr = get_doc_part_attr( part_attr );
		if (attr !== false){
			attr.state = "add_newdata";
			attr.number = num_str;
			send_to_db( attr );
		}
	}	
}


// send a new product data to database
function send_new_product(){
	var flag = true;
	var cnt = document.getElementById( ele_id );
	var partnum = cnt.getElementsByClassName("numtext");
	var part_attr = cnt.getElementsByClassName("part_attr");
	var num_str = "";
	
	for (i = 0; i < partnum.length; i++) {
		num_str += partnum[i].value;
	}
	if( check_part_num( 0, 15, num_str ) ) {
		var attr = get_doc_part_attr( part_attr );
		if (attr !== false){
			var data_str = "";
			var data = product_table.bootstrapTable('getData');
			for( var i=0; i<data.length; i++ ){
				data_str += "index=" + i + "&number=" + data[i].number.val + "&quantity=" + data[i].quantity.val + ";";
			}
			attr.state = "add_newdata";
			attr.number = num_str;
			attr.bomcode = data_str;
			if( data_str !== "" ){
				send_to_db(attr);
			}
		}
	}
}


// send a revise product data to database
function send_revise_product(){
	var cnt = document.getElementById( ele_id );
	var part_attr = cnt.getElementsByClassName("part_attr");
	var num_str = normal_part_number( part_attr[0].value );
	if( check_part_num( 0, 15, num_str ) ) {
		var attr = get_doc_part_attr( part_attr );
		if (attr !== false){
			var data_str = "";
			var data = product_table.bootstrapTable('getData');
			for( var i=0; i<data.length; i++ ){
				data_str += "index=" + i + "&number=" + data[i].number.val + "&quantity=" + data[i].quantity.val + ";";
			}
			attr.state = "replace_data";
			attr.number = num_str;
			attr.bomcode = data_str;
			if( data_str !== "" ){
				send_to_db(attr);
			}
		}
	}
}


// send replace part data to database
function send_revise_part(){
	var cnt = document.getElementById( ele_id );
	var part_attr = cnt.getElementsByClassName("part_attr");
	var attr = get_doc_part_attr( part_attr );
	if( attr !== false ){
		attr.number = normal_part_number( attr.number );
		if( check_part_num( 0, 15, attr.number ) ){
			attr.state = "replace_data";
			send_to_db( attr );
		}
	}

}


// send inventory variable to database
function send_inventory_quantity( source_str ){
	var cnt = document.getElementById( ele_id );
	var part_attr = cnt.getElementsByClassName("part_attr");
	var attr = get_doc_part_attr( part_attr );
	if( attr.number == "" || attr.varval == "" ){
		alert( "input error" );
		return false;
	}
	attr.state = "add_inventory_quantity";
	attr.action = source_str;
	send_to_db( attr );
}

