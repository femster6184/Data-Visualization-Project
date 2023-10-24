let selCountry = document.querySelector('#countryList');
let selCity = document.querySelector('#selCity');	
	let ids, countries, cities, latitude, longitude, temp, cloud, precip, air, moon, visKM, visM;
	async function getWeatherData() {
	  //const response = await fetch("./js/Weather_Repository.json");
	  //data = await response.json();

	  ids = Object.keys(data.country)
	  countries = Object.values(data.country)
	  countries.forEach(function(country, index){
		let optionNames = [...selCountry.options].map(o => o.text)
		if(!optionNames.includes(country)){
			let opt = document.createElement('option');
			//opt.value = index;
			opt.text = country;
			selCountry.appendChild(opt);
		}
		let cityNames = [...selCity.options].map(o => o.text)
		if(!cityNames.includes(Object.values(data.location_name)[index])){
			let opt = document.createElement('option');
			opt.value = index;
			opt.text = Object.values(data.location_name)[index];
			opt.dataset.country = country;
			opt.hidden = true;
			selCity.add(opt, null);
		}
	  });
	  latitude = Object.values(data.latitude);
	  longitude = Object.values(data.longitude);
	  temp = Object.values(data.temperature_fahrenheit);
	  cloud = Object.values(data.cloud);
	  precip = Object.values(data.precip_mm);
	  air = Object.values(data.air_quality);
	  moon = Object.values(data.moon_illumination);
	  visKM = Object.values(data.visibility_km);
	  visM = Object.values(data.visibility_miles);
	}
	getWeatherData();
	function optionChanged(v){
		console.log(v)
		if(event.target.id == 'selCountry'){
			let citySelect = document.querySelector('#selCity');
			citySelect.disabled = false;
			Array.from(citySelect.options).forEach(x => {
				console.log(x.dataset.country, v)
				if(x.dataset.country == v){
					x.hidden = false;
				}
				else{x.hidden = true
				citySelect.options.selectedIndex=0}
			})
		}
		else if(event.target.id == 'selCity'){
			console.log(event.target)
			let summary = document.querySelector('#summary')
			summary.innerHTML = '';
			document.querySelector('#gauge1').innerHTML = '';
			if(event.target.options.selectedIndex !== 0){
				summary.insertAdjacentHTML('beforeend',`<p>Latitude: ${latitude[v]}</p>
				<p>Longitude: ${longitude[v]}</p>
				<p>Temperature: ${temp[v]}</p>
				<p>Cloud Coverage: ${cloud[v]}</p>
				<p>Precipitation: ${precip[v]}mm</p>
				<p>Moon Illumination: ${moon[v]}</p>
				<p>Visibility (KM): ${visKM[v]}</p>
				<p>Visibility (Miles): ${visM[v]}</p>`);
				buildGaugeChart(air[v]);
				buildGaugeChart2(moon[v]);
			}
			
		}
	}
	
