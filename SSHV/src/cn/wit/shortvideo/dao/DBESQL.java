package cn.wit.shortvideo.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;

public class DBESQL {
public static int executeSql(Map<String,String> map,String sql){
	int flag=0;
	int i=1;

DBHelper db1 = new DBHelper(sql);// 创建DBHelper对象
try {
	PreparedStatement preStmt1 = db1.pst;

for(String value:map.values()){
	preStmt1.setString(i, value);
	i++;
}
flag = preStmt1.executeUpdate();// 执行语句，得到结果集
	
	db1.close();// 关闭连接
} catch (SQLException e) {
	e.printStackTrace();
	
}
	return flag;
}
public static void main(String[] args) {

}

}