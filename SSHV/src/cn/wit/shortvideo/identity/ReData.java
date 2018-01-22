package cn.wit.shortvideo.identity;

public class ReData {
@Override
	public String toString() {
		return "ReData [email=" + email + ", passwd=" + passwd + ", contact=" + contact + "]";
	}
public String email;
public String passwd;
public String contact;

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}
public String getPasswd() {
	return passwd;
}
public void setPasswd(String passwd) {
	this.passwd = passwd;
}
public String getContact() {
	return contact;
}
public void setContact(String contact) {
	this.contact = contact;
}
public ReData(String email, String passwd, String contact) {
	//super();
	this.email = email;
	this.passwd = passwd;
	this.contact = contact;
}
public ReData(){
	
}
}
