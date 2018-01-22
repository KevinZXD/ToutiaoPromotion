package cn.wit.shortvideos.actions;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import cn.wit.shortvideo.dao.DBUtils;
import cn.wit.shortvideo.dao.GetResultSet;
import cn.wit.shortvideo.identity.Video;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

public class UserPromotionList {
private  String userid="1001";

public String getUserid() {
	return userid;
}

public void setUserid(String userid) {
	this.userid = userid;
}

public UserPromotionList(String userid) {
	super();
	this.userid = userid;
}

public UserPromotionList() {
	super();
	// TODO Auto-generated constructor stub
}
public  void execute() throws IOException {
	System.out.println(userid);
	boolean flag=true;
	JSONObject jo=new JSONObject();
	JSONArray json=new JSONArray();
	if(userid.trim().isEmpty()) {
		flag=false;
	}else {
		
	
	String getusertagsql="select * from tb_matching where user_id='"+userid+"'";
	ArrayList<String> usertaglist=new ArrayList<>();
	ArrayList<Video> video_matching_list=new ArrayList<>();
	ResultSet rs=DBUtils.querybysql(getusertagsql);
	try {
		ResultSetMetaData m = rs.getMetaData();
		int columns=m.getColumnCount();
		while(rs.next()) {
			for(int i=2;i<=columns;i++) {
				usertaglist.add(rs.getString(i));
				//System.out.println(rs.getString(i));
			}
		}
		System.out.println("该用户的匹配标签检索出"+usertaglist);
		
		
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	String getvideotagsql="select * from budejie_copy";
	ResultSet r = DBUtils.querybysql(getvideotagsql);
	try {
		ResultSetMetaData m = r.getMetaData();
		int columns=m.getColumnCount();
		while(r.next()) {
			if(columns>9) {
				columns=9;
			}
			
				String user_tag_id=r.getString(8).trim();
				//System.out.println(user_tag_id);
				if(usertaglist.contains(user_tag_id)) {
					int id=Integer.valueOf(r.getString(1));
					String video_id=r.getString(2);
					String title=r.getString(3);
					String video_url=r.getString(4);
					String image_url=r.getString(5);
					String ti=r.getString(6);
					String publicdate=r.getString(7);
				
					System.out.println("匹配成功"+r.getString(8));
					video_matching_list.add(new Video(id,video_id,title,video_url,image_url,ti,publicdate));
				}
				
			}
		
		
		for(Video vi :video_matching_list) {
			
			jo.put("id", vi.getId());
			jo.put("title",vi.getTitle());
			jo.put("video_url",vi.getVideo_url());
			jo.put("image_url",vi.getImage_url());
			jo.put("ti",vi.getTi());
			jo.put("public_date", vi.getPublic_date());
			json.add(jo);
			
		}
		System.out.println("该用户的匹配标签检索出"+usertaglist);
		System.out.println("该用户的匹配视频列表"+video_matching_list);
		System.out.println(json.toString());
		
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}}
	String jsonstring =json.toString();
	HttpServletResponse response=ServletActionContext.getResponse();  
    //以下代码从JSON.java中拷过来的  
    response.setContentType("text/html");
    response.setCharacterEncoding("UTF-8");
	response.setContentType("text/json;charset=utf-8");
	System.out.println(jsonstring);
	PrintWriter out;  
    out = response.getWriter();  
	 out.println(jsonstring.toString()); 
	  out.flush();  
      out.close();
}
public void getTags() throws IOException {
	HttpServletResponse response=ServletActionContext.getResponse();  
    //以下代码从JSON.java中拷过来的  
    response.setContentType("text/html");  
    ResultSet ret=null;
    String jsonstring=null;
   
    String sql="select * from tb_tags  ";
     ret  =  DBUtils.querybysql(sql);
	String[] column=new String[]{" ","tag_id","tag_name"};
	try {
		int len=ret.getMetaData().getColumnCount();
		if(len!=0){
			 jsonstring = GetResultSet.resultSetToJsonbyColumn(ret, column);
		}else{
			System.out.println("标签库检索出错");
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

public void getUserInterest() throws IOException {
	HttpServletResponse response=ServletActionContext.getResponse();  
    //以下代码从JSON.java中拷过来的  
    response.setContentType("text/html");  
    ResultSet ret=null;
    String jsonstring=null;
   
    String sql="select * from tb_matching  ";
     ret  =  DBUtils.querybysql(sql);
	String[] column=new String[]{" ","user_id","tag_id1","tag_id2","tag_id3","tag_id4","tag_id5","tag_id6"};
	try {
		int len=ret.getMetaData().getColumnCount();
		if(len!=0){
			 jsonstring = GetResultSet.resultSetToJsonbyColumn(ret, column);
		}else{
			System.out.println("用户兴趣点检索出错");
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
public static void main(String[] args) throws IOException {
	new UserPromotionList().execute();
//	List array=new ArrayList();
//	array.add("zd");
//	System.out.println(array.contains("zd"));
}
}
