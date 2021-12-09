. /etc/profile
. setEnvHome.sh
set -e 
dt=`date -d @$1 +%Y-%m-%d`
dd=`date -d @$1 +%Y%m%d`
sign=`date +%s`
resfile=/root/program/workspace/download/dim_${dd}_${sign}_org_on_duty_name_info.txt
echo "小旋风来报:"> $resfile
hive -e "select concat('今天日期：',on_duty_date,'\,',week_no,'\n','今晚值班人：',on_duty_name,'\n','望','<<',on_duty_name,'>>','做好值班准备')
from(
  select on_duty_date,
  case when  week_no=1 then '星期一' 
  when week_no=2 then '星期二'  
  when week_no=3 then '星期三'  
  when week_no=4 then '星期四'   
  when week_no=5 then '星期五'
  when week_no=6 then '星期六'  
  when week_no=0 then '星期日' else '其他' end week_no,  on_duty_name
  FROM(
    select on_duty_name
          ,on_duty_date
          ,ceil(datediff(on_duty_date,'2021-03-21')%7) week_no
    from dim.dim_org_on_duty_name_info 
    where on_duty_date=date_add('${dt}',1)
  )t1
)t2">>$resfile 

echo "报告完毕！值班人员辛苦了！">> $resfile

message=`cat $resfile`
echo "$message"
curl "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9a51e25a-6108-4d40-8de0-4f0569552b75"  -H 'Content-Type: application/json' -d "{\"msgtype\": \"text\", \"text\": {\"content\": \"$message\"}}"