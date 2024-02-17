import { useState, useEffect } from "react";
import AddRestaurant from "./AddRestaurant";
const Restaurants = () => {
  const [restarantData1, setRestaurantData1] = useState([]);
  const [restarantData2, setRestaurantData2] = useState([]);
  const [restarantData3, setRestaurantData3] = useState([]);
  const [deleted, setDeleted] = useState("");
  useEffect(() => {
    restarantData1.length > 0 &&
      restarantData1.map((data) =>
        localStorage.setItem(data.orderId, JSON.stringify(data))
      );
    restarantData2.length > 0 &&
      restarantData2.map((data) =>
        localStorage.setItem(data.orderId, JSON.stringify(data))
      );
    restarantData3.length > 0 &&
      restarantData3.map((data) =>
        localStorage.setItem(data.orderId, JSON.stringify(data))
      );
  }, [restarantData1, restarantData2, restarantData3]);
  useEffect(() => {
    if (deleted !== "") {
      localStorage.removeItem(deleted);
    }
  }, [deleted]);
  const restarantHandler = (data) => {
    if (data.table === "table1") {
      setRestaurantData1((preData) => {
        return [...preData, data];
      });
    } else if (data.table === "table2") {
      setRestaurantData2((preData) => {
        return [...preData, data];
      });
    } else {
      setRestaurantData3((preData) => {
        return [...preData, data];
      });
    }
  };

  const deleteHandler = (id, table) => {
    if (table === "table1") {
      const filteredData = restarantData1.filter((data) => data.orderId !== id);

      setRestaurantData1(filteredData);
    } else if (table === "table2") {
      const filteredData = restarantData2.filter((data) => data.orderId !== id);
      setRestaurantData2(filteredData);
    } else {
      const filteredData = restarantData3.filter((data) => data.orderId !== id);
      setRestaurantData3(filteredData);
    }
    setDeleted(id);
  };
  return (
    <div>
      <AddRestaurant onRestarantAdd={restarantHandler} />
      <div>
        <div>
          <h1>Orders</h1>
          <section key={"table1"}>
            <h2>Table 1</h2>
            <ul>
              {restarantData1.length > 0 &&
                restarantData1.map((restuarant) => (
                  <li key={restuarant.orderId}>
                    {`${restuarant.table} - ${restuarant.price} - ${restuarant.dish} `}

                    <button
                      onClick={() => {
                        deleteHandler(restuarant.orderId, restuarant.table);
                      }}
                    >
                      Delete Order
                    </button>
                  </li>
                ))}
            </ul>
          </section>
          <section key={"table2"}>
            <h2>Table 2</h2>
            <ul>
              {restarantData2.length > 0 &&
                restarantData2.map((restuarant) => (
                  <li key={restuarant.id}>
                    {`${restuarant.table} - ${restuarant.price} - ${restuarant.dish} `}

                    <button
                      onClick={() => {
                        deleteHandler(restuarant.orderId, restuarant.table);
                      }}
                    >
                      Delete Order
                    </button>
                  </li>
                ))}
            </ul>
          </section>
          <section key={"table3"}>
            <h2>Table 3</h2>
            <ul>
              {restarantData3.length > 0 &&
                restarantData3.map((restuarant) => (
                  <li key={restuarant.id}>
                    {`${restuarant.table} - ${restuarant.price} - ${restuarant.dish} `}

                    <button
                      onClick={() => {
                        deleteHandler(restuarant.orderId, restuarant.table);
                      }}
                    >
                      Delete Order
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
