var bfd_kw_testData = {
          "code": 0,
          "msg": "成功",
          "data": []
        };
(function() {
  var labels = ['清新', '森系', '田园', '甜美', '通勤', '休闲']
  for (var x = 0; x < labels.length; x++) {
    var d = {
      "tabName": labels[x],
      "showList": []
    }
    for (var i = 1; i < 7; i++) {
      var d1 = {
        "pintuUrl": './photos/totals/' + i + '.png',
        "items": []
      }
      d.showList.push(d1)
      for (var j = 1; j < 6; j++) {
        d1["items"].push({
          'url': 'http://www.sina.com.cn',
          'localImageAddressList': ['./photos/' + i + '/' + j + '.png']
        })
      }
    }
    d['showList'].sort(function(a, b) {
      return Math.random() > .5 ? -1 : 1;
    })
    bfd_kw_testData['data'].push(d)
    bfd_kw_testData['data'][0]['showList']=[bfd_kw_testData['data'][0]['showList'][0]]
  }
})();

//console.log(bfd_kw_testData)