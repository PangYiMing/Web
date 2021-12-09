. /etc/profile
. setEnvHome.sh
set -e
dd=`date -d yesterday +%Y%m%d`
dt=`date -d yesterday +%Y-%m-%d`
dm=`date +%Y%m%d`
sign=`date +%s`

resfile1=/home/fx/fx_tmp_data/xy/wechatwholeqc_${dm}.txt
resfile2=/home/fx/fx_tmp_data/xy/存在空值指标明细_${dm}.csv

echo "小蜜蜂来报——">$resfile1
hive -e "select (case when counts = 0 then '今天没有任何异常，又是美美的一天呢~~' else concat('门店运营周报维表已更新，当前缺失 ',counts,' 个指标，具体如下：') end)
from (select count(1) counts
from fxetl.fxetl_shop_business_index_wholeqc where dt='${dt}'
and bool not regexp '原因退仓金额|收货sku|仓库面积' and missing_condition = '数据整体缺失') t1
" >> $resfile1

hive -e "select concat_ws(' 、',collect_set(bool))
from fxetl.fxetl_shop_business_index_wholeqc where dt='${dt}'
and bool not regexp '原因退仓金额|收货sku|仓库面积' and missing_condition = '数据整体缺失'
" >> $resfile1
echo "存在空值的指标明细详见附件！">>$resfile1

hive -e "set hive.cli.print.header=true;
select bool as \`指标名称\`
,front_1days as \`前6天空值行数\`
,front_2days as \`前5天空值行数\`
,front_3days as \`前4天空值行数\`
,front_4days as \`前3天空值行数\`
,front_5days as \`前2天空值行数\`
,front_6days as \`前1天空值行数\`
,front_7days as \`${dt}\`
,whole_data as \`今日应该有数据总行数\`
,missing_condition as \`异常分类\`
from fxetl.fxetl_shop_business_index_wholeqc where dt='${dt}' 
" > $resfile2


message=`cat $resfile1`

echo "$message"
echo "{\"msgtype\":\"text\",\"text\":{\"mentioned_mobile_list\":[\"@all\"],\"content\":\"$message\"}}"
curl "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=1686f8d2-55b5-4682-bf6e-462ba06ae092"  -H 'Content-Type: application/json' -d "{\"msgtype\":\"text\",\"text\":{\"mentioned_mobile_list\":[\"@all\"],\"content\":\"$message\"}}"

filename=$resfile2
test='/home/fx/fx_tmp_data/xy/wechatwholeqc1_cache'
curl -X POST 'https://qyapi.weixin.qq.com/cgi-bin/webhook/upload_media?key=1686f8d2-55b5-4682-bf6e-462ba06ae092&type=file' -H 'Content-Type: multipart/form-data' -F 'filename="aaa"' -F 'filelength="1"' -F 'content-type="ts"' -F 'file=@'$filename > $test

curlRes=$(cat $test)
echo 111${curlRes}

curlRes=${curlRes:53:65}
echo 222${curlRes}

curl -X POST 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=1686f8d2-55b5-4682-bf6e-462ba06ae092' -H 'Content-Type: application/json' -d '{"msgtype":"file","file":{"media_id":"'${curlRes}'"}}'



