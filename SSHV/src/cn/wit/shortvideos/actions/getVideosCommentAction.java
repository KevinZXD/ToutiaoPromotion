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

public class getVideosCommentAction {
	private String jsonstring;
	private String video_id;
	
	public getVideosCommentAction() {
		super();
		// TODO Auto-generated constructor stub
	}

	public getVideosCommentAction(String jsonstring,String video_id) {
		super();
		this.jsonstring = jsonstring;
		this.video_id=video_id;
	}

	public String getVideo_id() {
		return video_id;
	}

	public void setVideo_id(String video_id) {
		this.video_id = video_id;
	}

	public String getJsonstring() {
		return jsonstring;
	}

	public void setJsonstring(String jsonstring) {
		this.jsonstring = jsonstring;
	}

	public void execute() throws IOException {
		HttpServletResponse response=ServletActionContext.getResponse();  
	    //以下代码从JSON.java中拷过来的 
		String sql=null;
	    response.setContentType("text/html");  
	    if(!video_id.equals("all")) {
	     sql = "select * from tb_review_content where video_id= "+video_id;}else {
	    	sql="select * from tb_review_content ";
	    }
		ResultSet ret  =  DBUtils.querybysql(sql);
		String[] column=new String[]{" ","video_id","user_id","user_name","public_data","content","id"};
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
