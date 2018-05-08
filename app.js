
'use strict';
import {styles} from './styleForMap.js';

function formatDate(date) {

  var dd = date.getUTCDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getUTCMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getUTCFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

function initMap() {
	let coord = async() => {
		const data = await fetch('http://api.open-notify.org/iss-now.json');
		let jsonData = await data.json();
			document.getElementById('lat').innerHTML = `Latitude is ${jsonData.iss_position.latitude}`;
			document.getElementById('long').innerHTML = `Longitude is ${jsonData.iss_position.longitude}`;


			let myLatLng = {lat: +(jsonData.iss_position.latitude), lng: +(jsonData.iss_position.longitude)};

			let map = new google.maps.Map(document.getElementById('map'), {
				zoom: 2,
				center: myLatLng,
				disableDefaultUI: true,
				scrollwheel: false
			});

		//setInterval(function() {
			let image = './images/space-shuttle.png';
			let marker = new google.maps.Marker({
				position: myLatLng,
				animation: google.maps.Animation.DROP,
				map: map,
				icon: image,
				title: 'We here!'
			});
		//},5000);

		map.setOptions({styles: styles.silver});

		document.getElementById('time').innerHTML = `<strong>Current UTC time: ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}</strong>
		<br/> <i>${formatDate(new Date())}</i>`;
		
	
	//(function whoInSpace() {
		//setTimeout(async function () {
			const data1 = await fetch('http://api.open-notify.org/astros.json');
			let jsonData1 = await data1.json();
			
				for (let i of jsonData1.people) {
					let personName = document.createElement('li');
						personName.innerHTML = i.name;
						document.getElementsByClassName('person')[0].appendChild(personName);
							setTimeout(function() {
								document.getElementsByClassName('person')[0].removeChild(personName);
								
 							}, 5000);	
				}
				document.getElementById('count').innerHTML = `Total amount: <strong>${jsonData1.people.length}</strong> people on ISS`;

				//whoInSpace();
		//}, 5000)
	//})();

}

setInterval(coord, 5000);

}

initMap();

