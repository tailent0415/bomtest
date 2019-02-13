// generate make order interface
function gen_new_mo( param ){
	var attr = {
		"number": param.number,
        "items": param.items,
        "remark": param.remark,
		"state": "generate_new_mo"
	};
	var refnum = {
		"container": param.container,
	};
    send_to_db( refnum, attr );
}

// send a new supplier name
function send_new_partnum( attr ){
	attr.state = "add_newdata";
	send_to_db( "", attr );
}

// send a new supplier name
function send_new_supplier_name( param ){
	if( param.supplier.trim() == "" ){
		return;
	}
	var attr = {
		"supplier": param.supplier,
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