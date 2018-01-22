#-*- coding:utf-8 -*-
import urllib2
import re #正则
from bs4 import BeautifulSoup
import csv
import sys
import database
import send_email

def getTopNews():#只得到无图片型资讯
    reload(sys)
    sys.setdefaultencoding("gbk")
    url="http://www.mnw.cn/news/top/"
    urllist="http://www.mnw.cn/news/top/index-"
    i=1
    # csvfile=open("D:csv_top_news.csv","wb")
    # writer=csv.writer(csvfile)
    # writer.writerow(('ID',u'标题',u'链接地址',u'新闻简介'))
    for page in range(2,3):#根据规律分析有184页
        print("正在解析第"+str(page)+"页新闻数据")
        url=urllist+str(page)+".html"
        req = urllib2.Request(url)  # 请求页面 # 加一个键值对，针对服务器的反爬机制
        req.add_header("User-Agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36")
        html = urllib2.urlopen(req).read()
        soup = BeautifulSoup(html, 'lxml')
        news_content = soup.find_all('div', class_=re.compile('item noimg '))
        data=[]
        i=0
        for item in news_content:
            news = []
            i=i+1
            print("第"+str(i)+"条热门新闻数据......................................")
            news.append(str(i))
            print("新闻标题为：")
            print(item.a.get_text())
            news.append(item.a.get_text().replace(u'\xa0', u' '))
            print("新闻链接来源："+item.a['href'])
            news.append(item.a['href'].replace(u'\xa0', u' '))
            print("新闻内容为为：")
            print(item.p.get_text())
            news.append(item.p.get_text().replace(u'\xa0', u' '))
            data.append(news)
            # writer.writerow((i,news[1],news[2],news[3]))
    # csvfile.close()
def getTopNewsimg():#只得到无图片型资讯
    reload(sys)
    sys.setdefaultencoding("gbk")
    url="http://www.mnw.cn/news/top/"
    urllist="http://www.mnw.cn/news/top/index-"
    i=1
    #csvfile=open("D:csv_top_newsimg.csv","wb")
    #writer=csv.writer(csvfile)
    #writer.writerow(('ID',u'标题',u'链接地址',u'图片链接来源',u'新闻简介'))
    for page in range(2,184):#根据规律分析有184页
        print("正在解析第"+str(page)+"页新闻数据")
        url=urllist+str(page)+".html"
        if page==2:
            url = "http://www.mnw.cn/news/top/"
        req = urllib2.Request(url)  # 请求页面 # 加一个键值对，针对服务器的反爬机制
        req.add_header("User-Agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36")
        html = urllib2.urlopen(req).read()
        soup = BeautifulSoup(html, 'lxml')
        news_content = soup.find_all('div', class_=re.compile('^item$'))
        data=[]
        i=0
        for item in news_content:
            if item.a.img is None:
                continue
            news = []
            i=i+1
            print("第"+str(i)+"条热门新闻数据......................................")
            news.append(str(i))
            print("新闻标题为：")
            print(item.div.a.get_text())
            news.append(item.div.a.get_text().replace(u'\xa0', u' '))
            print("新闻链接来源："+item.div.a['href'])
            news.append(item.div.a['href'].replace(u'\xa0', u' '))
            src=item.a.img
            news.append(src['src'])
            print("图片链接：")
            print(src['src'])
            print("新闻内容为为：")
            print(item.div.p.get_text())
            news.append(item.p.get_text().replace(u'\xa0', u' '))
            data.append(news)
            #writer.writerow((i,news[1],news[2],news[3],news[4]))
        return data
    #csvfile.close()
def insertNewstoDB():
    mysql_s = database.Mysql()
    data=getTopNewsimg()
    send_email.send(str(data).replace('u\'', '\'').decode("unicode-escape"))
    for news in data:
        print(news)
        mydict={}
        mydict['title']=news[1]
        mydict['content'] = news[4]
        mydict['url'] = news[2]
        mydict['image_url'] = news[3]
        print(mydict)
        mysql_s.insertData("tb_news",mydict)

insertNewstoDB()