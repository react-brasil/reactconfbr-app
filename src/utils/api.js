export const getLocation = (
  address: string,
  number: string,
  cep: string,
  setLocation: (address: string, lat: number, lng: number) => void,
) => {
  const newAddress = `${address},${number}-${cep}`;
  const url = `https://maps.google.com/maps/api/geocode/json?address=${newAddress}&sensor=false`;
  fetch(url, {})
    .then(function(res) {
      return res.text();
    })
    .then(function(body) {
      const geoLocation = JSON.parse(body);
      console.log(geoLocation);
      const formatted_address = geoLocation.results[0].formatted_address;
      const lat = geoLocation.results[0].geometry.location.lat;
      const lng = geoLocation.results[0].geometry.location.lng;

      setLocation(formatted_address, lat, lng);
    });
};
