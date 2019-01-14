// receive database information
function receive_db_info(){
	var attr = {
		"state": "get_all_data"
	};
	receive_to_db( attr );
	receive_db_partlist();
	receive_db_supplier_name();
};

// receive database part number
function receive_db_partlist(){
	var attr = {
		"state": "get_all_partnum"
	};
	receive_to_db(attr);
}

// receive database part infomation , and update interface
function receive_part_info( source_str, part_num ){
	if( check_part_num( 0, 15, normal_part_number( part_num ) ) ){
		var attr = {
			"state": "get_single_data",
			"number": part_num,
			"func": source_str
		};
		receive_to_db(attr);
	}
}

// receive database supplier name
function receive_db_supplier_name(){
	var attr = {
		"state": "get_all_supplier_name"
	};
	receive_to_db(attr);
}

// receive single supplier information
function receive_supplier_info( supplier_name ){
	var attr = {
		"state": "get_supplier_info",
		"supplier": supplier_name
	};
	receive_to_db(attr);
}

// receive all supplier information
function receive_supplier_list(){
	var attr = {
		"state": "get_supplier_list",
	};
	receive_to_db( attr );
}

// receive product parameter to table row
function receive_product_param( idx, val ){
	var attr = {
		"state": "get_single_data",
		"func": "product",
		"number": val,
		"index": idx
	};
	receive_to_db(attr);
}




// receive record
function receive_record(){
	var attr = {
		"state": "get_record_data",
	};
	receive_to_db( attr );
}
