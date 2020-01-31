import React, { useState, useEffect } from "react";
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: {
     hex: "" 
    }
};

const ColorList = ({ colors, updateColors }) => {

  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        setColorToEdit(initialColor);
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
    console.log(colorToEdit) // logs the selected colors object with the properties listed (works as thought)
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then(res => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
  };

  const addColor = e => {
    e.preventDefault();
    console.log('add color button clicked!');

    axiosWithAuth().post(`/api/colors`, newColor)
      .then(res => {
        console.log(res)
        updateColors(res.data);
        setNewColor(initialColor)
      })
      .catch(err => {
        console.log(err)
      })

    console.log(newColor)
  }

  const handleAddColor = e => {
    setNewColor({
      ...newColor,
      color: e.target.value
    })
    console.log(e.target.name, '=', e.target.value);
  }

  const handleAddHex = e => {
    setNewColor({
      ...newColor,
      code: {
        hex: e.target.value
      }
    })
    console.log(e.target.name, '=', e.target.value);
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            type="text"
            name="color"
            placeholder="Color Name"
            value={newColor.color}
            onChange={handleAddColor}
          />
        </label>
        <label>
          hex code: 
          <input
            type="text"
            name="hex"
            placeholder="Hex Code"
            value={newColor.code.hex}
            onChange={handleAddHex}
          />
        </label>
        
        <div className="button-row">
          <button>Add New Color</button>
        </div>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
