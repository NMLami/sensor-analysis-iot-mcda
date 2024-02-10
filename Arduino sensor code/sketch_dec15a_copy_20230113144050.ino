//#include <dht.h> //header file containing
//dht DHT;  //dht = className; DHT = Object
//#define DHT11_PIN 2
	
#include "Arduino_SensorKit.h"
int sound_sensor = A2; //assign to pin A2
int light_sensor = A3;
int val= 0;
int analogPin = A3; 
//loat pressure;




//#define DHTPIN 3


 
	
void setup() 
	
{
	
  Serial.begin(9600);
  
  //Pressure.begin(); //begin Serial Communication
	Environment.begin();
}
	
 
	
void loop()
	
{
	
  int soundValue = 0; //create variable to store many different readings
	//int chk = DHT.read11(DHT11_PIN);
  for (int i = 0; i < 32; i++) //create a for loop to read 
	
  { soundValue += analogRead(sound_sensor);
    int raw_light = analogRead(light_sensor); // read the raw value from light_sensor pin (A3)
	  int light = map(raw_light, 0, 1023, 0, 100); // map the value from 0, 1023 to 0, 100
	  
    val = analogRead(analogPin); //light sensor
    //float press = Pressure.readPressure();
    
     
  } //read the sound sensor
  float temp =Environment.readTemperature();
  float hum = Environment.readHumidity();
  //float air = Pressure.readPressure();
	Serial.print("Light:");
  Serial.println(val);  
	Serial.print("Humidity = ");
  Serial.println(hum);
  Serial.print("Temperature = ");
  Serial.println(temp);
    // Get and print atmospheric pressure data
	
  //Serial.print("Pressure: ");	
  //Serial.println(air);
  //Serial.print("Altitude: ");
	//Serial.println(Pressure.readAltitude());
  soundValue >>= 5; //bitshift operation 
	Serial.print("Sound:");
  Serial.println(soundValue); //print the value of sound sensor
	
  
  
	
 
	
//if a value higher than 500 is registered, we will print the following
	
//this is done so that we can clearly see if the threshold is met
	
  // if (soundValue > 500) { 
	
  //   Serial.println("         ||        ");
	
  //   Serial.println("       ||||||      ");
	
  //   Serial.println("     |||||||||     ");
	
  //   Serial.println("   |||||||||||||   ");
	
  //   Serial.println(" ||||||||||||||||| ");
	
  //   Serial.println("   |||||||||||||   ");
	
  //   Serial.println("     |||||||||     ");
	
  //   Serial.println("       ||||||      ");
	
  //   Serial.println("         ||        ");
	
  // }
	
  delay(1000); //a shorter delay between readings
	
}