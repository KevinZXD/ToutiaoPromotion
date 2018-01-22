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

public class QuestionSolution {
	private String tag;
	private String questionid;
	private String userid;
	private String contact;
	private String question;
	private String username;
	private String publicdate;
	private String answers;
	
	public QuestionSolution(String tag, String questionid, String userid, String contact, String question,
			String username, String publicdate, String answers) {
		super();
		this.tag = tag;
		this.questionid = questionid;
		this.userid = userid;
		this.contact = contact;
		this.question = question;
		this.username = username;
		this.publicdate = publicdate;
		this.answers = answers;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getQuestionid() {
		return questionid;
	}
	public void setQuestionid(String questionid) {
		this.questionid = questionid;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPublicdate() {
		return publicdate;
	}
	public void setPublicdate(String publicdate) {
		this.publicdate = publicdate;
	}
	public String getAnswers() {
		return answers;
	}
	public void setAnswers(String answers) {
		this.answers = answers;
	}
	public QuestionSolution() {
		super();
		// TODO Auto-generated constructor stub
	}
	public void insertQuestionAnswers() throws SQLException, IOException {
		String sql=null;
		List<String> list=new ArrayList();
		SimpleDateFormat dateformate=new SimpleDateFormat("yyyy-MM-dd");
		 
		publicdate=dateformate.format(new Date());
		boolean flag=false;
		if(userid.trim().isEmpty()||username.trim().isEmpty()) {
			flag=false;
		}else {
			list.add(userid.trim());
			list.add(username.trim());
			if(tag.equals("question")) {
				list.add(question.trim());
				list.add(contact.trim());
				 sql="insert into tb_question(userid,username,question,contact,publicdate)values(?,?,?,?,?) ";
				 list.add(publicdate.trim());
					System.out.println(list);
				flag=DBUtils.regisX(list,sql,5);
			}else {
				list.add(answers.trim());
				list.add(questionid.trim());
				list.add(question.trim());
				 sql="insert into tb_answers(userid,username,answers,questionid,questiontitle,publicdate)values(?,?,?,?,?,?) ";
				 list.add(publicdate.trim());
					System.out.println(list);
				flag=DBUtils.regisX(list,sql,6);
			}
			
			
			
			
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
	public void getQuestionAnswersByQid() throws IOException {
		HttpServletResponse response=ServletActionContext.getResponse();  
	    //以下代码从JSON.java中拷过来的 
		 String sql=null;
		 String [] column=null;
	    response.setContentType("text/html");  
	    ResultSet ret=null;
	    String jsonstring=null;
	   if(tag.equals("answersbyid")) {
		    sql="select * from tb_answers where questionid='"+questionid+"'";
		     ret  =  DBUtils.querybysql(sql);
			 column=new String[]{" ","id","questionid","userid","username","publicdate","answers","questiontitle"};
		   
	   }else if(tag.equals("question")){
		   sql="select * from tb_question ";
		     ret  =  DBUtils.querybysql(sql);
		     column=new String[]{" ","id","userid","contact","question","username","publicdate"};
		   
		   
	   }else {
		   sql="select * from tb_question where question like %'"+question+"%'";
		     ret  =  DBUtils.querybysql(sql);
			 column=new String[]{" ","id","userid","contact","question","username","publicdate"};
		   
	   }
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
}
