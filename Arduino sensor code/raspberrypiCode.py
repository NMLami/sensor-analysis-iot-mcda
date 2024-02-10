import paho.mqtt.client as mqtt_client        
import datetime
import json
import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://iotlab:fnMmt4WBFOCtn0Dy@cluster0.vgtdfmd.mongodb.net/?retryWrites=true&w=majority")

db = cluster["test"]
collection = db["sensors"]

print("Mongo database connected")

client = mqtt_client.Client()
client.connect("localhost",1883,60)
client.subscribe("topic")

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected success")
    else:
        print(f"Connected fail with code {rc}")
        
client.on_connect = on_connect 

def on_message(client, userdata, message):
    # Print the message payload
    print(message.payload.decode("utf-8"))
    #str = "b'{"sound":145,"temperature":23.3,"humidity":55,"light":743}'"
    #str = str[1:]
    payload = json.loads(message.payload.decode("utf-8"))
    print(type(payload))
    
    room108 = {
                "roomId" : 108,
                "temp" : payload["temperature"],
                "humidity" : payload["humidity"],
                "pressure" : 1,
                "smoke" : False,
                "sound" : payload["sound"],
                "light" : payload["light"]
               }
    room109 = {
                "roomId" : 109,
                "temp" : payload["temperature"]+5,
                "humidity" : payload["humidity"]+5,
                "pressure" : 1,
                "smoke" : False,
                "sound" : payload["sound"]+5,
                "light" : payload["light"]+5
               }
    room110 = {
                "roomId" : 110,
                "temp" : payload["temperature"]+10,
                "humidity" : payload["humidity"]+10,
                "pressure" : 1,
                "smoke" : False,
                "sound" : payload["sound"]+10,
                "light" : payload["light"]+10
               }
    room210 = {
                "roomId" : 210,
                "temp" : payload["temperature"]-5,
                "humidity" : payload["humidity"]-5,
                "pressure" : 1,
                "smoke" : False,
                "sound" : payload["sound"]-5,
                "light" : payload["light"]-5
               }
    room211 = {
                "roomId" : 211,
               "temp" : payload["temperature"]-10,
                "humidity" : payload["humidity"]-10,
                "pressure" : 1,
                "smoke" : False,
                "sound" : payload["sound"]-10,
                "light" : payload["light"]-10
               }
    mongoData = {
                "rooms" : [room108, room109, room110, room210, room211],
                "sensors" : 6,
                "createdAt":  datetime.datetime.now()
                
                }
    print(mongoData)
    collection.insert_one(mongoData) 
client.on_message = on_message
client.loop_forever()

    
    
