package cn.wit.shortvideos.actions;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import cn.wit.shortvideo.dao.DBUtils;
import cn.wit.shortvideo.dao.GetResultSet;
import cn.wit.shortvideo.identity.Video;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;


public class getVideosAction {
private String index;
private String table;
private String jsonstring;
private int len;
private String info;


public String getJsonstring() {
	return jsonstring;
}

public void setJsonstring(String jsonstring) {
	this.jsonstring = jsonstring;
}

public String getInfo() {
	return info;
}

public void setInfo(String info) {
	this.info = info;
}

public String getIndex() {
	return index;
}

public void setIndex(String index) {
	this.index = index;
}

public String getTable() {
	return table;
}

public void setTable(String table) {
	this.table = table;
}


public getVideosAction() {
	super();
	// TODO Auto-generated constructor stub
}
public String getVideosJsonObject() {
	ResultSet ret  =  DBUtils.querybyindex(index);
	return "success";
}
public void execute() throws IOException {
	HttpServletResponse response=ServletActionContext.getResponse();  
    //以下代码从JSON.java中拷过来的  
    response.setContentType("text/html");  
    ResultSet ret=null;
    
	System.out.println(index+table);
	if(!table.equals("sequence")) {
		int max=Integer.valueOf(index);
		 index=String.valueOf(((int) (Math.random()*max)));
		  ret  =  DBUtils.querybyindex(index);
	}else {
		 ret  =  DBUtils.querybyindexlen(index,"30");
	}
		
	
	System.out.println("起始页为："+index);
	
	try {
		int len=ret.getMetaData().getColumnCount();
		if(len!=0){
			 jsonstring = GetResultSet.resultSetToJson(ret);
		}else{
			System.out.println("越界！！！");
		}
		
	} catch (JSONException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	response.setCharacterEncoding("UTF-8");
	response.setContentType("text/json;charset=utf-8");
	System.out.println(jsonstring);
	PrintWriter out;  
    out = response.getWriter();  
	 out.println(jsonstring.toString()); 
	  out.flush();  
      out.close();
}

}
