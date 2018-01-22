package cn.wit.shortvideos.actions;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import cn.wit.shortvideo.dao.DBUtils;
import cn.wit.shortvideo.dao.GetResultSet;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

public class InsertFeedBack {
private String userid;
private String advice;
private String contact;
private String username;
private String publicdate;

public String getPublicdate() {
	return publicdate;
}
public void setPublicdate(String publicdate) {
	this.publicdate = publicdate;
}
public String getUserid() {
	return userid;
}
public void setUserid(String userid) {
	this.userid = userid;
}
public String getAdvice() {
	return advice;
}
public void setAdvice(String advice) {
	this.advice = advice;
}
public String getContact() {
	return contact;
}
public void setContact(String contact) {
	this.contact = contact;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public InsertFeedBack(String userid, String advice, String contact, String username,String publicdate) {
	super();
	this.userid = userid;
	this.advice = advice;
	this.contact = contact;
	this.username = username;
	this.publicdate=publicdate;
}
public InsertFeedBack() {
	super();
	// TODO Auto-generated constructor stub
}
public void execute() throws SQLException, IOException {
	List<String> list=new ArrayList();
	SimpleDateFormat dateformate=new SimpleDateFormat("yyyy-MM-dd");
	 
	publicdate=dateformate.format(new Date());
	boolean flag=false;
	if(userid.trim().isEmpty()||username.trim().isEmpty()||advice.trim().isEmpty()||contact.trim().isEmpty()) {
		flag=false;
	}else {
		list.add(userid.trim());
		list.add(username.trim());
		list.add(advice.trim());
		list.add(contact.trim());
		list.add(publicdate.trim());
		System.out.println(list);

			String sql="insert into tb_feedback(userid,username,advice,contact,publicdate)values(?,?,?,?,?) ";
			flag=DBUtils.regisX(list,sql,5);
		
	}
	
	
    System.out.println(flag);
    HttpServletResponse response=ServletActionContext.getResponse();  
    //以下代码从JSON.java中拷过来的  
    response.setContentType("text/html"); 
    response.setCharacterEncoding("UTF-8");
	response.setContentType("text/json;charset=utf-8");
	JSONObject json=new JSONObject();  
    json.accumulate("tip", flag);
    PrintWriter out;  
    out = response.getWriter();  
	 out.println(json.toString()); 
	  out.flush();  
      out.close();
}
public void getFeedBack() throws IOException {
	HttpServletResponse response=ServletActionContext.getResponse();  
    //以下代码从JSON.java中拷过来的  
    response.setContentType("text/html");  
    ResultSet ret=null;
    String jsonstring=null;
   
    String sql="select * from tb_feedback  ";
     ret  =  DBUtils.querybysql(sql);
	String[] column=new String[]{" ","id","userid","advice","username","contact","publicdate"};
	try {
		int len=ret.getMetaData().getColumnCount();
		if(len!=0){
			 jsonstring = GetResultSet.resultSetToJsonbyColumn(ret, column);
		}else{
			System.out.println("用户反馈检索出错");
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
public static void main(String[] args) {
	SimpleDateFormat dateformate=new SimpleDateFormat("yyyy-MM-dd");
	String dateString =dateformate.format(new Date());
	System.out.println(dateString);
}
}
