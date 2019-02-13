// generate make order and display page
function res_gen_mo_btn( cnt ){
    var part_attr = cnt.getElementsByClassName("part_attr");
    var attr = get_doc_part_attr( part_attr );
	var param = {
		"number": attr.number,
        "items": attr.items,
        "remark": attr.remark,
		"container": cnt
	};
    gen_new_mo( param );
}

// quantity change
function res_quan_change_btn( cnt, currdata ){
    var partnum = cnt.getElementsByClassName("part_attr");
    var numValue = "";
    if( check_part_num( 0, 15, normal_part_number( currdata.value ) ) ){
        numValue = currdata.value;
    }
    else if( check_part_num( 0, 15, normal_part_number( currdata.oldvalue ) ) ){;
        numValue = currdata.oldvalue;
    }
    partnum[0].value = numValue;
    var param = {
        "number": numValue,
        "container": cnt
    };
    upd_inventory_quan( param );
}

// remove supplier data
function res_rem_supplier_btn( table_refnum ){
    var sel_target = new Array();
    var del_index = new Array();
    sel_target = table_refnum.bootstrapTable('getSelections');
    for( var i=0; i<sel_target.length; i++ ){
        del_index[i] = sel_target[i].index
    }
    var json_array = get_json_array( del_index );
    var attr = {
        "state": "rem_supplier_data",
        "del_index": json_array
    };
    var refnum = {
        "tabID": table_refnum
    };
    send_to_db( refnum, attr );
}

// remove record data
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
    var refnum = {
        "tabID": table_refnum
    };
    
    send_to_db( refnum, attr );
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

function res_supplier_upload_btn( cnt ){
    var enable_swap = false;
    var part_attr = cnt.getElementsByClassName("part_attr");
    var attr = get_doc_part_attr( part_attr );
    if( attr.supplier == "" ){
        alert( "請輸入廠商名稱" );
        return false;
    }
    
    if ( attr.replace_name.trim() !== "" ){
        enable_swap = true;
    }
    else{
        send_new_supplier_name( attr );
    }
    attr.state = "replace_supplier";
    send_to_db( "", attr );

    for (var i=0; i<part_attr.length; i++){
        switch( part_attr[i].name ){
            case "part_supplier":
                if ( enable_swap ){
                    part_attr[i].value = attr.replace_name;
                }
                else{
                    part_attr[i].value = attr.supplier;
                }
                break;
            case "part_replace_name":
                part_attr[i].value = "";
                break;
            default:
        }
    }
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
