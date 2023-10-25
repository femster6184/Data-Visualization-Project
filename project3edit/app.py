from types import prepare_class
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, MetaData, Table, func
from flask import Flask, render_template
import json
from flask import Flask, jsonify
#################################################
# import csv #Note: if csv is not found, set 'project3edit/GlobalWeatherRepository_full_data.csv' as path
df = pd.read_csv('GlobalWeatherRepository_full_data.csv')

#################################################
# Database Setup
#################################################
#make sqlite db + write csv to it
db_connection = "sqlite:///weather.sqlite"

#create engine
engine = create_engine(db_connection)

#write df to weather table in db
df.to_sql(name='weather_data', con=engine, if_exists='replace', index=False)

#reflect the db and access weather_data table
metadata = MetaData()
metadata.reflect(engine)
table = metadata.tables['weather_data']

session = Session(engine)

#get all weather 
all_weather = session.query(table).all()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
#################################################
# Flask Routes
#################################################
@app.route('/')
def index():
    template_file = 'index.html'
    return render_template(template_file)

@app.route('/map')
def index2():
    template_file = 'map.html'
    return render_template(template_file)

@app.route("/?")
def welcome():
    """List all available API routes."""
    return (
        "Available Routes:<br/>"
        "/extract<br/>"
        "/extract/subset"
    )

@app.route("/extract")
def extract():

#make response list of dicts
    result = []
    for weather in all_weather:
        result.append({
            "Country": weather.country,
            "Location Name": weather.location_name,
            "Latitude": weather.latitude,
            "Longitude": weather.longitude,
            "Timezone": weather.timezone,
            "Last Updated Epoch": weather.last_updated_epoch,
            "Last Updated": weather.last_updated,
            "Temperature Celsius": weather.temperature_celsius,
            "Temperature Fahrenheit": weather.temperature_fahrenheit,
            "Condition Text": weather.condition_text,
            "Wind MPH": weather.wind_mph,
            "Wind KPH": weather.wind_kph,
            "Wind Degree": weather.wind_degree,
            "Wind Direction": weather.wind_direction,
            "Pressure MB": weather.pressure_mb,
            "Pressure IN": weather.pressure_in,
            "Precipitation MM": weather.precip_mm,
            "Precipitation IN": weather.precip_in,
            "Humidity": weather.humidity,
            "Cloud": weather.cloud,
            "Feels Like Celsius": weather.feels_like_celsius,
            "Feels Like Fahrenheit": weather.feels_like_fahrenheit,
            "Visibility KM": weather.visibility_km,
            "Visibility Miles": weather.visibility_miles,
            "UV Index": weather.uv_index,
            "Gust MPH": weather.gust_mph,
            "Gust KPH": weather.gust_kph,
            "Air Quality Carbon Monoxide": weather.air_quality_Carbon_Monoxide,
            "Air Quality Ozone": weather.air_quality_Ozone,
            "Air Quality Nitrogen Dioxide": weather.air_quality_Nitrogen_dioxide,
            "Air Quality Sulphur Dioxide": weather.air_quality_Sulphur_dioxide,
            "Air Quality PM10": weather.air_quality_PM10,
            "Sunrise": weather.sunrise,
            "Sunset": weather.sunset,
            "Moonrise": weather.moonrise,
            "Moonset": weather.moonset,
            "Moon Phase": weather.moon_phase,
            "Moon Illumination": weather.moon_illumination
        })

        #save JSON data to file
    with open('weather_data.json', 'w') as json_file:
        json.dump(result, json_file)

    return jsonify(result)

@app.route("/extract/subset")
def extract_subset():
    #get subset of weather data
    subset_data = session.query(
        table.c.country,
        table.c.location_name,
        table.c.longitude,
        table.c.latitude,
        table.c.air_quality_Carbon_Monoxide,
        table.c.precip_in,
        table.c.moon_illumination,
        table.c.visibility_km,
        table.c.visibility_miles,
        table.c.precip_mm
    ).all()

    #make response a list of dictionaries
    result = []
    for weather_subset in subset_data:
        result.append({
            "Country": weather_subset[0],
            "Location Name": weather_subset[1],
            "Longitude": weather_subset[2],
            "Latitude": weather_subset[3],
            "Air Quality Carbon Monoxide": weather_subset[4],
            "Precipitation IN": weather_subset[5],
            "Moon Illumination": weather_subset[6],
            "Visibility KM": weather_subset[7],
            "Visibility Miles": weather_subset[8],
            "Precipitation MM": weather_subset[9]
        })

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
