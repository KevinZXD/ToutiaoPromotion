# -*-coding:utf-8 -*-
#python2.7
import sys
reload(sys)
sys.setdefaultencoding('utf8')
import pymysql
import time
'''
db=pymysql.connect(host="localhost",user="root",password="root",database="school_schema",charset="GBK")
cursor=db.cursor()
sqlstr="SELECT * FROM school_schema.course;"
try:
    cursor.execute(sqlstr)
    courses=cursor.fetchall()
except:
    print("数据读取错误")
else:
    print(courses)

db.close()
'''
class Mysql:

    def getCurrentTime(self):
        return time.strftime('[%Y-%m-%d %H:%M:%S]',time.localtime(time.time()))

    def __init__(self):
        try:
            self.db = pymysql.connect(host='localhost',user='root',password='kevin_zxd',database='headline',charset="utf8")
            self.cur = self.db.cursor()
            print(u"数据库连接成功！")
        except pymysql.Error,e:
            print (self.getCurrentTime(),"连接数据库错误，原因%d: %s" % (e.args[0], e.args[1]))

    def getData(self,sql):
        result = self.cur.execute(sql)
        return self.cur.fetchall()#以列表的形式返回

    def insertData(self, table, my_dict):#一条一条插入
        dbinfo=[]
        try:
            print(my_dict)
            self.db.set_charset('utf8')
            cols = ', '.join(my_dict.keys())
            values = '"," '.join(my_dict.values())
            sql = "INSERT INTO %s (%s) VALUES (%s)" % (table, cols, '"'+values+'"')

            try:
                result = self.cur.execute(sql)

                insert_id = self.db.insert_id()
                self.db.commit()
         #判断是否执行成功
                if result:
                    print("数据插入成功"+str(insert_id))
                    #return insert_id
                else:
                    print("数据插入失败" + str(insert_id))
                   # return 0
            except pymysql.Error,e:
                self.db.rollback()
        #主键唯一，无法插入
                if "key 'PRIMARY'" in e.args[1]:
                    print (self.getCurrentTime(),u"数据已存在，未插入数据")
                    dbinfo.append(self.getCurrentTime()+u"数据已存在，未插入数据")
                else:
                    print (self.getCurrentTime(),u"插入数据失败，原因 %s: %s" %(str(e.args[0]),str(e.args[1])))
                    dbinfo.append(self.getCurrentTime()+u"插入数据失败，原因 " +str(e.args[0])+":"+str(e.args[1]))
        except pymysql.Error,e:
             print (self.getCurrentTime(),u"数据库错误，原因%d: %s" % (str(e.args[0]), str(e.args[1])))
             dbinfo.append(self.getCurrentTime()+u"数据库错误，原因"+ str(e.args[0]),+":"+str(e.args[1]))
        return dbinfo
    def upData(self, my_dict,sql):
        dbinfo=[]
        try:
            print(my_dict)
            print(sql)
            self.db.set_charset('utf8')
            #sql = "update %s set public_date = %s ,ti=%s,title=%s ,tag_id=%s where video_id=%s" % (table,'"'+my_dict['public_date']+'"','"'+ my_dict['ti']+'"','"'+my_dict['title']+'"','"'+" "+my_dict['tag_id']+'"','"'+" "+my_dict['video_id']+'"')
            print(sql)
            try:
                result = self.cur.execute(sql)
                insert_id = self.db.insert_id()
                self.db.commit()
         #判断是否执行成功
                if result:
                    print("数据插入成功"+str(insert_id))
                    #return insert_id
                else:
                    print("数据插入失败" + str(insert_id))
                   # return 0
            except pymysql.Error,e:
                self.db.rollback()
        #主键唯一，无法插入
                if "key 'PRIMARY'" in e.args[1]:
                    print (self.getCurrentTime(),u"数据已存在，未插入数据")
                    dbinfo.append(self.getCurrentTime()+u"数据已存在，未插入数据")
                else:
                    print (self.getCurrentTime(),u"插入数据失败，原因 %s: %s" %(str(e.args[0]),str(e.args[1])))
                    dbinfo.append(self.getCurrentTime()+u"插入数据失败，原因 " +str(e.args[0])+":"+str(e.args[1]))
        except pymysql.Error,e:
             print (self.getCurrentTime(),u"数据库错误，原因%d: %s" % (str(e.args[0]), str(e.args[1])))
             dbinfo.append(self.getCurrentTime()+u"数据库错误，原因"+ str(e.args[0]),+":"+str(e.args[1]))
        return dbinfo

    def upData1(self, table, my_dict):
        dbinfo = []
        try:
            print(my_dict)
            self.db.set_charset('utf8')
            sql = "update %s set public_date = %s ,ti=%s,title=%s,tag_id=%s where video_id= %s" % (
            table, '"' + my_dict['public_date'] + '"', '"' + my_dict['ti'] + '"', '"' + my_dict['title'] + '"','"' + my_dict['tag_id'] + '"',
            '"' + " " + my_dict['video_id'] + '"')
            print(sql)
            try:
                result = self.cur.execute(sql)

                insert_id = self.db.insert_id()
                self.db.commit()
                # 判断是否执行成功
                if result:
                    print("数据插入成功" + str(insert_id))
                    # return insert_id
                else:
                    print("数据插入失败" + str(insert_id))
                # return 0
            except pymysql.Error, e:
                self.db.rollback()
                # 主键唯一，无法插入
                if "key 'PRIMARY'" in e.args[1]:
                    print (self.getCurrentTime(), u"数据已存在，未插入数据")
                    dbinfo.append(self.getCurrentTime() + u"数据已存在，未插入数据")
                else:
                    print (self.getCurrentTime(), u"插入数据失败，原因 %s: %s" % (str(e.args[0]), str(e.args[1])))
                    dbinfo.append(self.getCurrentTime() + u"插入数据失败，原因 " + str(e.args[0]) + ":" + str(e.args[1]))
        except pymysql.Error, e:
            print (self.getCurrentTime(), u"数据库错误，原因%d: %s" % (str(e.args[0]), str(e.args[1])))
            dbinfo.append(self.getCurrentTime() + u"数据库错误，原因" + str(e.args[0]), +":" + str(e.args[1]))
        return dbinfo


