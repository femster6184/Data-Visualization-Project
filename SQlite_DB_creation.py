import sqlite3
import csv

#make sqlite db + establish connection
conn = sqlite3.connect('proj03_database.db')
cursor = conn.cursor()

#make question_3 table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS question_3 (
        country TEXT,
        location_name TEXT,
        latitude REAL,
        longitude REAL,
        condition_text TEXT,
        precip_mm REAL
)
''')




#read data from csv and import into question_3 table
with open('GlobalWeatherRepository-Oliver.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file)
    next(csv_reader)

    for row in csv_reader:
        cursor.execute('''
            INSERT INTO question_3 (country, location_name, latitude, longitude, condition_text, precip_mm)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (row[0], row[1], float(row[2]), float(row[3]), row[4], float(row[5])))

#commit changes and close db connection
conn.commit()
conn.close()