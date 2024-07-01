import RestaurantCategoryController from '../controllers/RestaurantCategoryController.js'

const loadFileRoutes = function (app) {
  app.route('/restaurantCategories')
    .get(RestaurantCategoryController.index)
  
  app.route('/restaurantCategories')
  .post(
    isLoggedIn,
    hasRole('owner'),
    RestaurantCategoryValidation.create,
    handleValidation,
    RestaurantCategoryController.create)
}


export default loadFileRoutes
