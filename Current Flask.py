import datetime as dt
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from flask import Flask, render_template
from types import prepare_class




#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)
Base.classes.keys()

# Save references to each table
Weather = Base.classes.weather


# Create our session (link) from Python to the DB

session = Session(engine)

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return(
    '''
    Welcome to our Weather Map Analysis!
    Available Routes:
    /api/v1.0/air_quality
    /api/v1.0/temperature
    /api/v1.0/precipitation
    /api/v1.0/moon_illumination
    ''') 

@app.route("/api/v1.0/air_quality")

def air_quality():
    

    return render_template("air_quality.html",)

@app.route("/api/v1.0/temperature")

def temperature():
    results = session.query(Station.station).all()
    stations = list(np.ravel(results))
    return render_template("temperature.html",)

@app.route("/api/v1.0/precipitation")

def precipitation():
    prev_year = dt.date(2017, 8, 23) - dt.timedelta(days=365)
    results = session.query(Measurement.tobs).\
    filter(Measurement.station == 'USC00519281').\
    filter(Measurement.date >= prev_year).all()
    temps = list(np.ravel(results))
    return render_template("precipitation.html",)


@app.route("/api/v1.0/moon_illumination")

def moon_illumination():
    sel = [func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)]

    if not end:
        results = session.query(*sel).\
        filter(Measurement.date >= start).\
        filter(Measurement.date <= end).all()
        temps = list(np.ravel(results))
        return jsonify(temps)

    results = session.query(*sel).\
        filter(Measurement.date >= start).\
        filter(Measurement.date <= end).all()
    temps = list(np.ravel(results))
    return render_template("moon_illumination",)

if __name__ == '__main__':
    app.run(debug=True)