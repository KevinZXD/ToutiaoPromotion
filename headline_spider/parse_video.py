#!/usr/bin/python
# -*- encoding:utf-8  -*-
import requests
import urlparse
import random
import binascii
import re
import base64
import database
import send_email
import kevin
import sys
reload(sys)
sys.setdefaultencoding("utf-8")
log = {}
video = []


def right_shift(val, n):
    return val >> n if val >= 0 else (val + 0x100000000) >> n


def get_video_info(url):
    r = requests.get(url)
    r = r.json()
    display_info=r['data']
    display_url_list=[]
    for i in display_info:
        display_url_list.append(i)
    return display_url_list


def get_video_true_url(display_url):
    r = requests.get(display_url)
    vid=re.findall(r"videoid.+",r.content)
    print(vid)
    if len(vid) ==0:
        return None
    vid=vid[0][9:-2]
    r = str(random.random())[2:]
    url = 'http://i.snssdk.com/video/urls/v/1/toutiao/mp4/%s' % vid
    n = urlparse.urlparse(url).path + '?r=' + r
    c = binascii.crc32(n)
    s = right_shift(c, 0)
    r = requests.get(url + '?r=%s&s=%s' % (r, s))
    r = r.json()
    main_url=kevin.get_high_video_url(r)
    #video_1 2 3 清晰度逐渐上升
    real_url = base64.standard_b64decode( main_url)
    return real_url

def spider(url):
    info=[]
    dic={}
    dbinfo =[]
    mysql_s = database.Mysql()
    global video
    video_info=get_video_info(url)
    for i in video_info:
        real_url=get_video_true_url(i['display_url'])
        if real_url==None:
            break
        title=unicode(i['title'])
        dic['title']=title
        image_url=i['pc_image_url']
        dic['image_url']=image_url
        video_play_count=i['video_play_count']
        dic['play_count']=str(video_play_count)
        video_duration_format=i['video_duration_format']
        dic['ti']=video_duration_format
        dic['video_url']=real_url
        info.append(title)
        info.append(real_url)
        info.append(str(video_play_count))
        video.append(info)
        info=[]
        dbinfo.append(mysql_s.insertData("video", dic))
    log['video']=video
    log['dbinfo']=dbinfo
def makelog():
    text = ""
    if(len(log['video'])!=0):
        for vi in log['video']:
            for i in vi:
                text = text + i + '\n';
    if (len(log['dbinfo']) != 0):
        for vi in log['dbinfo']:
            for i in vi:
                #print(i)
                text = text + i + '\n';
    return text

if __name__=="__main__":
    url="http://www.toutiao.com/api/article/pc_hot_video/?widen=1"
    url1="http://www.toutiao.com/api/pc/feed/?category=video&utm_source=toutiao&widen=1&max_behot_time=1491835807&max_behot_time_tmp=1491835807&tadrequire=true&as=A115A8CE8B09C51&cp=58EBC9ACB5A18E1"
    spider(url)
    text = makelog();
    if len(text)!=0:
        print(text)
        send_email.send(text)
