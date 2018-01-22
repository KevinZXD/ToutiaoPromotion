# -*- coding:utf-8 -*-
from email.mime.text import MIMEText
import smtplib
from email.mime.multipart import MIMEMultipart


def send(data):
    # pip install pyemail
    msg = MIMEMultipart()
    text = MIMEText(data,'plain', 'utf-8')
    #可以发送中文
    msg.attach(text)
    try:
        msg["Subject"] = u"自动化管理爬虫信息"
        msg["from"] = u"我是你爸爸"

        msg["to"] = "13720373197@163.com"

        server = smtplib.SMTP_SSL("smtp.qq.com", 465)
        server.set_debuglevel(1)
        server.login("1067892503@qq.com", "hsssjpwqybwebeja")

        server.sendmail("1067892503@qq.com",["13720373197@163.com",], msg.as_string())
        server.quit()

    except smtplib.SMTPRecipientsRefused:
        print('Recipient refused')
    except smtplib.SMTPAuthenticationError:
        print('Auth error')
    except smtplib.SMTPSenderRefused:
        print('Sender refused')
    except smtplib.SMTPException as e:
        print(e.message)



