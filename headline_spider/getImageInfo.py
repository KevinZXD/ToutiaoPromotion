#-*- coding:utf-8 -*-
import urllib2
import re #正则
from bs4 import BeautifulSoup
import csv
import sys
import database
import send_email
def getImage(url,i):
    imagelist=[]
    req = urllib2.Request(url)  # 请求页面 # 加一个键值对，针对服务器的反爬机制
    req.add_header("User-Agent",
                   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36")
    html = urllib2.urlopen(req).read()
    soup = BeautifulSoup(html, 'lxml')
    images_content = soup.find_all('a', class_=re.compile('TypeBigPics'))
    for image in images_content:
        images=[]
        image_url = image.attrs['href'].replace(u'\xa0', u' ')
        image_src = image.img['src'].replace(u'\xa0', u' ')
        image_text = image.span.get_text().replace(u'\xa0', u' ')
        print(u"图片网址： " + image_url)
        print(u"图片地址：" + image_src)
        print(u"图片标题:" + image_text)
        images.append(image_text)
        images.append(image_src)
        images.append(image_url)
        # writer.writerow((i, images[0], images[1], images[2]))
        imagelist.append(images)
    return imagelist

def getTopImages():#只得到无图片型资讯
    reload(sys)
    list=[]
    sys.setdefaultencoding("gbk")
    url="http://www.umei.cc/bizhitupian/fengjingbizhi/"
    images=[]
    i=1
    # csvfile=open("D:csv_top_images.csv","wb")
    # writer=csv.writer(csvfile)
    # writer.writerow(('ID',u'图片标题',u'图片链接地址',u'图片网址'))
    getImage(url, i)
    for page in range(2,4):
        i+=1
        url = "http://www.umei.cc/bizhitupian/fengjingbizhi/"
        print("正在解析第"+str(page)+"页新闻数据")
        url=url+str(page)+".htm"
        print(url)
        images=getImage(url,i)
        list.append(images)
        insertImagedb(images)
        send_email.send(str(list).replace('u\'','\'').decode("unicode-escape"))
def insertImagedb(images):
    mysql_s = database.Mysql()
    for image in images:
        print(image)
        mydict = {}
        mydict['title'] = image[0]
        mydict['image_url'] = image[1]
        mydict['url'] = image[2]
        print(mydict)
        mysql_s.insertData("tb_images", mydict)


getTopImages()