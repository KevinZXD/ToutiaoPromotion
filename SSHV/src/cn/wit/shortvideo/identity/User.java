package cn.wit.shortvideo.identity;

public class User {
String email=null;
String password=null;
String contract=null;
String tele=null;
String qq=null;
String company=null;
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
public String getContract() {
	return contract;
}
public void setContract(String contract) {
	this.contract = contract;
}
public String getTele() {
	return tele;
}
public void setTele(String tele) {
	this.tele = tele;
}
public String getQq() {
	return qq;
}
public void setQq(String qq) {
	this.qq = qq;
}
public String getCompany() {
	return company;
}
public void setCompany(String company) {
	this.company = company;
}
public User(String email, String password, String contract, String tele, String qq, String company) {
	//super();
	this.email = email;
	this.password = password;
	this.contract = contract;
	this.tele = tele;
	this.qq = qq;
	this.company = company;
}
public User(){
	
}
}
