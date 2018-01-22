package cn.wit.shortvideo.dao;
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.PreparedStatement;  
import java.sql.SQLException;

import com.mysql.jdbc.Statement;  
public class DBHelper {  
public static final String url = "jdbc:mysql://127.0.0.1/headline";  
public static final String name = "com.mysql.jdbc.Driver";  
public static final String user = "root";  
public static final String password = "kevin_zxd";  
public Connection conn = null;  
public PreparedStatement pst = null;  
public DBHelper(String sql) {  
try {  
            Class.forName(name);//指定连接类型  
            conn = DriverManager.getConnection(url, user, password);//获取连接  
            pst = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);//准备执行语句  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  
public void close() {  
try {  
this.conn.close();  
this.pst.close();  
        } catch (SQLException e) {  
            e.printStackTrace();  
        }  
    }  
}  