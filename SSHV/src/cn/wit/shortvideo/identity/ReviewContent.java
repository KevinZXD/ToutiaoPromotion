package cn.wit.shortvideo.identity;

public class ReviewContent {
	private int id=0;
	private String video_id;
	private String user_id;
	private String user_name;
	private String public_data;
	private String content;
	public ReviewContent(int id, String video_id, String user_id, String user_name, String public_data,
			String content) {
		super();
		this.id = id;
		this.video_id = video_id;
		this.user_id = user_id;
		this.user_name = user_name;
		this.public_data = public_data;
		this.content = content;
	}
	public ReviewContent() {
		super();
		// TODO Auto-generated constructor stub
	}
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
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getPublic_data() {
		return public_data;
	}
	public void setPublic_data(String public_data) {
		this.public_data = public_data;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

	

}
