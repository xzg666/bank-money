button_click:function(){
	  
	var orgVal = $model.yuanmingwen;
  var initParam = "<?xml version=\\\"1.0\\\" encoding=\\\"utf-8\\\"?>"+
					          "<authinfo><liblist>"+
										"<lib type=\\\"CSP\\\" version=\\\"1.0\\\" dllname=\\\"\\\" ><algid val=\\\"SHA1\\\" sm2_hashalg=\\\"sm3\\\"/></lib>"+
										"<lib type=\\\"SKF\\\" version=\\\"1.1\\\" dllname=\\\"R0FLRVlfU0tGLmRsbA==\\\" ><algid val=\\\"SHA1\\\" sm2_hashalg=\\\"sm3\\\"/></lib>"+
										"<lib type=\\\"SKF\\\" version=\\\"1.1\\\" dllname=\\\"bXRva2VuX2dtMzAwMF9KSVQuZGxs\\\" ><algid val=\\\"SHA1\\\" sm2_hashalg=\\\"sm3\\\"/></lib>"+
										"<lib type=\\\"SKF\\\" version=\\\"1.1\\\" dllname=\\\"SERfR01DQUlTLmRsbA==\\\" ><algid val=\\\"SHA1\\\" sm2_hashalg=\\\"sm3\\\"/></lib>"+
										"<lib type=\\\"SKF\\\" version=\\\"1.1\\\" dllname=\\\"U2h1dHRsZUNzcDExXzMwMDBHTS5kbGw=\\\" ><algid val=\\\"SHA1\\\" sm2_hashalg=\\\"sm3\\\"/></lib>"+
										"<lib type=\\\"SKF\\\" version=\\\"1.1\\\" dllname=\\\"SklUR01LRVlfU0pLMTQyNC5kbGw=\\\" ><algid val=\\\"SHA1\\\" sm2_hashalg=\\\"sm3\\\"/></lib>"+
										"<lib type=\\\"SKF\\\" version=\\\"1.1\\\" dllname=\\\"U0tGQVBJLmRsbA==\\\" ><algid val=\\\"SHA1\\\" sm2_hashalg=\\\"sm3\\\"/></lib>"+
										"<lib type=\\\"SKF\\\" version=\\\"1.1\\\" dllname=\\\"U0tGQVBJMjAwNzkuZGxs\\\" ><algid val=\\\"SHA1\\\" sm2_hashalg=\\\"sm3\\\"/></lib>"+
										"</liblist></authinfo>";
	var ret = 1;
	var message = "";
    if(orgVal){	
     		ret = JITHTTPCLIENT.RegisterParam(initParam);	
				if(ret!=0){
			  	  if(ret==100){
				  	  	alert("数据格式错误");										
			  	  }else if(ret==500){
			  	  		alert("业务处理中");
			  	  }else {
			  	  		ret = JITHTTPCLIENT.GetErrorCode();
							  if(ret!=0){
								  	message = JITHTTPCLIENT.GetErrorMessage(ret);
										alert("初始化失败，错误码："+ret+" 错误信息："+message);
								}	
			  	  }
			  	  return ;			  		
			  }
			  //
     	  ret = JITHTTPCLIENT.MOF_SetFlag(1);
     	  if(ret!=0){
						ret = JITHTTPCLIENT.GetErrorCode();
					  if(ret!=0){
						  	message = JITHTTPCLIENT.GetErrorMessage(ret);
								alert("设置财政接口标识失败，错误码："+ret+" 错误信息："+message);
						}		
					  return ;
				}	
				//
     	  ret = JITHTTPCLIENT.SetCertChooseType(0);
     	  if(ret!=0){
						ret = JITHTTPCLIENT.GetErrorCode();
					  if(ret!=0){
						  	message = JITHTTPCLIENT.GetErrorMessage(ret);
								alert("设置证书选择类型失败，错误码："+ret+" 错误信息："+message);
						}		
					  return ;
				}	
		    //
	   	  ret = JITHTTPCLIENT.SetCert("SC", "", "", "", "", "");
				if(ret!=0){
						ret = JITHTTPCLIENT.GetErrorCode();
					  if(ret!=0){
						  	message = JITHTTPCLIENT.GetErrorMessage(ret);
								alert("设置证书过滤失败，错误码："+ret+" 错误信息："+message);
						}		
					  return ;
				}	     
        //
	      message = JITHTTPCLIENT.MOF_DetachSignStr("",1,orgVal,"");
	      ret = JITHTTPCLIENT.GetErrorCode();
			  if(ret!=0){
				  	message = JITHTTPCLIENT.GetErrorMessage(ret);
						alert("签名失败，错误码："+ret+" 错误信息："+message);
				}else{
					  $model.signOver = message;
				}
        return;
    }
    else{
      alert("输入项为空");
    }
}