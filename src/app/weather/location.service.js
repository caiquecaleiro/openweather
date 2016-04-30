(function() {
  'use strict';

  angular
    .module('app.weather')
    .factory('locationService', locationService);

  function locationService() {
    var service = {
      getStates: getStates,
      getCities: getCities
    };

    return service;

    /**
     * Returns all the states of Brazil.
     * @returns {object}
     */
    function getStates() {
      return [
        {id: 'AC', name: 'Acre'},
        {id: 'AL', name: 'Alagoas'},
        {id: 'AP', name: 'Amapá'},
        {id: 'AM', name: 'Amazonas'},
        {id: 'BA', name: 'Bahia'},
        {id: 'CE', name: 'Ceará'},
        {id: 'DF', name: 'Distrito Federal'},
        {id: 'ES', name: 'Espírito Santo'},
        {id: 'GO', name: 'Goiás'},
        {id: 'MA', name: 'Maranhão'},
        {id: 'MT', name: 'Mato Grosso'},
        {id: 'MS', name: 'Mato Grosso do Sul'},
        {id: 'MG', name: 'Minas Gerais'},
        {id: 'PB', name: 'Paraíba'},
        {id: 'PR', name: 'Paraná'},
        {id: 'PE', name: 'Pernambuco'},
        {id: 'PI', name: 'Piauí'},
        {id: 'RJ', name: 'Rio de Janeiro'},
        {id: 'RN', name: 'Rio Grande do Norte'},
        {id: 'RS', name: 'Rio Grande do Sul'},
        {id: 'RO', name: 'Rondônia'},
        {id: 'RR', name: 'Roraima'},
        {id: 'SC', name: 'Santa Catarina'},
        {id: 'SP', name: 'São Paulo'},
        {id: 'SE', name: 'Sergipe'},
        {id: 'TO', name: 'Tocantins'}
      ];
    }

    /**
     * Returns all the capitals of Brazil and some additional cities.
     * @returns {object}
     */
    function getCities() {
      return [
        {id: 1, name: 'Blumenau', state: 'SC'},
        {id: 2, name: 'Curitiba', state: 'PR'},
        {id: 3, name: 'Rio Branco', state: 'AC'},
        {id: 4, name: 'Maceió', state: 'AL'},
        {id: 5, name: 'Macapá', state: 'AP'},
        {id: 6, name: 'Manaus', state: 'AM'},
        {id: 7, name: 'Salvador', state: 'BA'},
        {id: 8, name: 'Fortaleza', state: 'CE'},
        {id: 9, name: 'Brasília', state: 'DF'},
        {id: 10, name: 'Vitória', state: 'ES'},
        {id: 11, name: 'Goiânia', state: 'GO'},
        {id: 12, name: 'São Luís', state: 'MA'},
        {id: 13, name: 'Cuiabá', state: 'MT'},
        {id: 14, name: 'Campo Grande', state: 'MS'},
        {id: 15, name: 'Belo Horizonte', state: 'MG'},
        {id: 16, name: 'Belém', state: 'PA'},
        {id: 17, name: 'João Pessoa', state: 'PB'},
        {id: 18, name: 'Recife', state: 'PE'},
        {id: 19, name: 'Teresina', state: 'PI'},
        {id: 20, name: 'Rio de Janeiro', state: 'RJ'},
        {id: 21, name: 'Natal', state: 'RN'},
        {id: 22, name: 'Porto Alegre', state: 'RS'},
        {id: 23, name: 'Porto Velho', state: 'RO'},
        {id: 24, name: 'Boa Vista', state: 'RR'},
        {id: 25, name: 'Florianópolis', state: 'SC'},
        {id: 26, name: 'São Paulo', state: 'SP'},
        {id: 27, name: 'Aracaju', state: 'SE'},
        {id: 28, name: 'Palmas', state: 'TO'},
        {id: 29, name: 'Pomerode', state: 'SC'},
        {id: 30, name: 'Timbó', state: 'SC'}
      ];
    }
  }
})();
