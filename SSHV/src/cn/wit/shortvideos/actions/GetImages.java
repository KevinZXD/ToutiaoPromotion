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

public class GetImages {
	private String limit;
	private String title;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}



	public GetImages(String limit, String title) {
		super();
		this.limit = limit;
		this.title = title;
	}

	public GetImages() {
		//super();
		// TODO Auto-generated constructor stub
	}
	public void getTopImages() throws IOException {
		HttpServletResponse response=ServletActionContext.getResponse();  
	    //以下代码从JSON.java中拷过来的  
	    response.setContentType("text/html");  
	    ResultSet ret=null;
	    String jsonstring=null;
	    System.out.println(limit+title);
	    String sql="select * from tb_images limit "+limit+" ,12";
	     ret  =  DBUtils.querybysql(sql);
		String[] column=new String[]{" ","id","title","url","image_url"};
		try {
			int len=ret.getMetaData().getColumnCount();
			if(len!=0){
				 jsonstring = GetResultSet.resultSetToJsonbyColumn(ret, column);
			}else{
				System.out.println("图片检索出错");
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
