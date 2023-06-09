import React, { useEffect } from "react";

import FoodProductList from "./admin/FoodProductList";

function Home() {
  return <FoodProductList role="user" category="all" />;
}

export default Home;
