async function receive_to_db( tabID, data ){
	try{
		var response = await receive_promise( tabID, data );
		if( response.flag == true ){
			return response.data;
		}
		else{
			alert( response.data );
			return false;
		}
	}
	catch(e){
		alert( "資料庫錯誤:" + e  );
		return false;
	}
}

// receive promise
function receive_promise( tabID, data ){
	var ResMsg = {
		"flag": false,
		"data": ""
	}
	return new Promise(function (resolve, reject){
		$.ajax({
			type: "post",
			url: "https://script.google.com/macros/s/AKfycbzyVUOVl7SgoAkxDAWGCgB9LkAHHi_6eLACe6tAgDy6usw62j4/exec",
			data: data,
			dataType: "JSON",
			timeout: 10000,
			success: function( response ){
				switch( data.state ){
					case "get_all_data":
					case "get_record_data":
					case "get_supplier_list":
						ResMsg.flag = true;
						ResMsg.data = response;
						break;
					default:
						ResMsg.data = "undefined function";
				}
				resolve( ResMsg );
			},
			error: function(err){
				ResMsg.data = err.status + err.responseText;
				reject( ResMsg );
			}
		});
	});
}