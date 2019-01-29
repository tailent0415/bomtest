// receive database information
function receive_db_info( param ){
	var attr = {
		"state": "get_all_data"
	};
	
	var refnum = {
		"tabID": param.tabID
	};
	
	receive_to_db( refnum, attr );
};

// receive database supplier name
function receive_db_supplier_name(){
	var attr = {
		"state": "get_all_supplier_name"
	};
	sessionStorage.setItem( "supplier_options", undefined );
	receive_to_db( "", attr );
}


// receive database part number
function receive_db_part_number(){
	var attr = {
		"state": "get_all_partnum"
	};
	sessionStorage.setItem( "part_options", undefined );
	receive_to_db( "", attr );
}

// receive product parameter to table row
function receive_product_param( param ){
	var attr = {
		"state": "get_single_data",
		"func": "product",
		"number": param.value,
		"index": param.index
	};
	
	var refnum = {
		"tabID": param.tabID
	}
	
	receive_to_db( refnum, attr );
}

// receive database part infomation
function revise_part_info( param ){
	var part_num = param.number;
	if( check_part_num( 0, 15, normal_part_number( part_num ) ) ){
		var attr = {
			"state": "get_single_data",
			"number": part_num,
			"func": "revise_part_data"
		};
		
		var refnum = {
			"container": param.container
		}
		
		receive_to_db( refnum, attr );
	}
}

// receive database product infomation
function revise_product_info( param ){
	var part_num = param.number;
	if( check_part_num( 0, 15, normal_part_number( part_num ) ) ){
		var attr = {
			"state": "get_single_data",
			"number": part_num,
			"func": "revise_product_data"
		};
		
		var refnum = {
			"tabID": param.tabID,
			"container": param.container
		}
		
		receive_to_db( refnum, attr );

	}
}

// update database inventory quantity infomation
function upd_inventory_quan( param ){
	var part_num = param.number;
	if( check_part_num( 0, 15, normal_part_number( part_num ) ) ){
		var attr = {
			"state": "get_single_data",
			"number": part_num,
			"func": "upd_quantity_data"
		};
		
		var refnum = {
			"container": param.container
		}

		receive_to_db( refnum, attr );

	}
}

// receive record
function receive_record( param ){
	var attr = {
		"state": "get_record_data",
	};
    
		
    var refnum = {
        "tabID": param.tabID
    };
    
	receive_to_db( refnum, attr );
}


// receive all supplier information
function receive_supplier_list( param ){
	var attr = {
		"state": "get_supplier_list",
	};
	var refnum = {
		"tabID": param.tabID
	};
	receive_to_db( refnum, attr );
}


// receive single supplier information
function receive_supplier_info( param ){
	var attr = {
		"state": "get_supplier_info",
		"supplier": param.supplier
	};
	var refnum = {
		"container": param.container
	};
	receive_to_db( refnum, attr );
}


