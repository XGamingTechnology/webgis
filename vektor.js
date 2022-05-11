fetch("http://localhost:8090/iserver/services/data-data/rest/data/datasources/DATA/datasets/Bandung_1_2/features")
  .then((rest) => rest.json())
  .then((data) => console.log(data));
