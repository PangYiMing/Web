. /etc/profile
. setEnvHome.sh
set -e
dd=`date -d yesterday +%Y%m%d`
dt=`date -d yesterday +%Y-%m-%d`
dm=`date +%Y%m%d`
sign=`date +%s`
resfile1=/home/fx/fx_tmp_data/xy/wechatxiaoshouqc_${dm}.txt

echo "小蜜蜂来报——">$resfile1
hive -e "select concat('${dt}','运营周报维表更新',whole_data,'行数据，当前',qingkuang)
from fxetl.fxetl_shop_business_index_wholeqc1 where dt='${dt}'
" >> $resfile1

hive -e "select concat('本次更新共涉及',shops,'家门店，环比',ringshop,'家门店')
from fxetl.fxetl_shop_business_index_wholeqc1 where dt='${dt}'
" >> $resfile1

hive -e "select concat('今日总销售金额环比',ringrealamt,'，其中门店销售金额最大值为',max_realamt,'元')
from fxetl.fxetl_shop_business_index_wholeqc1 where dt='${dt}'
" >> $resfile1
echo "报告完毕！">>$resfile1

message=`cat $resfile1`
echo "$message"
echo "{\"msgtype\":\"text\",\"text\":{\"mentioned_mobile_list\":[\"@all\"],\"content\":\"$message\"}}"
curl "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=1686f8d2-55b5-4682-bf6e-462ba06ae092"  -H 'Content-Type: application/json' -d "{\"msgtype\":\"text\",\"text\":{\"mentioned_mobile_list\":[\"@all\"],\"content\":\"$message\"}}"