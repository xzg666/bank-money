//alert("加载了XMLHttpRequest!");

var JITHTTPCLIENT = function () {
    var xmlHttp = null;
    var url = "http://127.0.0.1:45679";          
    var FinalizeCmd = "{\"name\": \"Finalize\"}";    
    var ClearPinCodeCmd = "{\"name\": \"ClearPinCode\"}";        
    var GeterrocodeCmd = "{\"name\": \"GetErrorCode\"}";    
    var GetDataCmd = "{\"name\": \"GetData\"}";	
    var GetVersionCmd = "{\"name\": \"JITGetVersion\"}";
    var GetMacCmd = "{\"name\": \"JITGetMAC\"}";	
    
    function createXmlHttp() {
	  	  var temphttp = null;  
	  	  //用来判断浏览器是否支持ActiveX控件
        //"ActiveXObject" in window是为了兼容IE11，IE11不支持window.ActiveXObject，会提示undefined   
        if (window.ActiveXObject || "ActiveXObject" in window) {
            var arr = new Array("Microsoft.XMLHTTP", "MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP.2.6", "MSXML2.XMLHTTP");
            for (var i = 0; i < arr.length; i++) {
                try {
                    temphttp = new ActiveXObject(arr[i]);
                    break;
                } catch (e) {
                    alert(e.message);
                }
            }
        } else if (window.XMLHttpRequest) {
            temphttp = new XMLHttpRequest();
        }
        return temphttp;   
    } 
    
    function _sleep(numberMillis) {
				var now = new Date();
				var exitTime = now.getTime() + numberMillis;
				while (true) {
					now = new Date();
					if (now.getTime() > exitTime)
					return;
	      }
    }
    
    function DisConn() {
        xmlHttp.abort();
    }
    
    function Ajax(senddata) { 
    	  var errormsg = "{\"error\":999,\"value\":\"与服务断开连接\"}";  
        //1.创建Ajax对象
        xmlHttp = createXmlHttp();
		
		    //2.连接服务器 open方法只是启动一个请求以备发送，还未发送
        xmlHttp.open("POST", url, false);//false: 同步
        
        //打开下面这句可以测试chrome OPTIONS 跨域
        //xmlHttp.setRequestHeader('content-type','application/json');
        
        //3.发送请求    
        try{
		    //console.log("senddata: " + senddata);
			    xmlHttp.send(senddata);   
			  }catch(e) {
			  //console.log("DisConn Exception: " + e + ", status = " + xmlHttp.status + ", responseText: " + xmlHttp.responseText);
				  DisConn();	
			    
          return errormsg;		    
			  };       
			  
        //4.接收返回值 和服务器通讯的时候此事件发生	 
        if(xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0))
        {
            if (xmlHttp.responseText == null) 
            {
                return errormsg;
            }                
            return xmlHttp.responseText;
        }else{
			  //console.log("return: " + xmlHttp.status + "===" +senddata + "==="+xmlHttp.responseText+"==="+xmlHttp.readyState);
					return errormsg;	
        }       
    }
         
	  function _Getretcode(Cmdname){
	  	var ret = -1;
	  	var str = Ajax(Cmdname);
		  ret = JSON.parse(str).error;
	  	return ret;	  	
	  }
	  
	  function _Getretmsg(Cmdname){
	  	var ret = "";
	  	var str = Ajax(Cmdname);
		  ret = JSON.parse(str).value;
	  	return ret;	  	
	  }	  
	  
	  function _Getretvalue(Cmdname){
	  	var ret = "";
	  	var str = Ajax(Cmdname);
		  ret = "返回信息："+JSON.parse(str).value + "     返回错误码："+JSON.parse(str).error;
	  	return ret;	  	
	  }	
  
	  
	  return {
	  	     //common
					 Initialize: function (strinitParam) {
					 	  var InitCmd = "{\"name\": \"Initialize\", \"p1\": \""+strinitParam+"\"}";
					 	  return _Getretcode(InitCmd);
           },
           Finalize: function () {
           		return _Getretcode(FinalizeCmd);
           },
           RegisterParam: function (strinitParam) {
					 	  var RegisterParamCmd = "{\"name\": \"RegisterParam\", \"p1\": \""+strinitParam+"\"}";
					 	  return _Getretcode(RegisterParamCmd);
           },
           GetErrorCode: function () {
           		return _Getretcode(GeterrocodeCmd);
           },
           GetErrorMessage: function (errorcode) {
           	  var GeterromessageCmd = "{\"name\": \"GetErrorMessage\", \"p1\": \""+errorcode+"\"}";
           		return _Getretmsg(GeterromessageCmd);
           },        
           VerifyPinCode: function  (strPinCode, strNewPinCode) {
           	  var VerifyPinCodeParamCmd = "{\"name\": \"VerifyPinCode\", \"p1\": \""+strPinCode+"\", \"p2\": \""+strNewPinCode+"\"}";
					 	  return _Getretcode(VerifyPinCodeParamCmd);
           },  
           //org
           SetCertChooseType: function (types) {
           		var SetCertChooseTypeCmd = "{\"name\": \"SetCertChooseType\", \"p1\": "+types+"}";
           		return _Getretcode(SetCertChooseTypeCmd);	
           },           
           ClearPinCode: function () {
           		return _Getretcode(ClearPinCodeCmd);
           },
           SetPinCode: function (strpincode) {
           	  var SetPinCodeCmd = "{\"name\": \"SetPinCode\", \"p1\": \""+strpincode+"\"}";
           		return _Getretcode(SetPinCodeCmd);
           },
           SetCert: function (strCertType,strDN,strSN,strEmail,strDNIssuer,strCertBase64){
           		var SetCertCmd = "{\"name\": \"SetCert\", \"p1\": \""+strCertType+"\", \"p2\": \""+strDN+"\", \"p3\": \""+strSN+"\", \"p4\": \""+strEmail+"\", \"p5\": \""+strDNIssuer+"\", \"p6\": \""+strCertBase64+"\"}";
           		return _Getretcode(SetCertCmd);	
           },
           SetCert2: function (strCertType,strDN,strSN,strEmail,strDNIssuer,strCertBase64,strCertNameType){
           		var SetCert2Cmd = "{\"name\": \"SetCert2\", \"p1\": \""+strCertType+"\", \"p2\": \""+strDN+"\", \"p3\": \""+strSN+"\", \"p4\": \""+strEmail+"\", \"p5\": \""+strDNIssuer+"\", \"p6\": \""+strCertBase64+"\", \"p7\": \""+strCertNameType+"\"}";
           		return _Getretcode(SetCert2Cmd);	
           },
           SetCertEx: function (strCertStoreType, strCertType,strDN,strSN,strEmail,strDNIssuer,strCertBase64){
           		var SetCertExCmd = "{\"name\": \"SetCertEx\", \"p1\": \""+strCertStoreType+"\", \"p2\": \""+strCertType+"\", \"p3\": \""+strDN+"\", \"p4\": \""+strSN+"\", \"p5\": \""+strEmail+"\", \"p6\": \""+strDNIssuer+"\", \"p7\": \""+strCertBase64+"\"}";
           		return _Getretcode(SetCertExCmd);	
           },
           P1SignStr: function (strdn,strsrc) {
           	  var P1SignStrCmd = "{\"name\": \"P1SignStr\", \"p1\": \""+strdn+"\", \"p2\": \""+strsrc+"\"}";
           		return _Getretmsg(P1SignStrCmd);
           },
           AttachSignStr: function (strdn,strsrc) {
           	  var AttachSignStrCmd = "{\"name\": \"AttachSignStr\", \"p1\": \""+strdn+"\", \"p2\": \""+strsrc+"\"}";
           		return _Getretmsg(AttachSignStrCmd);
           },
           DetachSignStr: function (strdn,strsrc) {
           	  var DetachSignStrCmd = "{\"name\": \"DetachSignStr\", \"p1\": \""+strdn+"\", \"p2\": \""+strsrc+"\"}";
           		return _Getretmsg(DetachSignStrCmd);
           },
           VerifyAttachedSign: function (strSignedData) {
           	  var VerifyAttachedSignCmd = "{\"name\": \"VerifyAttachedSign\", \"p1\": \""+strSignedData+"\"}";
           		return _Getretcode(VerifyAttachedSignCmd);
           },           
           VerifyDetachedSignStr: function (strSignedData,strsrc) {
           	  var VerifyDetachedSignStrCmd = "{\"name\": \"VerifyDetachedSignStr\", \"p1\": \""+strSignedData+"\", \"p2\": \""+strsrc+"\"}";
           		return _Getretcode(VerifyDetachedSignStrCmd);
           },
           EncryptEnvelopStr: function (strdn,strsrc) {
           	  var EncryptEnvelopStrCmd = "{\"name\": \"EncryptEnvelopStr\", \"p1\": \""+strdn+"\", \"p2\": \""+strsrc+"\"}";
           		return _Getretmsg(EncryptEnvelopStrCmd);
           },
           DecryptEnvelop: function (strEnvelop) {
           	  var DecryptEnvelopStrCmd = "{\"name\": \"DecryptEnvelop\", \"p1\": \""+strEnvelop+"\"}";
           		return _Getretcode(DecryptEnvelopStrCmd);
           },
           Digest: function (strSrcData) {
           	  var DigestCmd = "{\"name\": \"Digest\", \"p1\": \""+strSrcData+"\"}";
           		return _Getretmsg(DigestCmd);
           },
           CreateSignedEnvelopStr: function (strSignCertDN, strEncCertDN, strSrc) {
           	  var CreateSignedEnvelopStrCmd = "{\"name\": \"CreateSignedEnvelopStr\", \"p1\": \""+strSignCertDN+"\", \"p2\": \""+strEncCertDN+"\", \"p3\": \""+strSrc+"\"}";
           		return _Getretmsg(CreateSignedEnvelopStrCmd);
           },
           VerifySignedEnvelop: function (strEnvelop) {
           	  var VerifySignedEnvelopCmd = "{\"name\": \"VerifySignedEnvelop\", \"p1\": \""+strEnvelop+"\"}";
           		return _Getretcode(VerifySignedEnvelopCmd);
           },
           GetCertInfo: function (strCertType,lInfoType,strOID){
           		var GetCertInfoCmd = "{\"name\": \"GetCertInfo\", \"p1\": \""+strCertType+"\", \"p2\": "+lInfoType+", \"p3\": \""+strOID+"\"}";	
           		return _Getretmsg(GetCertInfoCmd);
           },           
           SetAlgorithm: function (strHashAlg, strEncAlg){ 
           	  var SetAlgorithmCmd = "{\"name\": \"SetAlgorithm\", \"p1\": \""+strHashAlg+"\", \"p2\": \""+strEncAlg+"\"}";	              		
           		return _Getretcode(SetAlgorithmCmd);
           },
           SymmetricEncrypt: function (strSymmetricKey, strSrcData, isPad){ 
           	  var SymmetricEncryptCmd = "{\"name\": \"SymmetricEncrypt\", \"p1\": \""+strSymmetricKey+"\", \"p2\": \""+strSrcData+"\", \"p3\": "+isPad+"}";	              		
           		return _Getretmsg(SymmetricEncryptCmd);
           },
           SymmetricDecrypt: function (strSymmetricKey, strEncryptData, isPad){ 
           	  var SymmetricDecryptCmd = "{\"name\": \"SymmetricDecrypt\", \"p1\": \""+strSymmetricKey+"\", \"p2\": \""+strEncryptData+"\", \"p3\": "+isPad+"}";	              		
           		return _Getretmsg(SymmetricDecryptCmd);
           },
           GetCertList: function (strCertType, strCertDN, strCertSN, strCertEmail, strCertIssuerDN, lInfoType){ 
           	  var GetCertListCmd = "{\"name\": \"GetCertList\", \"p1\": \""+strCertType+"\", \"p2\": \""+strCertDN+"\", \"p3\": \""+strCertSN+"\", \"p4\": \""+strCertEmail+"\", \"p5\": \""+strCertIssuerDN+"\", \"p6\": "+lInfoType+"}";	              		
           		return _Getretmsg(GetCertListCmd);
           },
           GetCertLists: function (strCertType, strCertDN, strCertSN, strCertEmail, strCertIssuerDN, lInfoType){ 
           	  var GetCertListsCmd = "{\"name\": \"GetCertLists\", \"p1\": \""+strCertType+"\", \"p2\": \""+strCertDN+"\", \"p3\": \""+strCertSN+"\", \"p4\": \""+strCertEmail+"\", \"p5\": \""+strCertIssuerDN+"\", \"p6\": "+lInfoType+"}";	              		
           		return _Getretmsg(GetCertListsCmd);
           },
           SetCertByBase64: function (strBase64){ 
           	  var SetCertByBase64Cmd = "{\"name\": \"SetCertByBase64\", \"p1\": \""+strBase64+"\"}";	              		
           		return _Getretcode(SetCertByBase64Cmd);
           }, 
           SetCertByBase64Ex: function (strBase64){ 
           	  var SetCertByBase64ExCmd = "{\"name\": \"SetCertByBase64Ex\", \"p1\": \""+strBase64+"\"}";	              		
           		return _Getretcode(SetCertByBase64ExCmd);
           }, 
           ChangeCertDN: function (strCertDN, lChangeFlag){ 
           	  var ChangeCertDNCmd = "{\"name\": \"ChangeCertDN\", \"p1\": \""+strCertDN+"\", \"p2\": "+lChangeFlag+"}";	              		
           		return _Getretmsg(ChangeCertDNCmd);
           },          
           GetVersion: function (){               		
           		return _Getretmsg(GetVersionCmd);
           },
           GetMac: function (){               		
           		return _Getretmsg(GetMacCmd);
           },
           GetData: function (){               		
           		return _Getretmsg(GetDataCmd);
           },
           CheckCertIsExist: function(strCertSN){ 
           	  var CheckCertIsExistCmd = "{\"name\": \"CheckCertIsExist\", \"p1\": \""+strCertSN+"\"}";             		
           		return _Getretvalue(CheckCertIsExistCmd);
           },            
           AttachSignStr_Batch: function (types,strCertType,strDN,strSN,strEmail,strDNIssuer,strCertBase64,strpincode, strdn,strsrc) {	           	  
							var AttachSignStr_BatchCmd ="{\"name\": \"BatchCmd\", "+
       	                                  "\"Items\": [{\"name\": \"SetCertChooseType\", \"p1\": "+types+"},"+
													           	                "{\"name\": \"SetCert\", \"p1\": \""+strCertType+"\", \"p2\": \""+strDN+"\", \"p3\": \""+strSN+"\", \"p4\": \""+strEmail+"\", \"p5\": \""+strDNIssuer+"\", \"p6\": \""+strCertBase64+"\"},"+
													           	                "{\"name\": \"AttachSignStr\", \"p1\": \""+strdn+"\", \"p2\": \""+strsrc+"\"}]}";														           	              
           		return _Getretvalue(AttachSignStr_BatchCmd);
           },   
           VerifyAttachedSign_Batch: function (strSignedData) {	           	  
           	  var VerifyAttachedSign_BatchCmd ="{\"name\": \"BatchCmd\", "+
       	                                       "\"Items\": [{\"name\": \"VerifyAttachedSign\", \"p1\": \""+strSignedData+"\"}]}";	
           		return _Getretvalue(VerifyAttachedSign_BatchCmd);
           },   
           MOF_SetFlag: function (types) {
           		var MOFSetFlagCmd = "{\"name\": \"MOF_SetFlag\", \"p1\": "+types+"}";
           		return _Getretcode(MOFSetFlagCmd);	
           }, 
           MOF_DetachSignStr: function (strdn,iscert,strsrc,strserverinfo) {
           	  var MOFDetachSignStrCmd = "{\"name\": \"MOF_DetachSignStr\", \"p1\": \""+strdn+"\", \"p2\": "+iscert+", \"p3\": \""+strsrc+"\", \"p4\": \""+strserverinfo+"\"}";
           		return _Getretmsg(MOFDetachSignStrCmd);
           },     
           MOF_VerifyDetachedSignStr: function (strSignedData,strsrc) {
           	  var MOFVerifyDetachedSignStrCmd = "{\"name\": \"MOF_VerifyDetachedSignStr\", \"p1\": \""+strSignedData+"\", \"p2\": \""+strsrc+"\"}";
           		return _Getretcode(MOFVerifyDetachedSignStrCmd);
           },
           MOF_EncryptEnvelopStr: function (strdn,strsrc,strserverinfo) {
           	  var MOFEncryptEnvelopStrCmd = "{\"name\": \"MOF_EncryptEnvelopStr\", \"p1\": \""+strdn+"\", \"p2\": \""+strsrc+"\", \"p3\": \""+strserverinfo+"\"}";
           		return _Getretmsg(MOFEncryptEnvelopStrCmd);
           },
           MOF_DecryptEnvelop: function (strEnvelop) {
           	  var MOFDecryptEnvelopStrCmd = "{\"name\": \"MOF_DecryptEnvelop\", \"p1\": \""+strEnvelop+"\"}";
           		return _Getretcode(MOFDecryptEnvelopStrCmd);
           },     
           //file           
           DigestFromFile: function (strSrcFileName) {  
           	  var strFileName = strSrcFileName.replace(/\\/g,'\\\\');         	  
           	  var DigestFromFileCmd = "{\"name\": \"DigestFromFile\", \"p1\": \""+strFileName+"\"}";
           		return _Getretmsg(DigestFromFileCmd);
           },
           SetFileNameUseUTF8: function (isUTF8) {          	  
           	  var SetFileNameUseUTF8Cmd = "{\"name\": \"SetFileNameUseUTF8\", \"p1\": "+isUTF8+"}";
           		return _Getretcode(SetFileNameUseUTF8Cmd);
           },
           AttachSignEx: function (strDN, strFileName, strFileNameOut) {
           	  var strFileName1 = strFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strFileNameOut.replace(/\\/g,'\\\\');             	  
           	  var AttachSignExCmd = "{\"name\": \"AttachSignEx\", \"p1\": \""+strDN+"\", \"p2\": \""+strFileName1+"\", \"p3\": \""+strFileName2+"\"}";
           		return _Getretmsg(AttachSignExCmd);
           },
           VerifyAttachedSignEx: function (strFileNameAttached) {
           	  var strFileName = strFileNameAttached.replace(/\\/g,'\\\\');   
           	  var VerifyAttachedSignCmd = "{\"name\": \"VerifyAttachedSignEx\", \"p1\": \""+strFileName+"\"}";
           		return _Getretcode(VerifyAttachedSignCmd);
           },
           GetFile: function (strFileSavePath) {
           	  var strFileName = strFileSavePath.replace(/\\/g,'\\\\');   
           	  var GetFileCmd = "{\"name\": \"GetFile\", \"p1\": \""+strFileName+"\"}";
           		return _Getretmsg(GetFileCmd);
           },
           JITVerifyAttachFromFile_BigData: function (strInFileName, strOutFilePath) {
           	  var strFileName1 = strInFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strOutFilePath.replace(/\\/g,'\\\\'); 
           	  var JITVerifyAttachFromFile_BigDataCmd = "{\"name\": \"JITVerifyAttachFromFile_BigData\", \"p1\": \""+strFileName1+"\", \"p2\": \""+strFileName2+"\"}";
           		return _Getretcode(JITVerifyAttachFromFile_BigDataCmd);
           },
           JITAttachFromFile_BigData: function (strCertDN, strSrcFileName, strOutFileName) {
           	  var strFileName1 = strSrcFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strOutFileName.replace(/\\/g,'\\\\'); 
           	  var JITAttachFromFile_BigDataCmd = "{\"name\": \"JITAttachFromFile_BigData\", \"p1\": \""+strCertDN+"\", \"p2\": \""+strFileName1+"\", \"p3\": \""+strFileName2+"\"}";
           		return _Getretcode(JITAttachFromFile_BigDataCmd);
           },
           DetachSignEx: function (strDN, strFileName, strFileNameOut) {
           	  var strFileName1 = strFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strFileNameOut.replace(/\\/g,'\\\\');             	  
           	  var DetachSignExCmd = "{\"name\": \"DetachSignEx\", \"p1\": \""+strDN+"\", \"p2\": \""+strFileName1+"\", \"p3\": \""+strFileName2+"\"}";
           		return _Getretmsg(DetachSignExCmd);
           },
           JITDetachFromFile_BigData: function (strCertDN, strSrcFileName, strOutFileName) {
           	  var strFileName1 = strSrcFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strOutFileName.replace(/\\/g,'\\\\'); 
           	  var JITDetachFromFile_BigDataCmd = "{\"name\": \"JITDetachFromFile_BigData\", \"p1\": \""+strCertDN+"\", \"p2\": \""+strFileName1+"\", \"p3\": \""+strFileName2+"\"}";
           		return _Getretcode(JITDetachFromFile_BigDataCmd);
           },
           JITDetachFromFile_BigData_Val: function (strCertDN, strSrcFileName, strOutFileName) {
           	  var strFileName1 = strSrcFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strOutFileName.replace(/\\/g,'\\\\'); 
           	  var JITDetachFromFile_BigData_ValCmd = "{\"name\": \"JITDetachFromFile_BigData_Val\", \"p1\": \""+strCertDN+"\", \"p2\": \""+strFileName1+"\", \"p3\": \""+strFileName2+"\"}";
           		return _Getretmsg(JITDetachFromFile_BigData_ValCmd);
           },
           VerifyDetachedSignEx: function (strSignedData, strFileNameDetached, strFileName) {
           	  var strFileName1 = strFileNameDetached.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strFileName.replace(/\\/g,'\\\\'); 
           	  var VerifyDetachedSignExCmd = "{\"name\": \"VerifyDetachedSignEx\", \"p1\": \""+strSignedData+"\", \"p2\": \""+strFileName1+"\", \"p3\": \""+strFileName2+"\"}";
           		return _Getretcode(VerifyDetachedSignExCmd);
           },
           JITVerifyDetachFromFile_BigData: function (strSrcFileName, strSignFileName) {
           	  var strFileName1 = strSrcFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strSignFileName.replace(/\\/g,'\\\\'); 
           	  var JITVerifyDetachFromFile_BigDataCmd = "{\"name\": \"JITVerifyDetachFromFile_BigData\", \"p1\": \""+strFileName1+"\", \"p2\": \""+strFileName2+"\"}";
           		return _Getretcode(JITVerifyDetachFromFile_BigDataCmd);
           },
           CreateSignedEnvelopEx: function (strSignCertDN, strEncCertDN, strFileName, strFileNameOut) {
           	  var strFileName1 = strFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strFileNameOut.replace(/\\/g,'\\\\');             	  
           	  var CreateSignedEnvelopExCmd = "{\"name\": \"CreateSignedEnvelopEx\", \"p1\": \""+strSignCertDN+"\", \"p2\": \""+strEncCertDN+"\", \"p3\": \""+strFileName1+"\", \"p4\": \""+strFileName2+"\"}";
           		return _Getretmsg(CreateSignedEnvelopExCmd);
           },
           JITSignEnvelopeFromFile_BigData: function (strSignCertDN, strEncCertDN, strSrcFileName, strOutFileName) {
           	  var strFileName1 = strSrcFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strOutFileName.replace(/\\/g,'\\\\');             	  
           	  var JITSignEnvelopeFromFile_BigDataCmd = "{\"name\": \"JITSignEnvelopeFromFile_BigData\", \"p1\": \""+strSignCertDN+"\", \"p2\": \""+strEncCertDN+"\", \"p3\": \""+strFileName1+"\", \"p4\": \""+strFileName2+"\"}";
           		return _Getretmsg(JITSignEnvelopeFromFile_BigDataCmd);
           },
           VerifySignedEnvelopEx: function (strEvpFile) {
           	  var strFileName = strEvpFile.replace(/\\/g,'\\\\');  
           	  var VerifySignedEnvelopExCmd = "{\"name\": \"VerifySignedEnvelopEx\", \"p1\": \""+strFileName+"\"}";
           		return _Getretcode(VerifySignedEnvelopExCmd);	
           },
           JITDecryptSignEnvelopeFromFile_BigData: function (strInFileName, strOutFilePath) {
           	  var strFileName1 = strInFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strOutFilePath.replace(/\\/g,'\\\\'); 
           	  var JITDecryptSignEnvelopeFromFile_BigDataCmd = "{\"name\": \"JITDecryptSignEnvelopeFromFile_BigData\", \"p1\": \""+strFileName1+"\", \"p2\": \""+strFileName2+"\"}";
           		return _Getretcode(JITDecryptSignEnvelopeFromFile_BigDataCmd);
           },
           SymmetricEncryptFromFile: function (strSymmetricKey, strSrcFileName, strEncryptFileName,  isPad) {
           	  var strFileName1 = strSrcFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strEncryptFileName.replace(/\\/g,'\\\\');             	  
           	  var SymmetricEncryptFromFileCmd = "{\"name\": \"SymmetricEncryptFromFile\", \"p1\": \""+strSymmetricKey+"\", \"p2\": \""+strFileName1+"\", \"p3\": \""+strFileName2+"\", \"p4\": "+isPad+"}";
           		return _Getretcode(SymmetricEncryptFromFileCmd);
           },
           SymmetricDecryptFromFile: function (strSymmetricKey, strEncryptFileName, strSrcFileName,  isPad ) {
           	  var strFileName1 = strEncryptFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strSrcFileName.replace(/\\/g,'\\\\');             	  
           	  var SymmetricDecryptFromFileCmd = "{\"name\": \"SymmetricDecryptFromFile\", \"p1\": \""+strSymmetricKey+"\", \"p2\": \""+strFileName1+"\", \"p3\": \""+strFileName2+"\", \"p4\": "+isPad+"}";
           		return _Getretcode(SymmetricDecryptFromFileCmd);
           },   
           EncryptEnvelopEx: function (strDN, strFileName, strFileNameOut) {
           	  var strFileName1 = strFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strFileNameOut.replace(/\\/g,'\\\\');             	  
           	  var EncryptEnvelopExCmd = "{\"name\": \"EncryptEnvelopEx\", \"p1\": \""+strDN+"\", \"p2\": \""+strFileName1+"\", \"p3\": \""+strFileName2+"\"}";
           		return _Getretmsg(EncryptEnvelopExCmd);
           },
           DecryptEnvelopEx: function (strFileName) {
           	  var strFileName = strFileName.replace(/\\/g,'\\\\');               	  
           	  var DecryptEnvelopExCmd = "{\"name\": \"DecryptEnvelopEx\", \"p1\": \""+strFileName+"\"}";
           		return _Getretcode(DecryptEnvelopExCmd);
           },
           JITCreateEnvelopeFromFile_BigData: function (strDN, strFileName, strFileNameOut) {
           	  var strFileName1 = strFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strFileNameOut.replace(/\\/g,'\\\\');             	  
           	  var JITCreateEnvelopeFromFile_BigDataCmd = "{\"name\": \"JITCreateEnvelopeFromFile_BigData\", \"p1\": \""+strDN+"\", \"p2\": \""+strFileName1+"\", \"p3\": \""+strFileName2+"\"}";
           		return _Getretcode(JITCreateEnvelopeFromFile_BigDataCmd);
           },
           JITDecryptEnvelopeFromFile_BigData: function (strInFileName, strOutFilePath) {
           	  var strFileName1 = strInFileName.replace(/\\/g,'\\\\');   
           	  var strFileName2 = strOutFilePath.replace(/\\/g,'\\\\'); 
           	  var JITDecryptEnvelopeFromFile_BigDataCmd = "{\"name\": \"JITDecryptEnvelopeFromFile_BigData\", \"p1\": \""+strFileName1+"\", \"p2\": \""+strFileName2+"\"}";
           		return _Getretcode(JITDecryptEnvelopeFromFile_BigDataCmd);
           }
           
           		           
	   }
}();