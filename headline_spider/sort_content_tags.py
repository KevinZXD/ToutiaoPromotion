# encoding:utf-8
#python2.7
import sys
import  database
reload(sys)
sys.setdefaultencoding('utf8')
class SortContentByTags:
    mysql_s=database.Mysql()
    tag_videos = [u"电影", u'视频', u'片', u'电视']  # 1002
    tag_society = [u'社会', u'交通', u'国家', u'人']  # 1003
    tag_entertain = [u'娱乐', u'休闲', u'乐']  # 1004
    tag_technology = [u'科技', u'数据', u'智能', u'科']  # 1005
    tag_car = [u'车', u'摩托', u'高铁']  # 1006
    tag_sports = [u'运动', u'体育', u'跑', u'跳', u'走']  # 1007
    tag_finance = [u'金融', u'钱', u'经济']  # 1008
    tag_military = [u'军', u'装备', u'机']  # 1009
    tag_global = [u'全球', u'世界', u'组织']  # 1010
    tag_episode = [u'片段', u'短片', u'集']  # 1011
    tag_funny_news = [u'笑', u'逗', u'哈']  # 1012
    tag_health = [u'健康', u'养生', u'保健', u'食物', u'医', u'药', u'病']  # 1013
    tag_shortvideo = [u'短视频', u'抖音', u'片段']  # 1014
    tag_animal = [ u'动物',u'狗', u'猫', u'宠物']  # 1015
    tag_education = [u'教育', u'学', u'生']  # 1016
    tag_shopping = [u'购物', u'天猫', u'京东', u'网购', u'淘宝', u'支付宝']  # 1017
    tag_music = [u'音', u'唱片', u'歌', u'声']  # 1018
    tags_mapping = {'1002': tag_videos, '1003': tag_society, '1004': tag_entertain, '1005': tag_technology
        , '1006': tag_car, '1007': tag_sports, '1008': tag_finance, '1009': tag_military, '1010': tag_global
        , '1011': tag_episode, '1012': tag_funny_news, '1013': tag_health, '1014': tag_shortvideo,
                    '1015': tag_animal, '1016': tag_education, '1017': tag_shopping, '1018':tag_music}
    def __init__(self):

        print("初始化......")
    def gettagbytitle(self,title):
        for key in self.tags_mapping:
            for tag in self.tags_mapping[key]:
            #print(title+" 正在和标签库匹配"+self.tags_mapping[key].__str__())
                if title.__contains__(tag):
                    print(title+"匹配成功"+self.tags_mapping[key].__str__()+"tagid: "+key )
                    return key
        print(title + "匹配默认" +"tagid: 1001" )
        return '1001'
    def printf(self,title_map_list):
        for key in title_map_list:
            print("标题为"+key)
            print ("该标题所匹配的标签为"+set(title_map_list[key]).__str__())
    def querybycontent_tagset(self,content):
        tag_set=set()
        for key in self.tags_mapping:
            for tag in self.tags_mapping[key]:
                if content.__contains__(tag):
                    print(content + "匹配成功" + self.tags_mapping[key].__str__() + "tagid: " + key)
                    tag_set.add(key)
        tag_set.add('1001')
        return tag_set
    def addtags_2users_by_analyse_comment(self):
        sql="select user_id,content from tb_review_content"
        db_list=self.mysql_s.getData(sql)
        table="tb_matching"
        for i in db_list:
            print(i[1])
            print(self.querybycontent_tagset(i[1]))

            my_dict=list(self.querybycontent_tagset(i[1]))
            if len(my_dict)<6:
                for l in range(0,6):
                    my_dict.append('')
            sql = "update %s set tag_id1 = %s ,tag_id2=%s,tag_id3=%s ,tag_id4=%s,tag_id5=%s,tag_id6=%s where user_id=%s" % (
            table, '"' + my_dict[0] + '"', '"' + my_dict[1] + '"', '"' + my_dict[2] + '"',
            '"'+ my_dict[3] + '"', '"' + my_dict[4] + '"', '"' + my_dict[5] + '"', '"'+i[0] + '"')
            self.mysql_s.upData(my_dict,sql)
if __name__ == '__main__':
    sortcontent = SortContentByTags()
    sortcontent.addtags_2users_by_analyse_comment()








