// send data to database
async function send_to_db( data ){
	data.id = sessionStorage.getItem("login_id");
	try{
		var response = await send_promise( data );
		if( response == true ){
			return true;
		}
		else{
			alert( response )
			return false;
		}
	}
	catch(e){
		alert( "資料庫錯誤:" + e  );
	}
}

// send promise
function send_promise( data ){
	return new Promise(function (resolve, reject){
		$.ajax({
			type: "get",
			url: "https://script.google.com/macros/s/AKfycbzyVUOVl7SgoAkxDAWGCgB9LkAHHi_6eLACe6tAgDy6usw62j4/exec",
			data: data,
			dataType: "JSON",
			timeout: 10000,
			success: function (response) {
				if ( response !== false ){
					switch( data.state ){
						case "add_newdata":
							receive_db_part_number();
							alert("新增完成");
							resolve( true );
							break;
						case "replace_supplier":
							receive_db_supplier_name();
							alert("修改完成");
							resolve( true );
							break;
						case "add_inventory_quantity":
							var attr = {
								"state": "get_single_data",
								"number": data.number,
								"func": 'quantity'
							};
							receive_to_db(attr);
							resolve( true );
							break;
						case "rem_record_data":
							receive_record();
							alert("已移除紀錄");
							resolve( true );
							break;
						case "rem_supplier_data":
							receive_db_supplier_name();
							receive_supplier_list();
							alert("已移除廠商");
							resolve( true );
							break;
						default:
					}
					
				}
				else{
					resolve( response );
				}
			},
			error: function (err) {
				reject( err.status + err.responseText );
			}
		});
	})			
}