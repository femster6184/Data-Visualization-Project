import sqlite3
import csv

conn = sqlite3.connect("weather.db")
cursor = conn.cursor()

#check if table exists, drop if yes
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='weather_data'")
table_exists = cursor.fetchone()

if table_exists:
    cursor.execute("DROP TABLE weather_data")

#make table to import weatherdata csv into
cursor.execute('''
    CREATE TABLE weather_data (
        country TEXT,
        location_name TEXT,
        latitude REAL,
        longitude REAL,
        temperature_fahrenheit REAL,
        condition_text TEXT,
        wind_mph REAL,
        precip_in REAL,
        humidity INTEGER,
        cloud INTEGER,
        visibility_miles REAL,
        uv_index INTEGER,
        air_quality_PM2_5 INTEGER,
        air_quality_PM10 INTEGER,
        air_quality_us_epa_index INTEGER,
        moon_phase TEXT,
        moon_illumination INTEGER
    )
''')

#read csv and import weatherdata into table
with open('CSVs/GlobalWeatherRepository_full_data.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file)
    next(csv_reader)
    for row in csv_reader:
        cursor.execute("INSERT INTO weather_data VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                       (row[0], row[1], row[2], row[3], row[8], row[9], row[10], row[16], row[17], row[23], row[24], row[27], row[28], row[29], row[30], row[36]))

conn.commit()