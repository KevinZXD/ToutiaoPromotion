package cn.wit.shortvideos.actions;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import cn.wit.shortvideo.dao.*;
import cn.wit.shortvideo.identity.ReviewContent;
import net.sf.json.JSONObject;


public class InsertContentAction {
	private int id;
	private String video_id;
	private String user_id;
	private String user_name;
	private String public_data;
	private String content;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getVideo_id() {
		return video_id;
	}
	public void setVideo_id(String video_id) {
		this.video_id = video_id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getPublic_data() {
		return public_data;
	}
	public void setPublic_data(String public_data) {
		this.public_data = public_data;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public InsertContentAction() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	@Override
	public String toString() {
		return "InsertContentAction [id=" + id + ", video_id=" + video_id + ", user_id=" + user_id + ", user_name="
				+ user_name + ", public_data=" + public_data + ", content=" + content + "]";
	}
	public InsertContentAction(int id, String video_id, String user_id, String user_name, String public_data,
			String saying) {
		super();
		this.id = id;
		this.video_id = video_id;
		this.user_id = user_id;
		this.user_name = user_name;
		this.public_data = public_data;
		this.content = content;
	}

	
	public void execute() throws IOException, SQLException {
		Date date=new Date();
		public_data=date.toString();
		int tip = -1;
		System.out.println(this.toString());
		ReviewContent conte=new ReviewContent();
        conte.setUser_id(user_id);
        conte.setVideo_id(video_id);
        conte.setUser_name(user_name);
        conte.setPublic_data(public_data);
        conte.setContent(content);
     //hibernate为什么不行，传统如何处理唯一性
	//	tip=SaveDissContent.insert(cont);
		//System.out.println(tip);
        boolean flag=DBUtils.regis(conte);
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
}
