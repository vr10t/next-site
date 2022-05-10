import distance from 'hpsweb-google-distance'
export default function getDistance(){
    distance
    .get({
      origin: "San Francisco, CA",
      destination: "San Diego, CA",
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}