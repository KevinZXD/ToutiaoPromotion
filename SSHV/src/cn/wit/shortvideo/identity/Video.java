package cn.wit.shortvideo.identity;

public class Video {
	private int id;
	private String video_id;
	private String title;
	private String video_url;
	private String image_url;
	private String ti;
	private String public_date;
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getVideo_url() {
		return video_url;
	}
	public void setVideo_url(String video_url) {
		this.video_url = video_url;
	}
	public String getImage_url() {
		return image_url;
	}
	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}
	public String getTi() {
		return ti;
	}
	public void setTi(String ti) {
		this.ti = ti;
	}
	public String getPublic_date() {
		return public_date;
	}
	public void setPublic_date(String public_date) {
		this.public_date = public_date;
	}
	public Video(int id, String video_id, String title, String video_url, String image_url, String ti,
			String public_date) {
		super();
		this.id = id;
		this.video_id = video_id;
		this.title = title;
		this.video_url = video_url;
		this.image_url = image_url;
		this.ti = ti;
		this.public_date = public_date;
	}
	public Video() {
		//super();
		// TODO Auto-generated constructor stub
	}
}
