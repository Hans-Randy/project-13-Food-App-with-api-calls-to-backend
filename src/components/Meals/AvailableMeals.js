import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { error, isLoading, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealObject) => {
      let loadedMeals = [];

      for (const key in mealObject) {
        loadedMeals.push({
          id: key,
          name: mealObject[key].name,
          description: mealObject[key].description,
          price: mealObject[key].price,
        });
      }
      setMeals(loadedMeals);
    };

    fetchMeals({ url: "https://react-http-697f1-default-rtdb.firebaseio.com/meals.json" }, transformMeals);
  }, [fetchMeals]);
  
  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    )
  }  

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));


  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
