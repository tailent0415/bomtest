// send a new supplier name
function send_new_partnum( attr ){
	attr.state = "add_newdata";
	send_to_db( "", attr );
}

// send a new supplier name
function send_new_supplier_name( param ){
	if( param.currdata.trim() == "" ){
		return;
	}
	var attr = {
		"supplier": param.currdata,
		"state": "add_supplier_data"
	};
	send_to_db( "", attr );
}

// send replace part data to database
function send_revise_part( attr ){
	attr.state = "replace_data"
	send_to_db( "", attr );
}

// send inventory variable to database
function send_inventory_quantity( refnum, attr ){
	attr.state = "add_inventory_quantity";
	send_to_db( refnum, attr );
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



