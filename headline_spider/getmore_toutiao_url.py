# -*- coding:utf-8 -*-

import requests
from bs4 import BeautifulSoup
import re
def get_toutiao_videoid(url):
    url3="http://www.toutiao.com/api/pc/feed/?category=video&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A1B5688E9B2A206&cp=58EB7A62D0766E1"
    url1="http://www.toutiao.com/api/pc/feed/?category=video&utm_source=toutiao&widen=1&max_behot_time=1491837096&max_behot_time_tmp=1491837096&tadrequire=true&as=A185B83E3B4A120&cp=58EBFA6142401E1"
    url="http://www.toutiao.com/api/pc/feed/?category=video&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A13588EEAB09C2E&cp=58EBB96C62FEFE1"
    r = requests.get(url3)
    r = r.json()
    for i in r['data']:
        print(i['title'])
        print(i['video_id'])
def get_weibo_url(url):

    content=requests.get(url)
    content=content.text
    print(content)
    soup = BeautifulSoup(content, 'html.parser')
    url_list=soup.find_all('a',href_=re.compile("from=vhot$"))
    print(url_list)


def get_high_video_url(r):
    try:
        main_url=r['data']['video_list']['video_3']['main_url']
    except KeyError ,e:

        try:
            main_url = r['data']['video_list']['video_2']['main_url']
            print(e.args[0])
        except KeyError ,e:
            try:
                main_url = r['data']['video_list']['video_1']['main_url']
            except KeyError,e:
                print(e.args[0])

    return main_url
