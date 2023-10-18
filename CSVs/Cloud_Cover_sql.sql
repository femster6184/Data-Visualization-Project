DROP TABLE cloud_cover;

CREATE TABLE cloud_cover (
        country VARCHAR(255),
        location_name VARCHAR(255),
        cloud INT,
        visibility_km DECIMAL,
        visibility_miles DECIMAL,
        air_quality_PM2 DECIMAL,
        air_quality_PM10 DECIMAL,	
        moon_phase VARCHAR(255),
		moon_illumination VARCHAR(255)
     );

SELECT *
FROM cloud_cover
