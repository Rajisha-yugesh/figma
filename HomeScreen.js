import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import axios from "axios";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";

const HomeScreen = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const cardData = ["wellness", "Brand details", "Ask Doctor", "Women Care"];

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then(function (response) {
        console.log(response);
        setAllProducts(response.data);
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("https://fakestoreapi.com/products/categories")
      .then(function (response) {
        console.log("categories", response);
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category}
      style={styles.categoryButton}
      onPress={() => handleCategoryPress(category)}
    >
      <Text>{category}</Text>
    </TouchableOpacity>
  );

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category}
      style={styles.categoryCard}
      // onPress={() => handleCategoryPress(category)}
    >
      {getCategoryIcon(category)}
      <Text style={styles.categoryCardText}>{category}</Text>
    </TouchableOpacity>
  );

  const getCategoryIcon = (category) => {
    let icon;
    let iconColor = "#CB218E";

    switch (category) {
      case "wellness":
        icon = <MaterialIcons name="fitness-center" size={24} color="white" />;
        break;
      case "Brand details":
        icon = <MaterialCommunityIcons name="tag" size={24} color="white" />;
        break;
      case "Ask Doctor":
        icon = <FontAwesome5 name="user-md" size={24} color="white" />;
        break;
      case "Women Care":
        icon = <MaterialIcons name="category" size={24} color="white" />;
        break;
      default:
        icon = null;
    }

    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: iconColor,
          padding: 10,
          borderRadius: 10,
        }}
      >
        {icon}
      </View>
    );
  };

  const handleCategoryPress = (category) => {
    const filteredProducts = allProducts.filter(
      (product) => product.category === category
    );
    setProducts(filteredProducts);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  const handleProductPress = (product) => {
    // Handle product selection or navigation
    console.log("Selected Product:", product);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Doctors, Medicine, Appointments, etc"
      />
      <Image
        source={require("./assets/adImage.png")}
        style={{ width: 375, height: 180, borderRadius: 8 }}
      />
      <View style={styles.cardContainer}>
        {cardData.map((category) => renderCategoryCard(category))}
      </View>
      <Text style={{ marginBottom: 10 }}>Shop By Category</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        {categories.map((category) => renderCategoryButton(category))}
      </View>
      <ScrollView>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          style={{ marginTopTop: 8 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  categoryButton: {
    marginRight: 8,
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 10,
  },
  productContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    backgroundColor: "#ecf0f1",
    borderRadius: 8,
    padding: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productTitle: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productPrice: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
  },
  cardContainer: {
    flexDirection: "row",
    marginBottom: 16,
    display: "flex",
  },
  categoryCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 2,
    marginTop: 7,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryCardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default HomeScreen;
