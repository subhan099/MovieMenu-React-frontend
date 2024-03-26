import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Box, Typography, Button } from "@mui/material";
// import { useLocation } from "react-router-dom";
import Card from "../components/card";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GetId } from "../components/GetID";
import InnerLayout from "../components/InnerLayout";
import { toast, Bounce } from "react-toastify";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

export default function MyFavourites() {
  const [arr, setArr] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  // const { array } = location.state;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const arrToDisplay = arr.slice(startIndex, endIndex);

  const { items } = usePagination({
    count: Math.ceil(arr.length / itemsPerPage),
    onChange: (_, page) => setCurrentPage(page),
  });

  useEffect(() => {
    const get_data = async () => {
      const id = await GetId();
      setUserId(id);
    };
    get_data();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/favourite/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }
        );
        const movieIds = response.data;

        // Fetch details of each movie using its ID
        const moviePromises = movieIds.map((movieId) =>
          axios.get(`http://localhost:5000/movies/${movieId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          })
        );

        // Execute all requests concurrently
        const movieResponses = await Promise.all(moviePromises);

        // Extract movie data from responses
        const movies = movieResponses.map((response) => response.data);

        // Update state with array of movie objects
        setArr(movies);
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    };

    fetchData();
  });

  const handleFavouriteClicked = (Id) => {
    //previousLocalStorage
    // const userId = localStorage.getItem("login");
    axios
      .get(`http://localhost:5000/favourite/movie/${Id}/user/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("login")}` },
      })
      .then((response) => {
        // console.log("this is :>>>>>>>>>>>>>",response.data.id)
        axios
          .delete(`http://localhost:5000/favourite/${response.data.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          })
          .then((response) => {
            // console.log(response.data);
            toast.success("Favorite Removed", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("=========================", Id);
  };

  return (
    <InnerLayout>
      <Box
        sx={{
          color: "white",
          padding: "0px 120px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", marginTop: "120px", alignItems: "center" }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Montserrat",
                fontSize: "48px",
                fontWeight: 600,
              }}
            >
              My Favourites
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "150px",
          }}
        >
          {arrToDisplay.length > 0 ? (
            arrToDisplay.map((movie, index) => (
              <Box
                key={index}
                sx={{ padding: "0px 20px 20px 0px", justifyContent: "center" }}
              >
                <Card
                  isFavouritePage={true}
                  img={movie.imagePath}
                  name={movie.name}
                  year={movie.year}
                  isFavourite={true}
                  onToggleFavourite={() => handleFavouriteClicked(movie.id)}
                />
              </Box>
            ))
          ) : (
            <Box
              sx={{
                display: "Block",
                margin: "auto",
                marginBottom:"100px",
                fontFamily: "Montserrat",
                fontSize: "32px",
                fontWeight: 400,
              }}
            >
              No Item in favourites
            </Box>
          )}
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
        >
          <nav>
            <List>
              {items.map(({ page, type, selected, ...item }, index) => {
                let children = null;

                if (type === "start-ellipsis" || type === "end-ellipsis") {
                  children = "…";
                } else if (type === "previous") {
                  children = (
                    <Button {...item} sx={{ color: "white" }}>
                      Prev
                    </Button>
                  );
                } else if (type === "next") {
                  children = (
                    <Button {...item} sx={{ color: "white" }}>
                      Next
                    </Button>
                  );
                } else if (type === "page") {
                  children = (
                    <button
                      type="button"
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "none",
                        margin: "3px",
                        borderRadius: "5px",
                        fontWeight: selected ? "bold" : undefined,
                        backgroundColor: selected ? "#2bd17e" : "#092c39",
                        color: "white",
                      }}
                      {...item}
                    >
                      {page}
                    </button>
                  );
                } else {
                  children = (
                    <button type="button" {...item}>
                      {type}
                    </button>
                  );
                }

                return <li key={index}>{children}</li>;
              })}
            </List>
          </nav>
        </Box>
      </Box>
    </InnerLayout>
  );
}
