import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LuDownload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

export default function MovieCard({ isCreate, id, img, title, year }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedImageFile, setSelectedImageFile] = useState(
    isCreate ? null : `http://localhost:5000/${img}`
  );
  const [selectedImagePreview, setSelectedImagePreview] = useState(
    isCreate ? null : img ? `http://localhost:5000/${img}` : null
  );
  const [movieTitle, setMovieTitle] = useState(isCreate ? "" : title);
  const [publishingYear, setPublishingYear] = useState(isCreate ? "" : year);

  const handleCancelClick = () => {
    navigate("/home");
  };

  const handleClick = () => {
    if (isCreate) {
      if (
        !selectedImageFile ||
        !selectedImagePreview ||
        !movieTitle ||
        !publishingYear
      ) {
        toast.error("Fields can't be empty", {
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
        return;
      }
      const formData = new FormData();
      formData.append("file", selectedImageFile);
      formData.append("name", movieTitle);
      formData.append("year", publishingYear);
      axios
        .post("http://localhost:5000/movies/upload", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log("created a movie", response.data);
          navigate("/home");
          toast.success("Created successfully", {
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
          console.log("error: ", error);
        });
    } else {
      if (
        !selectedImageFile ||
        !selectedImagePreview ||
        !movieTitle ||
        !publishingYear
      ) {
        toast.error("Fields can't be empty", {
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
        return;
      }
      const formData = new FormData();
      formData.append("file", selectedImageFile);
      formData.append("name", movieTitle);
      formData.append("year", publishingYear);
      axios
        .patch(`http://localhost:5000/movies/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Updated", response.data);
          navigate("/home");
          toast.success("Updated successfully", {
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
        .catch((err) => {
          console.log("error: ", err);
        });
    }
  };

  const handleImageUploadClick = () => {
    // Trigger file selection programmatically
    setSelectedImageFile(null);
    setSelectedImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setSelectedImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      <Box sx={{ display: "flex" }}>
        <Button
          sx={{
            backgroundColor: "#224957",
            width: "473px",
            height: "473px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": { backgroundColor: "#224957" },
          }}
          onClick={handleImageUploadClick}
        >
          {selectedImagePreview ? (
            <img
              src={selectedImagePreview}
              alt="Selected"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <LuDownload
                style={{ color: "white", width: "24px", height: "24px" }}
              />
              <Typography
                sx={{ fontSize: "14px", marginTop: "10px", color: "white" }}
              >
                Drop an Image here
              </Typography>
            </>
          )}
        </Button>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "10%" }}
        >
          <TextField
            id="filled-basic"
            label={
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                Title
              </Typography>
            }
            sx={{
              backgroundColor: "#224957",
              borderRadius: "5px",
              width: "362px",
              input: {
                color: "white",
              },
            }}
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label={
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                Publishing Year
              </Typography>
            }
            sx={{
              backgroundColor: "#224957",
              borderRadius: "5px",
              width: "216px",
              marginTop: "20px",
              input: {
                color: "white",
              },
            }}
            value={publishingYear}
            onChange={(e) => setPublishingYear(e.target.value)}
          />
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                width: "167px",
                "&:hover": { borderColor: "white" },
              }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <Button
              sx={{
                color: "white",
                width: "179px",
                backgroundColor: "#2bd17e",
                marginLeft: "10px",
                "&:hover": { backgroundColor: "#2bd17e " },
              }}
              onClick={handleClick}
            >
              {isCreate ? "Submit" : "Update"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
