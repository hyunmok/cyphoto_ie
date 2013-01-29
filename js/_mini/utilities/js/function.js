var responseCount = 0;
var loading = {
	interval : null,
	index : 0,
	text : 'Loading......................',
	show : function(){
		$('#execute button').attr('disabled','disabled');
		$('#execute button').text('Wait');
		this.interval = setInterval(function(){
			$('#loading').text(loading.text.substr(0, loading.index));
			loading.index++;
			if(loading.index == loading.text.length+1){
				loading.index = 0;
			}

		}, 200);
	},
	hide : function(){
		$('#execute button').removeAttr('disabled');
		$('#execute button').text('Go');
		clearInterval(this.interval);
		$('#loading').text('');
	}
}
function requestOptimization(scriptData, miniDir, isCompressing){
	var url = './optimize.php';
	var query = 'scriptData='+scriptData+'&miniDir='+miniDir+'&isCompressing='+isCompressing;
	var http = new XMLHttpRequest();
	http.open('POST', url, true);
	http.onreadystatechange = function(){
		if (http.readyState==4 && http.status==200){
			try{
				responseCount++;
				eval('var jsonData = '+http.responseText+';');
				var percentage = responseCount / scriptJson.ArrayOfScripts.length * 100;
				showLoading(percentage);
				if(jsonData.errNo == 0){
					var str = '<h1>'+jsonData.pageName+'</h1>'+jsonData.results;
					document.getElementById('result').innerHTML += str;
				}else if(jsonData.errNo == 400){
					document.getElementById('result').innerHTML = '<h3 style="color:#ff0000">Error : 쓰기 오류('+jsonData.pageName+') <br/>- 설정 경로와 디렉토리 permission 을 다시 한번 확인해 주세요.</h3>'+document.getElementById('result').innerHTML;
				}				
			}catch(e){
				document.getElementById('result').innerHTML = '<h1 style="color:#ff0000">Error : 설정 경로와 디렉토리 permission 을 다시 한번 확인해 주세요.</h1>';
				loading.hide();
			}finally{
				
			}
		}else{
			//document.getElementById('result').innerHTML = 'Waiting for response...';
		}
	}
	http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");       
	http.send(query);
}

function go(){
	responseCount = 0;
	loading.show();
	showLoading(5);
	var isCompressing = null;
	if($('#options input:last').attr('checked') == 'checked'){
		isCompressing = true;
	}else{
		isCompressing = false;
	}
	document.getElementById('result').innerHTML = '';	
	for(var i = 0; i < scriptJson.ArrayOfScripts.length; i++){
		var jsonStr = dir.replace(JSON.stringify(scriptJson.ArrayOfScripts[i]));
		var minDir = dir.getMinDir();
		requestOptimization(jsonStr, minDir, isCompressing);	
	}
}

function showLoading(percentage){
	document.getElementById('loadingPercentage').innerHTML = '('+percentage+'%)';
	percentage = Math.ceil(percentage);
	document.getElementById('loadingBar').style.width = percentage+'%';
	if(percentage == 100){
		loading.hide();
		alert("Compressing is finished");
	}
}
function changeDir(_this, type){
	var directory = $(_this).val();
	$(_this).next().next().text(directory);
	switch (type)
	{
		case 'working': 
			dir.setWorkingDir(directory);
			break;
		case 'jade': 
			dir.setJadeDir(directory);
			break;
		case 'app': 
			dir.setAppDir(directory);
			break;
		case 'min':
			dir.setMinDir(directory);
			break;
	}
}