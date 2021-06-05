const secret_api ='at_7iZa4RIKA4zhd7lc8FwCpROBfG3HM'
const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'
const api_uri = 'https://geo.ipify.org/api/'
let current_verion = 'v1'

// elements to update 
let current_ip = document.getElementById('current_ip')
let current_town = document.getElementById('current_town')
let current_zone = document.getElementById('current_zone')
let current_isp = document.getElementById('current_isp')

// form elements 
const entered_ip = document.getElementById('ip_address') 
const search_btn = document.getElementById('search_btn')

const headers_option = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

const map = L.map('display-map', {
    'center': [0,0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})

updateMarker = (update_marker = [-13.999, -12.000]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${secret_api}`
    }
    else {
        var ip_url = `${api_uri}${current_verion}?apiKey=${secret_api}&ipAddress=${default_ip}`
    }
    fetch('https://geo.ipify.org/api/v1?apiKey=at_7iZa4RIKA4zhd7lc8FwCpROBfG3HM&ipAddress=8.8.8.8')
    .then( results => results.json())
    .then( (data) => {
        console.log(data);
        current_ip.innerHTML = data.ip
        current_town.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        current_zone.innerHTML = data.location.timezone
        current_isp.innerHTML = data.isp

        // update map marker 
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    })
}

document.addEventListener('load', updateMarker())

search_btn.addEventListener('click', e => {
    e.preventDefault()
    if (entered_ip.value != '' && entered_ip.value != null) {
        return getIPDetails(entered_ip.value)
        //return
    }
    alert("Please enter a valid IP address");
})