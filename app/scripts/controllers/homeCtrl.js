'use strict';

/**
 * @ngdoc function
 * @name rajeshApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rajeshApp
 */
app.controller('HomeCtrl', function ($scope, DataService) {
 $scope.formData = {} || $scope.formData;
 $scope.formData.product = {name:'',id:'',cost:'',unit:''};
 $scope.showSearchResult = false;
 $scope.message = {error:'',info:''};
 DataService.insertDataIntoDb();

$scope.searchProducts = function(productSearchString){
   if(productSearchString != '' && productSearchString != undefined){
	DataService.findProductByName().then(function(result){
		$scope.formData.products = [];
		angular.forEach(result.rows, function(row){
			if(row.doc != undefined && row.doc.product_name != undefined){	
			 if(row.doc.product_name.toLowerCase().indexOf(productSearchString.toLowerCase()) > -1){
			 $scope.formData.products.push(row.doc);		
			 }
			}
		})
	   if($scope.formData.products.length > 0 && $scope.formData.productSearch != $scope.formData.product.name){
		$scope.showSearchResult = true;   
	   }
	   if($scope.formData.productSearch == '' ){
		$scope.showSearchResult = false;    
		$scope.formData.products = [];
	   }
	});
   }else{
        $scope.showSearchResult = false;    
		$scope.formData.products = [];
   }
}

 $scope.$watch('formData.productSearch', function() {
	 $scope.message = {error:'',info:''};
	 $scope.searchProducts($scope.formData.productSearch);  
   });

$scope.searchAndSelectProduct = function(productName){
	angular.forEach($scope.formData.products, function(product){	
	if(product.product_name == productName || $scope.formData.products.length == 1){
		$scope.selectProduct(product);
	}		
	});
}
   
$scope.selectProduct = function(product){

	$scope.showSearchResult = false;
	$scope.formData.product = {};
	$scope.formData.productSearch = product.product_name;
	$scope.formData.product.name = product.product_name;
	$scope.formData.product.id = product._id;
	$scope.formData.product.cost = product.cost;
	$scope.formData.product.units = product.units;
	$scope.formData.product.sellingPrice = product.selling;
    $scope.formData.product.rev = product._rev;		
}

$scope.updateProduct = function(){
	if($scope.validatePrice($scope.formData.product)){
	DataService.saveProduct($scope.formData.product).then(function(result){
		if(result.ok){
		 $scope.$apply(function () {
           $scope.message.info = 'Product has been updated sucessfully.';
           });
		}
	});	
	}
}	
  
$scope.addProduct = function(){
	if($scope.validatePrice($scope.formData.product)){
	DataService.saveProduct($scope.formData.product).then(function(result){
		if(result.ok){
		   $scope.$apply(function () {
           $scope.message.info = 'Product has been added sucessfully.';
           });
		}
	});	
}
}

$scope.validatePrice = function(product){
	var valid = true;
	$scope.message = {error:''};
	if(product.name == '' || product.name == undefined  ){
		 $scope.message.error = $scope.message.error +  'Please enter AlphaNumeric Product Name.';
		 valid = false;
	}
	if(product.sellingPrice == '' || product.sellingPrice == undefined){
		 $scope.message.error = $scope.message.error + 'Please enter Selling Price.';
		 valid = false;
	}
	if(product.cost > product.sellingPrice){
		 $scope.message.error = $scope.message.error + 'Selling price should be more than cost price.';
		 valid = false;
	} 
	return valid;
}
});

