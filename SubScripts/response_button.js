// append row to product table
function res_product_add_btn( table_refnum ){
	var data_attr = new Array();
	var data_attr = table_refnum.bootstrapTable("getData",false);
	table_refnum.bootstrapTable( "append", add_table_part_row( "add_product", data_attr.length ) );
	table_refnum.bootstrapTable( "scrollTo", 'bottom' );
	return true;
}


// revise part number data
function res_part_revise_btn( cnt ){
	var part_attr = cnt.getElementsByClassName("part_attr");
	var attr = get_doc_part_attr( part_attr );
	if( attr !== false ){
		attr.number = normal_part_number( attr.number );
		if( check_part_num( 0, 15, attr.number ) ){
			send_revise_part( attr );
			return true;
		}
	}
	else{
		return false;
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
				}
			}
		}
		return true;
	}
	
	else{
		return false;
	}
}
