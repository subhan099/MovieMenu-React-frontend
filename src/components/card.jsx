import React from "react";
import { Box, Typography } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

export default function Card({
  isFavouritePage,
  img,
  name,
  year,
  isFavourite,
  onToggleFavourite,
  onDelete,
  onEdit,
  editPermission,
  deletePermission
}) {

  return (
    <Box
      sx={{
        backgroundColor: "#092C39",
        width: "282px",
        height: "504px",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: "10px",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={`http://localhost:5000/${img}`}
          alt="img"
          style={{
            width: "266px",
            height: "400px",
            marginTop: "8px",
            borderRadius: "20px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontSize: "20px",
              fontWeight: "500px",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontSize: "14px",
              fontWeight: "500px",
              color: "#FFFFFF",
            }}
          >
            {year}
          </Typography>
        </Box>
        <Box>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onToggleFavourite}
          >
            {isFavourite ? (
              <FaHeart
                style={{ width: "28px", height: "28px", color: "red" }}
              />
            ) : (
              <FaRegHeart
                style={{ width: "28px", height: "28px", color: "white" }}
              />
            )}
          </button>
          {isFavouritePage ? (
            ""
          ) : (
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onDelete}
              disabled={!deletePermission}
            >
              <MdDelete
                style={{ width: "28px", height: "28px", color: deletePermission ? "white" : "gray" }}
              />
            </button>
          )}
          {isFavouritePage ? (
            ""
          ) : (
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onEdit}
              disabled={!editPermission}
            >
              <MdModeEdit
                style={{ width: "28px", height: "28px", color: editPermission ? "white" : "gray" }}
              />
            </button>
          )}
        </Box>
      </Box>
    </Box>
  );
}