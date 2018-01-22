package cn.wit.shortvideos.actions;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import cn.wit.shortvideo.dao.DBUtils;
import cn.wit.shortvideo.dao.GetResultSet;
import cn.wit.shortvideo.identity.*;
import net.sf.json.JSONException;

public class UserValidationAction {
	private String contact;
	private String email;
	private String password;
	private String company;
	private String qq;
	private String tele;
	private String newpasswd;
	
	
	public String getNewpasswd() {
		return newpasswd;
	}
	public void setNewpasswd(String newpasswd) {
		this.newpasswd = newpasswd;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getTele() {
		return tele;
	}
	public void setTele(String tele) {
		this.tele = tele;
	}
	public UserValidationAction(String contact, String email, String password, String company, String qq, String tele) {
		super();
		this.contact = contact;
		this.email = email;
		this.password = password;
		this.company = company;
		this.qq = qq;
		this.tele = tele;
	}
	public UserValidationAction() {
		//super();
		
	}
	public void modifyU() throws IOException {
		String url=null;
    	String jsonstring=null;
        // 得到用户名和密码  
    	HttpServletResponse response=ServletActionContext.getResponse();  
	    //以下代码从JSON.java中拷过来的  
	    response.setContentType("text/html");
		
       
        System.out.println(email+password+contact+newpasswd);
        

        boolean e=false;
        boolean p=false;
        boolean c=false;
        
		ReData passmodify = DBUtils.passmodify(email,password,contact);
        System.out.println(passmodify);
        if(passmodify.getEmail().equals(email)){
          	  e = true;
          }
           if(passmodify.getPasswd().equals(password)){
          	 p=true;
          }
           if(passmodify.getContact().equals(contact)){
          	 c=true;
          }
           if (e==true&&p==true&&c==true) {  
        	   int update=DBUtils.updatepasswd(email, newpasswd);
        	   if (update==1){
        			System.out.println("修改成功");
                   	jsonstring="{\"url\":\"login.html\",\"email\":1,\"passwd\":1,\"contact\":1}";
                       System.out.println("login.html");
                            
        	   }else{
        		   jsonstring="{\"url\":\"passwd.html\",\"email\":1,\"passwd\":1,\"contact\":1}";
        	   }
           
           } else {   
               //request.setAttribute("email", email); 
               //request.setAttribute("info", "登陆失败"); 
           	if(e==false){
           		System.out.println("email is no registed!");
           		jsonstring="{\"url\":\"register.html\",\"email\":0,\"passwd\":0,\"contact\":0}";
           	}else if(p==false){
           		jsonstring="{\"url\":\"passwd.html\",\"email\":1,\"passwd\":0,\"contact\":0}";
           	}else if(c==false){
           		jsonstring="{\"url\":\"passwd.html\",\"email\":1,\"passwd\":1,\"contact\":0}";
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
	public void registerU() throws IOException {
		HttpServletResponse response=ServletActionContext.getResponse();  
	    //以下代码从JSON.java中拷过来的  
	    response.setContentType("text/html");
		
		boolean register = false;
		// 得到用户名和密码
		String jsonstring = null;
		
		User user = new User(email, password, contact, tele, qq, company);
		boolean e = DBUtils.querybyinfo("users","email", email);
		if (e == false) {
			register = DBUtils.registeruser(user);
			if (register == true) {
				jsonstring = "{\"url\":\"login.html\",\"email\":1,\"passwd\":1,\"contact\":1}";
			} 
			else{
				jsonstring = "{\"url\":\"register.html\",\"email\":0,\"passwd\":0,\"contact\":0}";
			}
		}else{
			System.out.println("email 已存在");
			
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
	public void loginU() throws IOException {
		boolean login=false;
    	String jsonstring=null; 
    	HttpServletResponse response=ServletActionContext.getResponse();  
	    //以下代码从JSON.java中拷过来的  
	    response.setContentType("text/html");

	    String userid=DBUtils.querybyemail(email);
        System.out.println(email);
        System.out.println(password);
        System.out.println(contact);
        boolean e=false;
        boolean p=false;
        boolean c=false;
        ReData re=DBUtils.querybyemail(email, password, contact);
       if(re.getEmail().equals(email)){
       	 e=true;
       }
        if(re.getPasswd().equals(password)){
       	 p=true;
       }
        if(re.getContact().equals(contact)){
       	 c=true;
       }
        login=DBUtils.query(email, password,contact);
        if (login==true) {  
        	System.out.println("登陆成功");
        	jsonstring="{\"url\":\"shortvideo.html\",\"email\":1,\"passwd\":1,\"contact\":1,\"userid\":"+userid+"}";
            System.out.println("shortvideo.html");
          
        } else {   
           
        	if(e==false){
        		System.out.println("email is no registed!");
        		jsonstring="{\"url\":\"register.html\",\"email\":0,\"passwd\":0,\"contact\":0}";
        	}else if(p==false){
        		jsonstring="{\"url\":\"login.html\",\"email\":1,\"passwd\":0,\"contact\":0}";
        	}else if(c==false){
        		jsonstring="{\"url\":\"login.html\",\"email\":1,\"passwd\":1,\"contact\":0}";
        	}
             
        } 
        System.out.println(jsonstring);
        response.setCharacterEncoding("UTF-8");
		response.setContentType("text/json;charset=utf-8");
		System.out.println(jsonstring);
		PrintWriter out;  
	    out = response.getWriter();  
		 out.println(jsonstring.toString()); 
		  out.flush();  
	      out.close();
	}
	public  void getU() throws IOException {
		HttpServletResponse response=ServletActionContext.getResponse();  
	    //以下代码从JSON.java中拷过来的 
		String sql=null;
		String jsonstring=null;
	    response.setContentType("text/html");  
	    
	     sql = "select * from users ";
		ResultSet ret  =  DBUtils.querybysql(sql);
		String[] column=new String[]{" ","email","password","contact","company","tele","qq","photo_id"};
		try {
			int len=ret.getMetaData().getColumnCount();
			if(len!=0){
				 jsonstring = GetResultSet.resultSetToJsonbyColumn(ret, column);
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
