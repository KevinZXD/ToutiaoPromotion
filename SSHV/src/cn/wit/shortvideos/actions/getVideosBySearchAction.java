package cn.wit.shortvideos.actions;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import cn.wit.shortvideo.dao.DBUtils;
import cn.wit.shortvideo.dao.GetResultSet;
import net.sf.json.JSONException;

public class getVideosBySearchAction {
	private int id;
	private String video_id;
	private String title;
	private String video_url;
	private String image_url;
	private String ti;
	private String public_date;
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getVideo_url() {
		return video_url;
	}
	public void setVideo_url(String video_url) {
		this.video_url = video_url;
	}
	public String getImage_url() {
		return image_url;
	}
	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}
	public String getTi() {
		return ti;
	}
	public void setTi(String ti) {
		this.ti = ti;
	}
	public String getPublic_date() {
		return public_date;
	}
	public void setPublic_date(String public_date) {
		this.public_date = public_date;
	}
	public getVideosBySearchAction() {
		super();
		// TODO Auto-generated constructor stub
	}
	public getVideosBySearchAction(int id, String video_id, String title, String video_url, String image_url, String ti,
			String public_date) {
		super();
		this.id = id;
		this.video_id = video_id;
		this.title = title;
		this.video_url = video_url;
		this.image_url = image_url;
		this.ti = ti;
		this.public_date = public_date;
	}
	
	public   void execute() throws IOException {
		HttpServletResponse response=ServletActionContext.getResponse();  
	    //以下代码从JSON.java中拷过来的 
		 String sql = "select * from budejie where title like '%"+title+"%'" ;
	    response.setContentType("text/html");  
	    if(title.trim().isEmpty()) {
	    	sql="select * from budejie limit 12,12";
	    }
	   
	    System.out.println("SQL:"+sql);
	    System.out.println(title);
	    String jsonstring=null;
		ResultSet ret  =  DBUtils.querybysql(sql);
		try {
			int len=ret.getMetaData().getColumnCount();
			if(len!=0){
				 jsonstring = GetResultSet.resultSetToJson(ret);
			}else{
				System.out.println("检索出错");
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
