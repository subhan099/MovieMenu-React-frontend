import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
// import Layout from "../components/Layout";
import Card from "../components/card";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import EmptyPage from "./emptyPage";
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

export default function Home() {
  const [permissions, setPermissions] = useState({
    write: "",
    edit: "",
    delete: "",
  });
  const [arr, setArr] = useState([]);
  const [favouriteList, setFavouriteList] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const get_data = async () => {
      const id = await GetId();
      console.log("takes as: ", id);
      setUserId(id);
    };
    get_data();
  }, []);

  const getData = async () => {
    axios
      .get("http://localhost:5000/movies", {
        headers: { Authorization: `Bearer ${localStorage.getItem("login")}` },
      })
      .then((response) => {
        setArr(response.data);
      })
      .catch((error) => {
        console.log("err: ", error);
      });
  };
  useEffect(() => {
    if (userId) {
      getData();
    }
  }, [userId]);

  const fetchData = async () => {
    try {
      // Fetch the movie IDs associated with the user
      const response = await axios.get(
        `http://localhost:5000/favourite/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("login")}` },
        }
      );
      setFavouriteList(response.data);
    } catch (error) {
      console.log("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const getPermissions = async () => {
    try {
      await axios
        .get(`http://localhost:5000/permissions/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        })
        .then((response) => {
          // console.log("this one response: ", response.data);
          if (response.data.length > 0) {
            const { id, write, edit, delete: del } = response.data[0];
            setPermissions({
              write,
              edit,
              delete: del,
            });
          }
        })
        .catch((error) => {
          console.log("permission error axios: ", error);
        });
    } catch (error) {
      console.log("error in try catch: ", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getPermissions();
    }
  }, [userId]);

  useEffect(() => {
    // console.log("permission are in use state: ", permissions);
  }, [permissions]);

  const navigate = useNavigate();
  const itemsPerPage = 8;
  const { items } = usePagination({
    count: Math.ceil(arr.length / itemsPerPage),
    onChange: (_, page) => setCurrentPage(page),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const arrToDisplay = arr.slice(startIndex, endIndex);
  if (arr.length === 0) {
    return <EmptyPage />;
  }

  const handleFavouriteClicked = async (id) => {
    console.log("id appears as: ", id);
    if (favouriteList.includes(id)) {
      axios
        .get(`http://localhost:5000/favourite/movie/${id}/user/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("login")}` },
        })
        .then((response) => {
          // console.log("data reciving here: ", response.data.id);
          axios
            .delete(`http://localhost:5000/favourite/${response.data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
              },
            })
            .then((response) => {
              // console.log(response.data);
              getData();
              fetchData();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const data = {
        userId: userId,
        movieId: id,
      };
      // console.log("not in list");
      axios
        .post("http://localhost:5000/favourite", data, {
          headers: { Authorization: `Bearer ${localStorage.getItem("login")}` },
        })
        .then((response) => {
          getData();
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favourite/movie/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("login")}` },
      });

      setArr(arr.filter((item) => item.id !== id));
      setFavouriteList(favouriteList.filter((itemId) => itemId !== id));
      toast.success("Deleted successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };
  

  const handleEdit = (id) => {
    axios
      .get(`http://localhost:5000/movies/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("login")}` },
      })
      .then((response) => {
        navigate("/update-movie", {
          state: {
            id: response.data.id,
            img: response.data.imagePath,
            title: response.data.name,
            year: response.data.year,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMyFavourites = () => {
    navigate("/my-favourites");
  };

  const handleAddMovie = () => {
    navigate("/add-movie");
  };

  const handleLogout = () => {
    localStorage.removeItem("login");
    navigate("/");
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
              My Movies
            </Typography>
            <IoIosAddCircleOutline
              style={{ marginLeft: "10px", width: "32px", height: "32px" }}
            />
          </Box>
          <Button
            sx={{ display: "flex", marginTop: "120px", alignItems: "center" }}
            onClick={handleLogout}
          >
            <Typography
              sx={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Montserrat",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              Logout
            </Typography>
            <MdLogout
              style={{
                marginLeft: "10px",
                width: "24px",
                height: "24px",
                color: "white",
              }}
            />
          </Button>
        </Box>
        <Box sx={{ marginTop: "100px" }}>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#2BD17E",
              "&:hover": { backgroundColor: "#2BD17E" },
            }}
            onClick={handleAddMovie}
            disabled={!permissions.write}
          >
            Add a Movie
          </Button>
          <Button
            sx={{
              marginLeft: "10px",
              color: "white",
              backgroundColor: "red",
              "&:hover": { backgroundColor: "red" },
            }}
            onClick={handleMyFavourites}
          >
            My Favourites
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          {arrToDisplay.map((movie, index) => (
            <Box
              key={index}
              sx={{ padding: "0px 20px 20px 0px", justifyContent: "center" }}
            >
              {/* {console.log("============== movieid -----------", movie)} */}
              {favouriteList.includes(movie.id) ? (
                <Card
                  img={movie.imagePath}
                  name={movie.name}
                  year={movie.year}
                  isFavourite={true}
                  onToggleFavourite={() => handleFavouriteClicked(movie.id)}
                  onDelete={() => handleDelete(movie.id)}
                  onEdit={() => {
                    handleEdit(movie.id);
                  }}
                  editPermission={permissions.edit}
                  deletePermission={permissions.delete}
                />
              ) : (
                <Card
                  img={movie.imagePath}
                  name={movie.name}
                  year={movie.year}
                  isFavourite={false}
                  onToggleFavourite={() => handleFavouriteClicked(movie.id)}
                  onDelete={() => handleDelete(movie.id)}
                  onEdit={() => {
                    handleEdit(movie.id);
                  }}
                  editPermission={permissions.edit}
                  deletePermission={permissions.delete}
                />
              )}
            </Box>
          ))}
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
