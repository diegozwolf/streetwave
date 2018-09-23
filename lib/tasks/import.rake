namespace :import do
  require 'json'
  
  desc "TODO"
  task load_data: :environment do
    file = File.read('lib/archives/data.json')    
    data_hash = JSON.parse(file)
    data_hash["features"].each  do |element|
      p element["attributes"]
      Accident.create(              
        age: element["attributes"]["Edad"],
        gender: element["attributes"]["Sexo"],
        year: element["attributes"]["Anio"],
        month: element["attributes"]["Mes"],
        day: element["attributes"]["Dia"],
        departament: element["attributes"]["Departamento"],
        vehicle: element["attributes"]["Vehiculo"],
        object: element["attributes"]["Objeto"],
        latitude: element["attributes"]["Latitud"],
        longitude: element["attributes"]["Longitud"]
      )
    end
  end

end
