"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage]=useState(null)
  const imageInputRef = useRef(null);
  function handlePickClick() {
    imageInputRef.current.click();
  }

  function handleImageChange(event){
    const file = event.target.files[0]
    if(!file){
      setPickedImage(null)
      return
    }
    const fileReader= new FileReader()

    // zapisujemy funkcje w onload, bedzie ona 
    // uruchomiona kiedy readAsDataUrl skonczny prace
    fileReader.onload = () => {
      setPickedImage(fileReader.result) // to bedzie wygenerowane url
    }

    // readAsDataURL nic nie zwraca
    fileReader.readAsDataURL(file)
  }

  return (
    <div className={classes.picker}>
      <label htmlFor="image">{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet</p>}
          {pickedImage && <Image fill src={pickedImage} alt="Image selected by user"/>}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
        />
        <button
          onClick={handlePickClick}
          className={classes.button}
          type="button"
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
