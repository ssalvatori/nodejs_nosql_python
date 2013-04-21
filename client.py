import httplib, urllib
import json

connection = httplib.HTTPConnection('localhost',1234)

#1) id_device (fila, mini-fila, portal o lo que sea) (BIG INT)
#1) datetime (DATETIME)
#2) cantidad de personas (TINYINT)
#3) nivel de fila (TINYINT)
#4) enlace a foto (CHAR(15))

data = {'id_device' : '1',
        'datetime' : '2013-04-21',
        'peopleCount' :  100,
        'rowLevel' : 2,
        'imagePath': '/sdfasd/dsfa/32423.gif'}
  
headers = {'Content-type': 'application/json'}
dataJSON = json.dumps(data)

connection.request('GET', '/version', '{}', headers)
response = connection.getresponse()
print(response.read().decode())

connection.request('POST', '/add', dataJSON, headers)
response = connection.getresponse()
print(response.read().decode())

