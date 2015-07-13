'use strict';

/**
 * @ngdoc function
 * @name productApp.controller:MainCtrl
 * @description
 * # dataService
 * Service of the productApp
 */
 
 app.service('DBService', function(){
	var dataBase = new PouchDB('productDataBase');
	
	 this.setDb = function(){
         this.dataBase = new PouchDB('productDataBase');
    };   
	
    this.getDb = function(){
		if(this.dataBase == undefined){
			this.setDb();
		}
        return this.dataBase;
    };        
});

app.factory('DataService', function (DBService) {
  return {

insertDataIntoDb :  function() {
	var products = [{
    _id: '67674',
    product_name: 'Dell Inspire',
    cost: 60000,
	selling: 70000,
	units : 10,
	_rev : 1
  },
  {
    _id: '67675',
    product_name: 'Dell Inspire Plus',
    cost: 63000,
	selling: 74000,
	units : 30,
	_rev : 2
  },
  {
    _id: '8989',
    product_name: 'HP Director',
    cost: 69000,
	selling: 79000,
	units : 20,
	_rev : 3
  },
   {
    _id: '8990',
    product_name: 'HP Director New',
    cost: 76000,
	selling: 90000,
	units : 13,
	_rev : 4
  },
  {
    _id: '46542',
    product_name: 'SONY VAIO Generation',
    cost: 90000,
	selling: 99000,
	units : 5,
	_rev : 5
  },
  {
    _id: '46543',
    product_name: 'SONY VAIO Generation-1',
    cost: 78000,
	selling: 98000,
	units : 8,
	_rev : 6
  },
  {
    _id: '46999',
    product_name: 'SONY VAIO Generation-2',
    cost: 78000,
	selling: 98000,
	units : 8,
	_rev : 7
  },
   {
    _id: '46343',
    product_name: 'SONY VAIO Generation-3',
    cost: 71000,
	selling: 78000,
	units : 31,
	_rev : 8
  },
  ,
   {
    _id: '78785',
    product_name: 'SONY VAIO Generation-4',
    cost: 75000,
	selling: 79000,
	units : 34,
	_rev : 8
  }];
 
  angular.forEach(products,function(product){
			 DBService.getDb().put(product, function callback(err, result) {
			if (!err) {
			console.log('Successfully saved a product!');
			}
      });
	});

},

findProductByName : function(){
return DBService.getDb().allDocs({include_docs: true});
},


saveProduct : function(product){
	var productEntity = {
    _id: product.id,
    product_name: product.name,
    cost: product.cost,
	selling: product.sellingPrice,
	units : product.units,
	_rev : product.rev
  }
  return DBService.getDb().put(productEntity);
}
  }
});

