// append row to table
function res_rem_record_btn( table_refnum ){
    var sel_target = new Array();
    var del_index = new Array();
    sel_target = table_refnum.bootstrapTable('getSelections');
    for( var i=0; i<sel_target.length; i++ ){
        del_index[i] = sel_target[i].index
    }
    var json_array = get_json_array( del_index );
    var attr = {
        "state": "rem_record_data",
        "del_index": json_array
    };
    send_to_db( attr );
	return true;
}



// append row to table
function res_append_row_btn( table_refnum ){
	var data_attr = new Array();
	var data_attr = table_refnum.bootstrapTable("getData",false);
	table_refnum.bootstrapTable( "append", add_table_part_row( "add_product", data_attr.length ) );
	table_refnum.bootstrapTable( "scrollTo", 'bottom' );
	return true;
}

// add part number data
function res_part_add_btn( cnt ){
	var partnum = cnt.getElementsByClassName("numtext");
	var part_attr = cnt.getElementsByClassName("part_attr");
	var attr;
	var num_str = "";
	if( partnum[0].value == "3" ){
		for ( i = 0; i < partnum.length; i++) {
			num_str += partnum[i].value;
		}
		if( check_part_num( 0, 15, num_str ) ) {
			var attr = get_doc_part_attr( part_attr );
			if (attr !== false){
				attr.number = num_str;
				send_new_partnum( attr );
				return true;
			}
		}
	}
	return false;
}

// revise part number data
function res_part_revise_btn( cnt ){
	var part_attr = cnt.getElementsByClassName("part_attr");
	var attr = get_doc_part_attr( part_attr );
	attr.number = normal_part_number( attr.number );
	if( attr !== false ){
		if( check_part_num( 0, 15, attr.number ) ){
			send_revise_part( attr );
			return true;
		}
	}
	return false;
}


// send a new product data to database
function res_product_upload_btn( cnt, table_refnum ){
	var partnum = cnt.getElementsByClassName("numtext");
	var part_attr = cnt.getElementsByClassName("part_attr");	
	var num_str = "";
	if( partnum[0].value == "1" || partnum[0].value == "2" ){
		for (i = 0; i < partnum.length; i++) {
			num_str += partnum[i].value;
		}
		if( check_part_num( 0, 15, num_str ) ) {
			var attr = get_doc_part_attr( part_attr );
			if (attr !== false){
				var data_str = "";
				var data = table_refnum.bootstrapTable('getData');
				for( var i=0; i<data.length; i++ ){
					data_str += "index=" + i + "&number=" + data[i].number.val + "&quantity=" + data[i].quantity.val + ";";
				}
				attr.number = num_str;
				attr.bomcode = data_str;
				if( data_str !== "" ){
					send_new_partnum( attr );
					return true;
				}
			}
		}
	}
	return false;
}


// update inventory quantity
function res_quantity_btn( cnt, currdata ){
	var partnum = cnt.getElementsByClassName("part_attr");
	var numValue = "";
	if( check_part_num( 0, 15, normal_part_number( currdata.value ) ) ){
		numValue = currdata.value;
	}
	else if( check_part_num( 0, 15, normal_part_number( currdata.oldvalue ) ) ){;
		numValue = currdata.oldvalue;
	}
	else{
		return false;
	}
	partnum[0].value = numValue;
	
	var param = {
		"number": numValue,
		"container": cnt
	}
	
	upd_inventory_quan( param );
	return true;
}

// send inventory quantity change
function res_inventory_quan_btn( cnt, action ){
	var part_attr = cnt.getElementsByClassName("part_attr");
	var attr = get_doc_part_attr( part_attr );
	if( attr.number == "" || attr.varval == "" ){
		alert( "input error" );
		return false;
	}
	attr.action = action;
	var refnum = {
		"container": cnt
	}
	send_inventory_quantity( refnum, attr );
}
