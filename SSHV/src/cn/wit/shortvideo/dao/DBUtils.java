package cn.wit.shortvideo.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import cn.wit.shortvideo.identity.ReviewContent;

import cn.wit.shortvideo.identity.*;
import net.sf.json.JSONException;

public class DBUtils {
	static String sql = null;
	static DBHelper db1 = null;
	static ResultSet ret = null;

	public static ResultSet querybyindex(String pageIndex) {
		sql = "select * from budejie limit " + pageIndex + ",6";//
		db1 = new DBHelper(sql);//
		try {
			PreparedStatement preStmt = db1.pst;
			ret = db1.pst.executeQuery();//
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return ret;
	}

	public static ResultSet querybyindexlen(String pageIndex, String len) {
		sql = "select * from budejie limit " + pageIndex + ", " + len;//
		db1 = new DBHelper(sql);//
		try {
			PreparedStatement preStmt = db1.pst;
			ret = db1.pst.executeQuery();//
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return ret;
	}

	public static ResultSet querybysql(String sql) {

		db1 = new DBHelper(sql);//
		try {
			PreparedStatement preStmt = db1.pst;
			ret = db1.pst.executeQuery();//
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return ret;
	}

	public static boolean regis(ReviewContent content) throws SQLException {
		boolean flag = false;
		sql = "insert into tb_review_content(user_id,video_id,user_name,public_data,content) values(?,?,?,?,?)";
		// 原方法设置了Statement.RETURN_GENERATED_KEYS主键自增

		db1 = new DBHelper(sql);
		try {
			PreparedStatement preStmt = db1.pst;
			preStmt.setString(1, content.getUser_id());
			preStmt.setString(2, content.getVideo_id());
			preStmt.setString(3, content.getUser_name());
			preStmt.setString(4, content.getPublic_data());
			preStmt.setString(5, content.getContent());
			// int key=preStmt.getGeneratedKeys().getInt(1);//获得主键

			flag = !preStmt.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			flag = false;
		}
		db1.close();
		return flag;
	}
	public static boolean regisX(List<String> list,String sql,int len) throws SQLException {
		boolean flag = false;
		//sql = "insert into tb_review_content(user_id,video_id,user_name,public_data,content) values(?,?,?,?,?)";
		// 原方法设置了Statement.RETURN_GENERATED_KEYS主键自增

		db1 = new DBHelper(sql);
		try {
			PreparedStatement preStmt = db1.pst;
			for(int i=0;i<len;i++) {
				preStmt.setString(i+1, list.get(i));
			}
			
//			preStmt.setString(2, content.getVideo_id());
//			preStmt.setString(3, content.getUser_name());
//			preStmt.setString(4, content.getPublic_data());
//			preStmt.setString(5, content.getContent());
			// int key=preStmt.getGeneratedKeys().getInt(1);//获得主键

			flag = !preStmt.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			flag = false;
		}
		db1.close();
		return flag;
	}

	// 检索某表某列是否有某值
	public static boolean querybyinfo(String table, String col, String info) {
		String email1 = null;
		boolean flag = false;
		sql = "select *from " + table + " where " + col + "=?";// SQL语句
		db1 = new DBHelper(sql);// 创建DBHelper对象
		try {
			PreparedStatement preStmt = db1.pst;
			preStmt.setString(1, info);
			ret = db1.pst.executeQuery();// 执行语句，得到结果集
			while (ret.next()) {
				email1 = ret.getString(1);
				if (info.equals(info)) {
					flag = true;
				}
			} // 显示数据
			ret.close();
			db1.close();// 关闭连接
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return flag;
	}

	public static boolean registeruser(User user) {
		String email = user.getEmail();
		String passwd = user.getPassword();
		String conta = user.getContract();
		String qq = user.getQq();
		String tele = user.getTele();
		boolean flag = false;
		sql = "insert into users(email,password,contact,company,tele,qq) values(?,?,?,?,?,?)";
		db1 = new DBHelper(sql);
		try {
			PreparedStatement preStmt = db1.pst;
			preStmt.setString(1, user.getEmail());
			preStmt.setString(2, user.getPassword());
			preStmt.setString(3, user.getContract());
			preStmt.setString(4, user.getCompany());
			preStmt.setString(5, user.getTele());
			preStmt.setString(6, user.getQq());

			flag = !preStmt.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			flag = false;
		}
		db1.close();
		return flag;
	}

	public static ReData passmodify(String email1, String passwd1, String conta1) {
		ReData re = new ReData("email1", "passwd1", "conta1");
		String email = null;
		String passwd = null;
		String conta = null;
		boolean flag = false;
		sql = "select *from users where email=?";// SQL语句
		db1 = new DBHelper(sql);// 创建DBHelper对象
		try {
			PreparedStatement preStmt1 = db1.pst;
			preStmt1.setString(1, email1);
			ret = preStmt1.executeQuery();// 执行语句，得到结果集
			while (ret.next()) {
				email = ret.getString("email");
				passwd = ret.getString("company");
				conta = ret.getString("contact");
				re = new ReData(email, passwd, conta);
			} // 显示数据
			ret.close();
			db1.close();// 关闭连接
		} catch (SQLException e) {
			e.printStackTrace();
			flag = false;
		}

		return re;
	}

	public static int updatepasswd(String email, String newpasswd) {
		// TODO Auto-generated method stub
		int flag = 0;
		sql = "update users set password=? where email=?";// SQL语句
		db1 = new DBHelper(sql);// 创建DBHelper对象
		try {
			PreparedStatement preStmt = db1.pst;
			preStmt.setString(1, newpasswd);
			preStmt.setString(2, email);
			flag = preStmt.executeUpdate();

			db1.close();
			// 显示数据
			// 关闭连接
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return flag;
	}

	public static ReData querybyemail(String email1, String passwd1, String conta1) {
		String email = null;
		String passwd = null;
		String conta = null;
		boolean flag = false;
		ReData re = new ReData("email", "password", "contact");
		sql = "select *from users";// SQL语句
		db1 = new DBHelper(sql);// 创建DBHelper对象
		try {
			ret = db1.pst.executeQuery();// 执行语句，得到结果集
			while (ret.next()) {
				email = ret.getString(1);
				passwd = ret.getString(2);
				conta = ret.getString(3);
				if (email.equals(email1)) {
					// flag = true;
					System.out.println("matching..........");
					re = new ReData(email, passwd, conta);
				}
			} // 显示数据
			ret.close();
			db1.close();// 关闭连接
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return re;
	}
	public static String querybyemail(String email) {
		String userid=null;
		sql = "select *from users where email = '"+email+"'";// SQL语句
		System.out.println(sql);
		db1 = new DBHelper(sql);// 创建DBHelper对象
		try {
			ret = db1.pst.executeQuery();// 执行语句，得到结果集
			while (ret.next()) {
				userid = ret.getString(7);
			} // 显示数据
			ret.close();
			db1.close();// 关闭连接
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return userid;
	}

	public static boolean query(String email1, String passwd1, String conta1) {
		String email = null;
		String passwd = null;
		String conta = null;
		boolean flag = false;

		sql = "select *from users";// SQL语句
		db1 = new DBHelper(sql);// 创建DBHelper对象
		try {
			ret = db1.pst.executeQuery();// 执行语句，得到结果集
			while (ret.next()) {
				email = ret.getString(1);
				passwd = ret.getString(2);
				conta = ret.getString(3);
				if (email.equals(email1) && passwd.equals(passwd1) && conta.equals(conta1)) {
					flag = true;
				}
			} // 显示数据
			ret.close();
			db1.close();// 关闭连接
		} catch (SQLException e) {
			e.printStackTrace();
			flag = false;
		}
		return flag;
	}

}
