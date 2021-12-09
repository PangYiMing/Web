filename='/root/Changelog'
# testPath='/root/aaa.txt'
curlRes=` curl --location --request POST 'https://qyapi.weixin.qq.com/cgi-bin/webhook/upload_media?key=b70126af-b24a-4a3e-957c-e3c03363a963&type=file' --header 'Content-Type: multipart/form-data' --form 'filename="aaa"' --form 'filelength="1"' --form 'content-type="ts"' --form '=@'${filename} `
#  curl --location --request POST 'https://qyapi.weixin.qq.com/cgi-bin/webhook/upload_media?key=b70126af-b24a-4a3e-957c-e3c03363a963&type=file' --header 'Content-Type: multipart/form-data' --form 'filename="aaa"' --form 'filelength="1"' --form 'content-type="ts"' --form '=@'${filename} > $testPath

# curlRes=$(cat $testPath)
echo 111${curlRes}

curlRes=${curlRes:53:65}
echo 222${curlRes}

curl --location --request POST 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=b70126af-b24a-4a3e-957c-e3c03363a963' --header 'Content-Type: application/json' --data-raw '{ "msgtype": "file","file": {"media_id": "'${curlRes}'"}}'